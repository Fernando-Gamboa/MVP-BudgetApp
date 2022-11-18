import React from 'react';
import GoalsEntry from './GoalsEntry.jsx';
import SetGoal from './SetGoal.jsx';

const Goals = (props) => {

  return (
    <section className='goals' id='goals'>
      <div className='container-fluid'>

        <h1>Goals</h1>
        {/* <!-- Goals --> */}
        <div className="transaction-container">
          <div className='EContainer'>
            {props.goals.map((goal, index) => (
              <GoalsEntry goal={goal} entries={props.entries} key={index} />
            ))}
          </div>
          <hr></hr>
          {/* goals button ----------- */}
          <div>
            <SetGoal goals={props.goals} updateGoals={props.updateGoals} />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Goals;
