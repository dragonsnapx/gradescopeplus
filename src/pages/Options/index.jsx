import React from 'react';
import ReactDOM from 'react-dom';
import Settings from './settings.jsx'
import '../../assets/img/icon-34.png'
import '../../assets/img/icon-128.png'


function App(){
    return(
        <Settings />
    );
}

export default App;

if(document.getElementById('root')){
    ReactDOM.render(<App />, document.getElementById('root'));
}
