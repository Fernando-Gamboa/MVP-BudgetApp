import React from 'react';


const GoalsEntry = (props) => {
//style={{height: '20px', width: '50%'}}
  return (
    <div className='EntryContainer border-bottom'>
      {`${props.entry.title} | ${props.entry.date}| ${props.entry.time} | ${props.entry.amount}`}
    </div>
  )
}

export default GoalsEntry;
