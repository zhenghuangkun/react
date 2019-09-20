import React, {Component} from 'react';
import SubMenuAction from "./SubMenuAction.jsx"
import SubMenuServer from "./SubMenuServer001.jsx"
import {Button, Menu, Dropdown, Input, List, Image} from "semantic-ui-react";
import InputText from '../Input/InputText.jsx';
import SubMenuModel from '../../../../AUTO/MenuHeader/SubMenuModel.jsx';



export default class SubMenuHeader  extends Component{
    constructor(props) {
        super(props);
        this.action = new SubMenuAction();
        this.server = new SubMenuServer();
        this.pageModel = new SubMenuModel();

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
                <Menu pointing secondary vertical id="subMenubarMenu">
                    <Menu.Item>
                    <Menu.Header>Products</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                        name='enterprise'
                        active={this.state.model.activeItem === 'enterprise'}
                        onClick={this.action.handleItemClick.bind(this,'enterprise') }
                        />
                        <Menu.Item
                        name='consumer'
                        active={this.state.model.activeItem === 'consumer'}
                        onClick={this.action.handleItemClick.bind(this,'consumer') }
                        />
                    </Menu.Menu>
                    </Menu.Item>

                    <Menu.Item>
                    <Menu.Header>CMS Solutions</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                        name='rails'
                        active={this.state.model.activeItem === 'rails'}
                        onClick={this.action.handleItemClick.bind(this,'rails') }
                        />
                        <Menu.Item
                        name='python'
                        active={this.state.model.activeItem === 'python'}
                        onClick={this.action.handleItemClick.bind(this,'python') }
                        />
                        <Menu.Item
                        name='php'
                        active={this.state.model.activeItem === 'php'}
                        onClick={this.action.handleItemClick.bind(this,'php') }
                        />
                    </Menu.Menu>
                    </Menu.Item>

                    <Menu.Item>
                    <Menu.Header>Hosting</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                        name='shared'
                        active={this.state.model.activeItem === 'shared'}
                        onClick={this.action.handleItemClick.bind(this,'shared') }
                        />
                        <Menu.Item
                        name='dedicated'
                        active={this.state.model.activeItem === 'dedicated'}
                        onClick={this.action.handleItemClick.bind(this,'dedicated') }
                        />
                    </Menu.Menu>
                    </Menu.Item>

                    <Menu.Item>
                    <Menu.Header>Support</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item
                        name='email'
                        active={this.state.model.activeItem === 'email'}
                        onClick={this.action.handleItemClick.bind(this,'email') }
                        >
                        E-mail Support
                        </Menu.Item>

                        <Menu.Item
                        name='faq'
                        active={this.state.model.activeItem === 'faq'}
                        onClick={this.action.handleItemClick.bind(this,'faq') }
                        >
                        FAQs
                        </Menu.Item>
                    </Menu.Menu>
                    </Menu.Item>
                </Menu>
            );
       } 
    }
}