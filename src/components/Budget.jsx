import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const Budget = (props) => {

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

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
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    value = hours + ':' + minutes + ' ' + meridian;
    return value;
  }

  return (
    <section id='budget'>
      <div className='container-fluid'>
        {/* <!-- budget --> */}
        <div className="row">

          <div className="col-lg-6 col-md-12 col-sm-12 budget-container">
            <h1>Balance</h1>
            <h1>${props.balance}</h1>

            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-dark btn-lg download-button" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-dollar-sign"></i> Update Balance</button>
            {/* <!-- Modal --> */}
            <form className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={(e) => {
              e.preventDefault();
              props.setBalance(e.target.balance.value);
            }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Update Budget</b></h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="balance" className="col-form-label">New Balance:</label>
                      <input type="number" className="form-control" id="balance"></input>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
                  </div>
                </div>
              </div>
            </form>

            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-outline-light btn-lg download-button" data-bs-toggle="modal" data-bs-target="#exampleModal2"><i className="fa-solid fa-receipt"></i> Add Transaction</button>
            {/* <!-- Modal --> */}
            <form className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={(e) => {
              e.preventDefault();
              let obj = {};
              obj['amount'] = e.target.amount.value;
              obj['title'] = e.target.title.value;
              obj['date'] = e.target.date.value;
              obj['time'] = onTimeChange(e.target.time.value);
              obj['cityState'] = e.target.cityState.value;
              obj['tag'] = e.target.tag.value;
              obj['sign'] = e.target.optionsOutlined.value;
              props.updateBal(e.target.optionsOutlined.value, Number(e.target.amount.value));
              props.updateEntries([...props.filter, obj]);
            }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel"><b>Transactions</b></h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">

                    <input type="radio" className="btn-check" name="optionsOutlined" id="success-outlined" value='+' autoComplete="off"></input>
                    <label className="btn btn-outline-success" htmlFor="success-outlined"><i className="fa-solid fa-plus"></i></label>

                    <input type="radio" className="btn-check" name="optionsOutlined" id="danger-outlined" value='-' autoComplete="off"></input>
                    <label className="btn btn-outline-danger" htmlFor="danger-outlined"><i className="fa-solid fa-minus"></i></label>

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
          </div>


          {/* PIE CHART */}
          <div className="col-lg-6 col-md-12 col-sm-12 budget-container">
            <h1>Summarize</h1>
            <div style={{height:"45vh", position:"relative", marginBottom:"3%", padding:"1%"}}>
              <Doughnut data={data} options={{ maintainAspectRatio: false }}/>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Budget;
