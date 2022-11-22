import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
// import Login from './Login.jsx';
import Nav from './Nav.jsx';
import Budget from './Budget.jsx';
import Transactions from './Transactions.jsx';
import Goals from './Goals.jsx';


const App = (props) => {
  const [balance, setBalance] = useState(0);
  const [entries, setEntries] = useState([{amount: '200', title: 'BestBuy', date: '2022-11-16', time: '12:30 PM', tag: 'food', sign: '+'},{amount: '200', title: 'BestBuy', date: '2022-11-19', time: '12:30 PM', tag: 'food', sign: '+'},{amount: '200', title: 'BestBuy', date: '2022-11-12', time: '12:30 PM', tag: 'food', sign: '+'},{amount: '200', title: 'BestBuy', date: '2022-11-15', time: '12:30 PM', tag: 'food', sign: '+'},{amount: '200', title: 'BestBuy', date: '2022-11-17', time: '12:30 PM', tag: 'food', sign: '+'}]);
  const [goals, setGoals] = useState([{save: '200', Sdate: '11/20/22', date: '11/20/22'},{save: '200', Sdate: '11/20/22', date: '11/1/22'},{save: '200', Sdate: '11/2/22', date: '11/18/22'},{save: '200', Sdate: '11/17/22', date: '11/20/22'},{save: '200', Sdate: '11/2/22', date: '11/12/22'}]);
  const [filter, setFilter] = useState(entries);

  // FEC ---
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


  const updateBal = (operator, input) => {
    if (operator === '-') {
      setBalance(balance - input);
    } else {
      setBalance(balance + input);
    }
  }

  const updateEntries = (array) => {
    setEntries(array);
    setFilter(array);
  }
  const updateGoals = (array) => {
    setGoals(array);
  }

  // search filter results for transactions
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

  useEffect(() => {
    console.log(entries)
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
        <Budget balance={balance} setBalance={setBalance} updateBal={updateBal} filter={filter} updateEntries={updateEntries}/>

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
          <Goals goals={goals} updateGoals={updateGoals} filter={filter}/>
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
