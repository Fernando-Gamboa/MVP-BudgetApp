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

  // get my balance -----
  const getBal = () => {
    axios.get('http://localhost:3005/budget/login')
    .then(result => {
      setBalance(result.data);
    })
    .catch(err => console.log(err))
  }
  // set my balance -----
  const setBal = (input) => {
    axios.put('http://localhost:3005/budget/login', {
      username: 'Fernando',
      password: ' ',
      balance: input
    })
    .then(result => {
      getBal();
    })
    .catch(err => console.log(err))
  }
  // update my balance -----
  const updateBal = (operator, input) => {
    if (operator === '-') {
      axios.put('http://localhost:3005/budget/login', {
        username: 'Fernando',
        password: ' ',
        balance: balance - input
      })
      .then(result => {
        getBal();
      })
      .catch(err => console.log(err))
      // setBalance(balance - input);
    } else {
      axios.put('http://localhost:3005/budget/login', {
        username: 'Fernando',
        password: ' ',
        balance: balance + input
      })
      .then(result => {
        getBal();
      })
      .catch(err => console.log(err))
      // setBalance(balance + input);
    }
  }
  // get all transactions -----
  const getTrans = () => {
    axios.get('http://localhost:3005/budget/trans')
      .then(result => {
        setEntries(result.data);
        setFilter(result.data);
      })
      .catch(err => console.log(err))
  }
  // get all goals -----
  const getGoals = () => {
    axios.get('http://localhost:3005/budget/goals')
    .then(result => {
      setGoals(result.data);
    })
    .catch(err => console.log(err))
  }
  // post new transactions -----
  const addTrans = (obj) => {
    axios.post('http://localhost:3005/budget/trans', {
      amount: obj.amount,
      title: obj.title,
      date: obj.date,
      time: obj.time,
      cityState: obj.cityState,
      tag: obj.tag,
      sign: obj.sign
    })
    .then(result => {
      getTrans();
    })
    .catch(err => console.log(err))
    // setEntries(array);
    // setFilter(array);
  }
  // post new goals -----
  const addGoals = (obj) => {
    axios.post('http://localhost:3005/budget/goals', {
      save: obj.save,
      date: obj.date,
      sdate: obj.sdate
    })
    .then(result => {
      getGoals();
    })
    .catch(err => console.log(err))
    // setEntries(array);
    // setFilter(array);
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
    console.log(entries)
    // get balance
    getBal();
    // get all transactions
    getTrans();
    // get all goals
    getGoals();
  }, []);

  useEffect(() => {
    console.log(entries)
    console.log(goals)
  }, [balance, entries, filter, goals]);

  return (
    <div>
      {/* LOGIN PAGE --------------- */}
      {/* <div>
        <Login />
      </div> */}

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
          <Transactions filter={filter} searchFilter={searchFilter} />

          {/* goals */}
          <Goals goals={goals} addGoals={addGoals} filter={filter}/>
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
