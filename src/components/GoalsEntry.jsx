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
        {`${format(new Date(props.goal.sdate.replace(/-/g, '/')), 'MM/dd/yyyy')} - ${format(new Date(props.goal.date.replace(/-/g, '/')), 'MM/dd/yyyy')}`} &nbsp;&nbsp;|&nbsp;&nbsp; {<span className="deleteButton" onClick={(e) => props.deleteGoals(props.goal)}><i className="fa-solid fa-xmark"></i></span>} &nbsp;&nbsp;|&nbsp;&nbsp; {<span className="editButton" data-bs-toggle="modal" data-bs-target="#exampleModal5" onClick={e => {
          localStorage.setItem('prevGoal', JSON.stringify({...props.goal}))
          }}><i className = "fa-solid fa-pen fa-xs"></i></span>}
      </div>
      {/* <!-- Modal --> */}
      <form className="modal fade" id="exampleModal5" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={(e) => {
        e.preventDefault();
        let obj = {};
        obj['save'] = e.target.save.value;
        obj['sdate'] = e.target.sdate.value;
        obj['date'] = e.target.date.value;
        obj['prev'] = JSON.parse(localStorage.getItem('prevGoal'));
        props.editGoals(obj);
        e.target.save.value = '';
        e.target.date.value = '';
        e.target.sdate.value = '';
        localStorage.removeItem('prevGoal');
      }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Edit your goal</b></h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="mb-3">
                <label htmlFor="save" name="save" className="col-form-label">What's your budget?</label>
                <input type="number" className="form-control" id="save"></input>
              </div>
              <div className="mb-3">
                <label htmlFor="sdate" name='sdate' className="col-form-label">When should this goal start?</label>
                <input type="date" className="form-control" id="sdate"></input>
              </div>
              <div className="mb-3">
                <label htmlFor="date" name='date' className="col-form-label">When should this goal end?</label>
                <input type="date" className="form-control" id="date"></input>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default GoalsEntry;
