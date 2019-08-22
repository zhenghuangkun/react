import React, {Component} from 'react';
import NavigationAction from "./NavigationAction.jsx"
//import NavigationServer from "./NavigationServer.jsx"
import {Menu} from "semantic-ui-react";

const colors = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black',
  ];

export default class NavigationHeader  extends Component{
    constructor(props) {
        super(props);
        this.action = new NavigationAction();
        //this.server = new NavigationServer();
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
        //this.action.initData(this);
    }
    
    /**
     * 装载完成
     */
    componentDidMount(){

    }


    render() {
       if(this.state.initFlag){
            return(
                <Menu color={this.state.model.style} inverted>
                    <Menu.Item name="home" active={this.state.model.activeItem === name} onClick={this.action.handleItemClick.bind(this, "123")}>
                        首页
                    </Menu.Item>
                    <Menu.Item name="company" active={this.state.model.activeItem === name} onClick={this.action.handleItemClick.bind(this, this.props.children)}>
                        公司简介
                    </Menu.Item>
                </Menu>
            );
       } 
    }
}