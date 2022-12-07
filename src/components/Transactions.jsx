import React from 'react';
import TransactionsEntry from './TransactionsEntry.jsx';
import SearchTrans from './SearchTrans.jsx';

const Transactions = (props) => {

  return (
    <section className='transactions' id='transactions'>
      <div className='container-fluid'>

        <h1>Transactions</h1>
        <div>
          {/* search bar ----------- */}
          <SearchTrans searchFilter={props.searchFilter} />
        </div>
        {/* <!-- Transactions --> */}
        <div className="transaction-container">
          <div id='transContainer' className='EContainer'>
            {props.filter.map((entry, index) => (
              <TransactionsEntry entry={entry} key={index} deleteTrans={props.deleteTrans} editTrans={props.editTrans} updateBal={props.updateBal} />
            ))}
          </div>
          <hr></hr>
        </div>

      </div>
    </section>
  )
}

export default Transactions;
