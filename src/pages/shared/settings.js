import React from 'react';
import './settings.css';

class Settings extends React.Component{
  constructor(props) {
      super(props);

      this.state = {
          blockerList: []
      }
  }

  render(){
    return(
      <div id='app'>
        <h1>Gradescope+</h1>
      </div>
    );
  }
}

export default Settings;
