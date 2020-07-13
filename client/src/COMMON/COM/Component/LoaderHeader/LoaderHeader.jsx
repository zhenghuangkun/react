import React, {Component} from 'react';
import {Segment, Dimmer, Loader, Image} from "semantic-ui-react";



export default class LoaderHeader  extends Component{
    constructor(props) {
        super(props);
    }


    /**
     * 正要装载,每一个组件render之前立即调用，页面还没渲染前
     */
	componentWillMount(){
        //this.action.initData(this);
    }
    
    /**
     * 装载完成
     */
    componentDidMount(){

    }


    render() {
       return(
        <div id="loaderBackground">
            {/* <img src='Resource/image/com/loader/loader001.gif' /> */}
            <div id="centerLoader">
                <div class="row">
                    <div id="loaderItem"></div>
                    <div id="loaderItem2"></div>
                </div>
            </div>
        </div>
       )
    }
}