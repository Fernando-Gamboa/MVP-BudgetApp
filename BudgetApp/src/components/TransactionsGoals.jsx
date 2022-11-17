import React from 'react';
import TransactionsGoalsEntry from './TransactionsGoalsEntry.jsx';

const TransactionsGoals = (props) => {

  return (
    <section id='transactions-goals'>
      <div className='container-fluid'>
        <div className="row">

          {/* <!-- Transactions --> */}
          <div className="col-lg-6 col-md-12 col-sm-12 transaction-container">
            <h1>Transactions</h1>
            {props.entries.map((entry, index) => (
              <TransactionsGoalsEntry entry={entry} key={index} />
            ))}
          </div>


          {/* GOALS */}
          <div className="col-lg-6 col-md-12 col-sm-12 transaction-container">
            <h1>Goals</h1>
          </div>

        </div>
      </div>
    </section>
  )
}

export default TransactionsGoals;
