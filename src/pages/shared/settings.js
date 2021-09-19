import React from 'react';
import './settings.css';
import CalendarCard from "./CalendarCard";

global.Buffer = global.Buffer || require('buffer/').Buffer;

class Settings extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      calendars: []
    }
  }

  render(){
    const calendars = this.state.calendars;
    return(
      <div id='app'>
        <div className='modal-header'>
          <h1 className='title'>Gradescope+</h1>
          <p className='credits'>Jake Lee, Chase Feng, Maddie Freed</p>
        </div>
        <div className='modal-body'>
          <div className='help-text'>Visit Gradescope to Sync Calendars.</div>
          {calendars.length > 0  ?
            calendars.map(el => <CalendarCard {...el} key={el.name}/>)
            :
            <p>No Calenders are available. Visit Gradescope and create new calendars to get started.</p>
          }
          <button className='remove-all-btn' onClick={() => this.reset()}> Reset All Calendars </button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    chrome.storage.local.get(cals => {
      const calendars = [];
      for(const cal in cals){
        calendars.push(cals[cal]);
      }
      console.log(calendars);
      this.setState({calendars});
    });
  }

  reset = () => {
    chrome.storage.local.remove('calendars');
  }
}

export default Settings;
