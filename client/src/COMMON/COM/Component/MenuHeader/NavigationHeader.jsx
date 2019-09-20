import React, {Component} from 'react';
import NavigationAction from "./NavigationAction.jsx"
//import NavigationServer from "./NavigationServer.jsx"
import {Button, Menu, Dropdown, Input, List, Image} from "semantic-ui-react";
import InputText from '../Input/InputText.jsx';
import MenuHeaderModel from '../../../../AUTO/MenuHeader/MenuHeaderModel.jsx';
import commonReduxTool from '../../REDUX/commonReduxTool';
import commonSessionTool from '../../../MVC/utils/commonSessionTool';
import commonUtilTool from '../../../MVC/utils/commonUtilTool';

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
        //this.pageModel = {activeItem:"home"};
        this.pageModel = new MenuHeaderModel();
        //let model = new NavigationHeaderModel.getModel("MenuHeader", 'cn');
        //let pagem = new model()
        //console.log(model.homePage);
        //console.log(model.company);

        let userName = commonReduxTool.getLoginUserName();
        if(commonUtilTool.isNullOrEmpty(userName)){
            let userInfo = commonSessionTool.get('userInfo');
            if(!commonUtilTool.isNullOrEmpty(userInfo)){
                userName = userInfo.userName;
            }
        }
        this.pageModel.userName = userName;
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
                <Menu  pointing secondary size='large' id="navigationbarMenu"  className="menuComSetClass">
                    <Menu.Item>
                        <img src='Resource/image/com/logo.png' />
                    </Menu.Item>
                    <Menu.Item name="home" active={this.state.model.activeItem === "home"} onClick={this.action.handleItemClick.bind(this, "home")}>
                        首页
                    </Menu.Item>
                    <Menu.Item name="company" active={this.state.model.activeItem === "company"} onClick={this.action.handleItemClick.bind(this, "company")}>
                        公司简介
                    </Menu.Item>

                    <Menu.Item>
                        
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input 
                                icon={{ name: 'search', link: true , onClick:this.action.searchClick.bind(this)}}
                                placeholder="Search contents..."
                                onChange={e => this.pageModel.searchContents = e.target.value}
                            />
                        </Menu.Item>

                        <Menu.Item>
                            <List horizontal relaxed='very'>
                                <List.Item>
                                    <Image avatar src='Resource/image/com/userHeard.jpg' />
                                    <List.Content>
                                        <List.Header as='a'>{this.state.model.userName}</List.Header>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Menu.Item>

                        <Dropdown item text='Language'>
                            <Dropdown.Menu>
                            <Dropdown.Item>英语</Dropdown.Item>
                            <Dropdown.Item>日语</Dropdown.Item>
                            <Dropdown.Item>汉语</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Menu.Item
                            name='logout'
                            active={this.state.model.activeItem === 'logout'}
                            onClick={this.action.signOut.bind(this)}
                        >
                            退出
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            );
       } 
    }
}