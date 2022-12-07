import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
// import Login from './Login.jsx';
import Nav from './Nav.jsx';
import Budget from './Budget.jsx';
import Transactions from './Transactions.jsx';
import Goals from './Goals.jsx';
import axios from 'axios';


const App = (props) => {
  const [balance, setBalance] = useState(0);
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState(entries);
  const [goals, setGoals] = useState([]);

  // Toggle between transactions and goals buttons -----
  const [toggleTG, setToggleTG] = useState(false);
  const toggledTG = () => {
    if(!toggleTG){
      document.querySelector('.transactions').style.display = 'none'
      document.querySelector('.goals').style.display = 'block'
    } else {
      document.querySelector('.goals').style.display = 'none'
      document.querySelector('.transactions').style.display = 'block'
    }
    document.querySelector('.toggled').style.transition = 'font 0.3s ease'
  }

  // save firebase id of each user on local storage to keep data persistent for that user
  // only saving firebase id into local storage
  if (props.userInfo !== undefined) {
    localStorage.setItem('firebase', JSON.stringify(props.userInfo.firebaseId));
  }

  console.log(localStorage.getItem('firebase'), 'HERE LOCAL STORAGE ------')
  // get my balance -----
  const getBal = (user) => {
    axios.get('http://localhost:3005/budget/login', {
      params: {
        firebase: user,
      }
    })
    .then(result => {
      setBalance(result.data);
    })
    .catch(err => console.log(err))
  }
  // set my balance -----
  const setBal = (input) => {
    axios.put('http://localhost:3005/budget/login', {
      firebase: localStorage.getItem('firebase'),
      // password: ' ',
      balance: input
    })
    .then(result => {
      getBal(localStorage.getItem('firebase'));
    })
    .catch(err => console.log(err))
  }
  // update my balance -----
  const updateBal = (operator, input, edit, prev) => {
    if (edit === true) {
      if (operator === '-') {
        axios.put('http://localhost:3005/budget/login', {
          firebase: localStorage.getItem('firebase'),
          // password: ' ',
          balance: (balance + prev) - input
        })
        .then(result => {
          getBal(localStorage.getItem('firebase'));
        })
        .catch(err => console.log(err))
      } else {
        axios.put('http://localhost:3005/budget/login', {
          firebase: localStorage.getItem('firebase'),
          // password: ' ',
          balance: balance + prev + input
        })
        .then(result => {
          getBal(localStorage.getItem('firebase'));
        })
        .catch(err => console.log(err))
      }
    } else {
      if (operator === '-') {
        axios.put('http://localhost:3005/budget/login', {
          firebase: localStorage.getItem('firebase'),
          // password: ' ',
          balance: balance - input
        })
        .then(result => {
          getBal(localStorage.getItem('firebase'));
        })
        .catch(err => console.log(err))
      } else {
        axios.put('http://localhost:3005/budget/login', {
          firebase: localStorage.getItem('firebase'),
          // password: ' ',
          balance: balance + input
        })
        .then(result => {
          getBal(localStorage.getItem('firebase'));
        })
        .catch(err => console.log(err))
      }
    }
  }

  // get all transactions -----
  const getTrans = (user) => {
    axios.get('http://localhost:3005/budget/trans', {
      params: {
        firebase: user
      }
    })
      .then(result => {
        setEntries(result.data);
        setFilter(result.data);
      })
      .catch(err => console.log(err))
  }
  // post new transactions -----
  const addTrans = (obj) => {
    axios.post('http://localhost:3005/budget/trans', {
      firebase: localStorage.getItem('firebase'),
      amount: obj.amount,
      title: obj.title,
      date: obj.date,
      time: obj.time,
      cityState: obj.cityState,
      tag: obj.tag,
      sign: obj.sign
    })
    .then(result => {
      getTrans(localStorage.getItem('firebase'));
    })
    .catch(err => console.log(err))
  }
  // delete transactions -----
  const deleteTrans = (obj) => {
    // data: allows you to pick the object you want to remove
    axios.delete('http://localhost:3005/budget/trans', {data: obj})
    .then((result) => {
      getTrans(localStorage.getItem('firebase'));
    })
    .catch((err) => {
      console.log(err);
    })
  }
  // edit transactions -----
  const editTrans = (obj) => {
    // data: allows you to pick the object you want to edit
    axios.put('http://localhost:3005/budget/trans', {
      firebase: localStorage.getItem('firebase'),
      amount: obj.amount,
      title: obj.title,
      date: obj.date,
      time: obj.time,
      cityState: obj.cityState,
      tag: obj.tag,
      sign: obj.sign,
      prev: obj.prev
    })
    .then((result) => {
      getTrans(localStorage.getItem('firebase'));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // get all goals -----
  const getGoals = (user) => {
    axios.get('http://localhost:3005/budget/goals', {
      params: {
        firebase: user
      }
    })
    .then(result => {
      setGoals(result.data);
    })
    .catch(err => console.log(err))
  }
  // post new goals -----
  const addGoals = (obj) => {
    axios.post('http://localhost:3005/budget/goals', {
      firebase: localStorage.getItem('firebase'),
      save: obj.save,
      date: obj.date,
      sdate: obj.sdate
    })
    .then(result => {
      getGoals(localStorage.getItem('firebase'));
    })
    .catch(err => console.log(err))
  }
  // delete goals -----
  const deleteGoals = (obj) => {
    // data: allows you to pick the object you want to remove
    axios.delete('http://localhost:3005/budget/goals', {data: obj})
    .then((result) => {
      getGoals(localStorage.getItem('firebase'));
    })
    .catch((err) => {
      console.log(err);
    })
  }
  // edit goals -----
  const editGoals = (obj) => {
    // data: allows you to pick the object you want to edit
    axios.put('http://localhost:3005/budget/goals', {
      firebase: localStorage.getItem('firebase'),
      save: obj.save,
      sdate: obj.sdate,
      date: obj.date,
      prev: obj.prev
    })
    .then((result) => {
      getGoals(localStorage.getItem('firebase'));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // search filter results for transactions -----
  const searchFilter = (letters) => {
    // if input letters is an empty array, keep showing full data
    if (Array.isArray(letters)) {
      setFilter(entries);
    } else { // if input letters isnt an array
      let filtered = [];
      // iterate thorugh qaData
      entries.forEach((current, index, collection) => {
        if (current.title.toLowerCase().includes(letters.toLowerCase())) {
          filtered.push(current);
        }
      })
      // if no search result found
      if (filtered.length === 0) {
        filtered.push({title: 'No transactions found...'})
      }
      // set filter data to filtered array
      setFilter(filtered);
    }
  }

  // use effects to render new data -----
  useEffect(() => {
    // get balance
    getBal(localStorage.getItem('firebase'));
    // get all transactions
    getTrans(localStorage.getItem('firebase'));
    // get all goals
    getGoals(localStorage.getItem('firebase'));
  }, []);

  useEffect(() => {
    // console.log(entries)
    // console.log(goals)
  }, [balance, entries, filter, goals]);

  return (
    <div>
      {/* HOME PAGE ---------------- */}
      <div>
        <Nav />
        <Budget balance={balance} setBalance={setBalance} setBal={setBal} updateBal={updateBal} filter={filter} addTrans={addTrans}/>

        {/* toggles transactions and goals */}
        <div className="toggle-btns">
          <button className={!toggleTG ? "toggled btn" : "transToToggle btn"} onClick={(e) => {
            if (toggleTG) {
              setToggleTG(!toggleTG);
              toggledTG();
            }}}>
              Transactions
          </button>
          <button className={toggleTG ? "toggled btn" : "goalsToToggle btn"} onClick={(e) => {
            if (!toggleTG) {
              setToggleTG(!toggleTG);
              toggledTG();
            }}}>
              Goals
          </button>
        </div>

        <div className="contain-trans-goals">
          {/* transactions */}
          <Transactions filter={filter} searchFilter={searchFilter} deleteTrans={deleteTrans} editTrans={editTrans} updateBal={updateBal} />

          {/* goals */}
          <Goals goals={goals} addGoals={addGoals} filter={filter} deleteGoals={deleteGoals} editGoals={editGoals} />
        </div>

        <div className="footer">
          <footer id="footer">
            <div className="container-fluid">
              <i className="footer-icons fa-brands fa-twitter"></i>
              <i className="footer-icons fa-brands fa-facebook-f"></i>
              <i className="footer-icons fa-brands fa-instagram"></i>
              <i className="footer-icons fa-solid fa-envelope"></i>
              <p>© Copyright MyBudget</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
