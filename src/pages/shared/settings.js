import React from 'react';
import './settings.css';
import {Constants} from "./constants";
import ical from "ical-generator";
import CalendarCard from "./CalendarCard";

class Settings extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      calendars: [
        {
          data: {
            description: "Discrete Mathematics",
            events: [],
            method: null,
            name: "Chase Bank",
            prodId: "//sebbo.net//ical-generator//EN",
            scale: null,
            source: null,
            timezone: null,
            ttl: null,
            url: null,
          }
        }
      ]
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
          {calendars ?
            calendars.map(el => <CalendarCard {...el} key={el.name}/>)
            :
            <p>No Calenders are available. Visit Gradescope and create new calendars to get started.</p>
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log(ical({name: 'Chase Bank'}))
    // chrome.storage.local.get(Constants.store.CALENDARS, calendars => {
    //   this.setState(calendars);
    // })
  }
}

export default Settings;
