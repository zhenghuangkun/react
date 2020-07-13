import React, {Component} from 'react';
import GM001Rui001Action from './GM001Rui001Action.jsx';
import GM001Rui001Server001 from './GM001Rui001Server001.jsx';
import NavigationHeader from "componenthome/MenuHeader/NavigationHeader.jsx";


export default class GM001Rui001Page extends Component {
    constructor(props) {
        super(props);
        this.action = new GM001Rui001Action();
        this.server = new GM001Rui001Server001();
        this.pageModel = {};
        this.state = {
            model:this.pageModel,
            initFlag: true
        }
    }

    /**
     * 正要装载,每一个组件render之前立即调用，页面还没渲染前
     */
	componentWillMount(){
        document.title = "主页面";
        this.action.initData(this);
    }
    
    /**
     * 装载完成
     */
    componentDidMount(){

    }
    
    render() {
        return (
            <div className="main-page">
                {/* menu-tool */}
                <div>
                    主页面
                </div>

                {/* menu-bar */}
                <div>
                    空空如也
                </div>
            </div>
        )
    }
}