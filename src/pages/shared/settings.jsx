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
                {this.state.blockerList.map(el =>
                    <div className='fmblocker-parent-node'>
                        <input type="checkbox" checked={el.checked} onChange={this.changeCheckbox} value={el.value} />
                        {el.value}
                        {el.children.map(childEl =>
                            <div className='fmblocker-child-node'>
                                <input type="checkbox" checked={childEl.checked} data-is-child={true} onChange={this.changeCheckbox} value={childEl.value}/>
                                {childEl.value}
                            </div>
                        )}
                    </div>
                )}
                <br />
                <button onClick={this.save}>저장</button>
                <button onClick={this.reset}>모두 삭제</button>
            </div>
        );
    }

}

export default Settings;
