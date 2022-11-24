import React from 'react';
import {format} from 'date-fns';

const TransactionsEntry = (props) => {
  // console.log(props.entry, 'llllllll')
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
          {`${format(new Date(props.entry.date.replace(/-/g, '/')), 'MM/dd/yyyy')}`} &nbsp;&nbsp;|&nbsp;&nbsp; {`${props.entry.time}`} &nbsp;&nbsp;|&nbsp;&nbsp; {<span className="deleteButton" onClick={(e) => props.deleteTrans(props.entry)}><i className="fa-solid fa-xmark"></i></span>}

        </div>
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
