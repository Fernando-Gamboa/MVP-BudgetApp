import React from 'react';


const TransactionsEntry = (props) => {

  return (
    <>
      <div className='EntryContainer'>
        <span className='T-right'>
          {`${props.entry.title}`}
        </span>
        <span className='' style={{float:'right'}}>
          {`${props.entry.sign} $${props.entry.amount}`}
        </span>
      </div>

      <div className='user_info'>
        {`${props.entry.date}`} &nbsp;&nbsp;|&nbsp;&nbsp; {`${props.entry.time}`}
      </div>
    </>
  )
}

export default TransactionsEntry;
