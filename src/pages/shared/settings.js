import React from 'react';
import './settings.css';

class Settings extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            blockerList: []
        }

        this.changeCheckbox = this.changeCheckbox.bind(this);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
    }

    render(){
        return(
            <div id='app'>
                <h1>FMBlocker 블라인드 리스트 설정</h1>
                <br />
                <button onClick={this.save}>저장</button>
                <button onClick={this.reset}>모두 삭제</button>
            </div>
        );
    }

}

export default Settings;
