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
  console.log(props.userInfo, 'HERE ------')
  // get my balance -----
  const getBal = (user) => {
    axios.get('http://localhost:3005/budget/login', {
      params: {
        email: user
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
      username: props.userInfo,
      // password: ' ',
      balance: input
    })
    .then(result => {
      getBal(props.userInfo);
    })
    .catch(err => console.log(err))
  }
  // update my balance -----
  const updateBal = (operator, input) => {
    if (operator === '-') {
      axios.put('http://localhost:3005/budget/login', {
        username: props.userInfo,
        // password: ' ',
        balance: balance - input
      })
      .then(result => {
        getBal(props.userInfo);
      })
      .catch(err => console.log(err))
    } else {
      axios.put('http://localhost:3005/budget/login', {
        username: props.userInfo,
        // password: ' ',
        balance: balance + input
      })
      .then(result => {
        getBal(props.userInfo);
      })
      .catch(err => console.log(err))
    }
  }

  // get all transactions -----
  const getTrans = (user) => {
    axios.get('http://localhost:3005/budget/trans', {
      params: {
        email: user
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
      username: props.userInfo,
      amount: obj.amount,
      title: obj.title,
      date: obj.date,
      time: obj.time,
      cityState: obj.cityState,
      tag: obj.tag,
      sign: obj.sign
    })
    .then(result => {
      getTrans(props.userInfo);
    })
    .catch(err => console.log(err))
  }
  // delete transactions -----
  const deleteTrans = (obj) => {
    // data: allows you to pick the object you want to remove
    axios.delete('http://localhost:3005/budget/trans', {data: obj})
    .then((result) => {
      getTrans(props.userInfo);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // get all goals -----
  const getGoals = (user) => {
    axios.get('http://localhost:3005/budget/goals', {
      params: {
        email: user
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
      username: props.userInfo,
      save: obj.save,
      date: obj.date,
      sdate: obj.sdate
    })
    .then(result => {
      getGoals(props.userInfo);
    })
    .catch(err => console.log(err))
  }
  // delete goals -----
  const deleteGoals = (obj) => {
    // data: allows you to pick the object you want to remove
    axios.delete('http://localhost:3005/budget/goals', {data: obj})
    .then((result) => {
      getGoals(props.userInfo);
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
    getBal(props.userInfo);
    // get all transactions
    getTrans(props.userInfo);
    // get all goals
    getGoals(props.userInfo);
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
          <Transactions filter={filter} searchFilter={searchFilter} deleteTrans={deleteTrans} />

          {/* goals */}
          <Goals goals={goals} addGoals={addGoals} filter={filter} deleteGoals={deleteGoals} />
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
