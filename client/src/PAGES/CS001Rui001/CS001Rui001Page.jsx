import React, {Component} from 'react';
import CS001Rui001Action from './CS001Rui001Action.jsx';
import CS001Rui001Server001 from './CS001Rui001Server001.jsx';

export default class CS001Rui001Page extends Component {
    constructor(props) {
        super(props);
        this.action = new CS001Rui001Action();
        this.server = new CS001Rui001Server001();
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
        let activeItem = $("#subMenubarMenu").find(".active");
        activeItem.removeClass("active");
        $("#Enterprise_0_0").addClass("active");
        this.action.initData(this);
    }
    
    /**
     * 装载完成
     */
    componentDidMount(){

    }
    
    render() {
        return (
            <div >
                {/* menu-tool */}
                <div>
                    hhhhhhhhhhhh
                </div>

                {/* menu-bar */}
                <div>
                    cccccccccccccccccccccccccc
                </div>
            </div>
        )
    }
}