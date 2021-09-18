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

    changeCheckbox(e){
        const prevState = this.state.blockerList;
        const val = e.target.value;
        for(const i in prevState){

            if(e.target.getAttribute('data-is-child')){
                for(const j in prevState[i]['children']){
                    if(prevState[i]['children'][j].value === val) {
                        prevState[i]['children'][j].checked = e.target.checked;
                        break;
                    }
                }
            }else{
                if(prevState[i].value === val){
                    prevState[i].checked = e.target.checked;
                    // Traverse through all child arrays and uncheck all
                    // IF only disabling. (True -> False)
                    if(e.target.checked === false){
                        for(const j in prevState[i].children){
                            prevState[i]['children'][j].checked = false;
                        }
                    }
                    break;
                }
            }

            this.setState({
                blockerList: prevState
            })
        }
        console.log(prevState);
        console.log(this.state);
    }

    save(){
        const blockerList = this.state.blockerList;
        let exportedConfig = {};
        for(const i in blockerList){

            const val = blockerList[i];
            // Don't have children? = "*"
            if(blockerList[i]['children'].length <= 0){
                if(val['checked']){
                    exportedConfig[val['value']] = "*";
                }
            }else{
                // Only include elements that are checked
                if(val['checked']){
                    const childBlocked = Object.values(val['children']
                        .filter(el => el.checked)
                        .map(el => el.value)
                    );
                    exportedConfig[val['value']] = childBlocked.length <= 0 ? "*" : childBlocked;
                }
            }
        }
        console.log(exportedConfig)
        chrome.storage.sync.set({
            fmblocker_blocklist: {
                ...exportedConfig
            }
        }, () => alert("저장되었습니다."))
    }

    reset(){
        const confirmation = confirm("삭제하시겠습니까?");
        if(confirmation){
            chrome.storage.sync.set({
                fmblocker_blocklist: {}
            }, () => alert("삭제되었습니다."))
        }
    }

    componentDidMount() {
        chrome.storage.sync.get(['fmblocker_blocklist'], data => {
            let blockerList = []
            console.log(data);
            for(const [key, value] of Object.entries(data.fmblocker_blocklist)){
                const currentNode = {
                    value: key,
                    checked: true
                };
                if(value !== "*"){
                    currentNode['children'] = value.map(el => {
                       return {
                           value: el,
                           checked: true
                       };
                    });
                }else{
                    currentNode['children'] = []
                }
                blockerList.push(currentNode);
            }
            console.log(blockerList);
            this.setState({
                blockerList: blockerList
            })
        })
    }

}

export default Settings;
