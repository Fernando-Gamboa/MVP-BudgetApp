import React from 'react';
import { format } from 'date-fns'


const GoalsEntry = (props) => {
  let completed = false;
  let failed = false;
  let spent = 0;

  // iterate through filtered entries and compare dates
  props.filter.map((entry, index) => {
    let entryDate = new Date(entry.date);
    let goalDate = new Date(props.goal.sdate);
    // if transaction dates are greater than our goal date
    if (entryDate >= goalDate) {
      // add to spent variable
      spent += Number(entry.amount);
    }
    // if current date is greater than our goal date
    if (new Date() >= new Date(props.goal.date)) {
      // set goal completed to true
      completed = true;
    } else if (spent > props.goal.save) {
      // if spent money is is greater than our goal budget
      failed = true;
    }
  })

  return (
    <>
      <div className='EntryContainer'>

        <div className="progress" style={{width: "35%"}}>
          <div className="progress-bar" role="progressbar" aria-label="Example with label" style={{width: `${Number(`${Math.round((spent / props.goal.save) * 100)}`)}%`}} aria-valuenow={Number(`${Math.round((spent / props.goal.save) * 100)}`)} aria-valuemin="0" aria-valuemax="100">{`${Math.round((spent / props.goal.save) * 100)}% / 100%`}</div>
        </div>
        <span className='' style={{float:'right', marginLeft: '2%'}}>
          {`$${spent} / $${props.goal.save}`}  &nbsp;&nbsp; {failed ? <i className="fa-solid fa-circle-xmark"></i> : completed ? <i className="fa-solid fa-circle-check"></i> : ''}
        </span>

      </div>

      <div className='user_info' >
        {`${format(new Date(props.goal.sdate.replace(/-/g, '/')), 'MM/dd/yyyy')} - ${format(new Date(props.goal.date.replace(/-/g, '/')), 'MM/dd/yyyy')}`} &nbsp;&nbsp;|&nbsp;&nbsp; {<span className="deleteButton" onClick={(e) => props.deleteGoals(props.goal)}><i className="fa-solid fa-xmark"></i></span>}
      </div>
    </>
  )
}

export default GoalsEntry;
