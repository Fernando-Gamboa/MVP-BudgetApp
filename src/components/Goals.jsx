import React from 'react';
import GoalsEntry from './GoalsEntry.jsx';

const Goals = (props) => {

  return (
    <section className='goals' id='goals'>
      <div className='container-fluid'>
        <div className="row">

          {/* <!-- Goals --> */}
          <div className="transaction-container">
            <h1>Goals</h1>
            <div className='EContainer'>
              {props.entries.map((entry, index) => (
                <GoalsEntry entry={entry} key={index} />
              ))}
            </div>
          </div>


          {/* GOALS */}
          {/* <div className="col-lg-6 col-md-12 col-sm-12 transaction-container">
            <h1>Goals</h1>
          </div> */}

        </div>
      </div>
    </section>
  )
}

export default Goals;
