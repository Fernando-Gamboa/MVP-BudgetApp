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
  const [entries, setEntries] = useState([{amount: '200', title: 'BestBuy', date: '11/17/22', time: '12:30', tag: 'food', sign: '+'},{amount: '200', title: 'BestBuy', date: '11/17/22', time: '12:30', tag: 'food', sign: '+'},{amount: '200', title: 'BestBuy', date: '11/17/22', time: '12:30', tag: 'food', sign: '+'},{amount: '200', title: 'BestBuy', date: '11/17/22', time: '12:30', tag: 'food', sign: '+'},{amount: '200', title: 'BestBuy', date: '11/17/22', time: '12:30', tag: 'food', sign: '+'}]);
  const [goals, setGoals] = useState([{save: '200', date: '11/17/22'},{save: '200', date: '11/17/22'},{save: '200', date: '11/17/22'},{save: '200', date: '11/17/22'},{save: '200', date: '11/17/22'}]);

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
  }
  const updateGoals = (array) => {
    setGoals(array);
  }

  useEffect(() => {
    console.log(entries)
  }, [balance, entries]);

  return (
    <div>
      {/* LOGIN PAGE --------------- */}
      {/* <div>
        <Login />
      </div> */}

      {/* HOME PAGE ---------------- */}
      <div>
        <Nav />
        <Budget balance={balance} setBalance={setBalance} updateBal={updateBal} entries={entries} updateEntries={updateEntries}/>

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
          <Transactions entries={entries} />

          {/* goals */}
          <Goals goals={goals} updateGoals={updateGoals} entries={entries}/>
        </div>

        <footer className="" id="footer">
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
  );
}

export default App;
