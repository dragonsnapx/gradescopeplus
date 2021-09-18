import React from 'react';

export default function CalendarCard(props){

  console.log(props.data);

  return(
    <div className='calendar-container'>
      <p className='sync-date'>
        <span className='sync-subject'>{props.data.description}: </span>
        May 2021
      </p>
      <button className='add-button'> Download .ics </button>
    </div>
  );
}