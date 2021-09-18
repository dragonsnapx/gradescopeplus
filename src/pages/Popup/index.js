import React from 'react';
import ReactDOM from 'react-dom';
import Settings from '../shared/settings'

function App(){
    return(
        <Settings />
    );
}

export default App;

if(document.getElementById('root')){
    ReactDOM.render(<App />, document.getElementById('root'));
}
