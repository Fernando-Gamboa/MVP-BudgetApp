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
              <GoalsEntry goal={goal} filter={props.filter} key={index} deleteGoals={props.deleteGoals} />
            ))}
          </div>
          <hr></hr>
          {/* goals button ----------- */}
          <div>
            <SetGoal goals={props.goals} addGoals={props.addGoals} />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Goals;
