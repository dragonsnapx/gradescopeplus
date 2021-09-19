import React from 'react';
import ical from "ical-generator";
import {downloadFileFromText} from "../../utils/saveBlob";

export default function CalendarCard(props){

  const download = () => {
    const cal = ical(props);
    downloadFileFromText(props.name + '.ics', cal.toString());
  }

  return(
    <div className='calendar-container'>
      <p className='sync-date'>
        <span className='sync-subject'>{props.name}</span>
      </p>
      <button className='add-button' onClick={() => download()}> Download .ics </button>
    </div>
  );
}