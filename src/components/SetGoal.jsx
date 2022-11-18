import React from 'react';


const SetGoal = (props) => {

  return (
    <section className='setgoal' id='setgoal'>
      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-outline-light btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal3"><i className="fa-solid fa-coins"></i> Set Goal</button>
      {/* <!-- Modal --> */}
      <form className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={(e) => {
        e.preventDefault();
        let obj = {};
        obj['save'] = e.target.save.value;
        obj['date'] = e.target.date.value;
        props.updateGoals([...props.goals, obj]);
      }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Set a goal to spend less</b></h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="mb-3">
                <label htmlFor="save" name="save" className="col-form-label">What's your budget?</label>
                <input type="number" className="form-control" id="save"></input>
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
    </section>
  )
}

export default SetGoal;