import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import Nav from './Nav.jsx';
import Budget from './Budget.jsx';
import TransactionsGoals from './TransactionsGoals.jsx';

const App = (props) => {
  const [balance, setBalance] = useState(0);
  const [entries, setEntries] = useState([{amount: '200'}]);


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

  useEffect(() => {
    console.log(entries)
  }, [balance, entries]);

  return (
    <div>
      <Nav />
      <Budget balance={balance} setBalance={setBalance} updateBal={updateBal} entries={entries} updateEntries={updateEntries}/>
      <TransactionsGoals entries={entries} />

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
  );
}

export default App;
