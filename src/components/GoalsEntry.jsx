import React from 'react';


const GoalsEntry = (props) => {

  return (
    <>
      <div className='EntryContainer'>
        <div className="progress" style={{width: "35%"}}>
          <div className="progress-bar" role="progressbar" aria-label="Example with label" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
        </div>

        <span className='' style={{float:'right', marginLeft: '2%'}}>
          {`20/${props.goal.save}`}
        </span>
      </div>

      <div className='user_info' >
        {`${props.goal.date}`}
      </div>
    </>
  )
}

export default GoalsEntry;
