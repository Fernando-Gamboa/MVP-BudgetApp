import React from 'react';
import {format} from 'date-fns';
import {useState} from 'react';

const TransactionsEntry = (props) => {
  // adds AM and PM to time
  function onTimeChange(value) {
    let timeSplit = value.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours === 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    value = hours + ':' + minutes + ' ' + meridian;
    return value;
  }

  return (
    <>
      {props.entry.title !== 'No transactions found...' ?
      <>
        <div className='EntryContainer'>
          <span className='T-right'>
            {`${props.entry.title}`}
          </span>
          <span className='' style={{float:'right', marginTop: '3.5px'}}>
            {`${props.entry.sign} $${props.entry.amount}`}
          </span>
        </div>

        <div className='user_info'>
          {`${format(new Date(props.entry.date.replace(/-/g, '/')), 'MM/dd/yyyy')}`} &nbsp;&nbsp;|&nbsp;&nbsp; {`${props.entry.time}`} &nbsp;&nbsp;|&nbsp;&nbsp; {<span className="deleteButton" onClick={(e) => props.deleteTrans(props.entry)}><i className="fa-solid fa-xmark"></i></span>} &nbsp;&nbsp;|&nbsp;&nbsp; {<span className="editButton" data-bs-toggle="modal" data-bs-target="#exampleModal4" onClick={e => {
          localStorage.setItem('prevTrans', JSON.stringify({...props.entry}))
          }}><i className = "fa-solid fa-pen fa-xs"></i></span>}
        </div>
        {/* <!-- Modal for editing transactions --> */}
        <form className="modal fade" id="exampleModal4" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={(e) => {
          e.preventDefault();
          let obj = {};
          obj['amount'] = e.target.amount.value;
          obj['title'] = e.target.title.value;
          obj['date'] = e.target.date.value;
          obj['time'] = onTimeChange(e.target.time.value);
          obj['cityState'] = e.target.cityState.value;
          obj['tag'] = e.target.tag.value;
          obj['sign'] = e.target.optionsOutlined.value;
          obj['prev'] = JSON.parse(localStorage.getItem('prevTrans'));
          props.updateBal(e.target.optionsOutlined.value, Number(e.target.amount.value), true, Number(JSON.parse(localStorage.getItem('prevTrans')).amount));
          props.editTrans(obj);
          e.target.amount.value = '';
          e.target.title.value = '';
          e.target.date.value = '';
          e.target.time.value = '';
          e.target.cityState.value = '';
          e.target.tag.value = '';
          e.target.optionsOutlined.value = '';
          localStorage.removeItem('prevTrans');
        }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Edit your transaction</b></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <input type="radio" className="btn-check" name="optionsOutlined" id="plus-outlined" value='+' autoComplete="off"></input>
                <label className="btn btn-outline-success" htmlFor="plus-outlined"><i className="fa-solid fa-plus"></i></label>

                <input type="radio" className="btn-check" name="optionsOutlined" id="minus-outlined" value='-' autoComplete="off"></input>
                <label className="btn btn-outline-danger" htmlFor="minus-outlined"><i className="fa-solid fa-minus"></i></label>

                <div className="mb-3">
                  <label htmlFor="amount" name='amount' className="col-form-label">Amount:</label>
                  <input type="number" className="form-control" id="amount"></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="title" name='title' className="col-form-label">Title:</label>
                  <input className="form-control" id="title"></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="date" name='date' className="col-form-label">Date:</label>
                  <input type="date" className="form-control" id="date"></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="time" name='time' className="col-form-label">Time:</label>
                  <input type="time" className="form-control" id="time"></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="cityState" name='cityState' className="col-form-label">City & State:</label>
                  <input type="text" className="form-control" id="cityState"></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" name='tag' className="col-form-label">Tag:</label>
                  {/* <input type="tag" className="form-control" id="tag"></input> */}
                  {/* drop down ------- */}
                  <select className="form-select" aria-label="Default select example" defaultValue="default" name="tag">
                    <option disabled value="default">Select Tag</option>
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Travel">Travel</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Services">Services</option>
                    <option value="Other">Other</option>
                  </select>

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
      :
      <div className='EntryContainer'>
        <span className='T-right'>
          {`${props.entry.title}`}
        </span>
      </div>}
    </>
  )
}

export default TransactionsEntry;
