import React, {Component} from 'react';
import SubMenuAction from "./SubMenuAction.jsx"
import SubMenuServer from "./SubMenuServer001.jsx"
import {Button, Menu, Dropdown, Input, List, Image} from "semantic-ui-react";
import InputText from '../Input/InputText.jsx';
import SubMenuModel from '../../../../AUTO/SubMenuH001/SubMenuH001Model.jsx';
import LoaderHeader from '../LoaderHeader/LoaderHeader.jsx';
import { Link} from 'react-router-dom';

export default class SubMenuHeader  extends Component{
    constructor(props) {
        super(props);
        this.action = new SubMenuAction();
        this.server = new SubMenuServer("SubMenuH001Server001");
        //this.pageModel = new SubMenuModel();
        this.pageModel = props.subMenuModel;
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
           let subSecondCnt = 0;
            return(
                <Menu pointing secondary vertical id="subMenubarMenu">
                    {
                        this.state.model.subMenuList.map((item, index1) => (
                            <Menu.Item key={"sub_"+index1}>
                                <Menu.Header >{item.name}</Menu.Header>
                                <Menu.Menu>
                                {
                                    item.secondMenuList.map((subItem, index2) =>{
                                        subSecondCnt++;
                                        // let subKeyId = "subSecond_" + subSecondCnt;
                                        let subKeyId = subItem.name + "_" + index1 + "_" + index2;
                                        return (
                                        // <Menu.Item
                                        //     key={subKeyId}
                                        //     name={name}
                                        //     active={this.state.model.subMenuActiveItem === name}
                                        //     onClick={this.action.handleItemClick.bind(this, name, subItem.url) }
                                        // >
                                        // {subItem.name}
                                        // </Menu.Item>
                                        <Link 
                                            to={subItem.url} 
                                            key={subKeyId} 
                                            id={subKeyId} 
                                            className="item"
                                            onClick={this.action.handleItemClick.bind(this, subKeyId)}
                                        >
                                        {subItem.name}
                                        </Link>

                                        )
                                        
                                    })
                                }
                                </Menu.Menu>
                            </Menu.Item>
                        ))
                    }
                </Menu>
                // <div>
                //     {
                //         this.state.model.subMenuList.map((item, index1) => {
                //             let keyId = "sub_"+index1;
                //             return (<div className="menuHead" id={keyId}>
                //                 <div className="row">
                //                     <i className="left icon angle right"></i>
                //                     <span>{item.name}</span>
                //                 </div>
                //                 <div className="menuHeadSub" >
                //                     <ul className="menuHeadSubList">
                //                     {
                //                         item.secondMenuList.map((subItem, index2) =>{
                //                             let subKeyId = subItem.name + "_" + index1 + "_" + index2;

                //                             return (
                //                                     <li id={subKeyId}><a href={subItem.url}>{subItem.name}</a></li>
                //                                 )
                //                         })
                //                     }
                //                     </ul>
                //                 </div>

                //             </div>)
                //         })
                //     }
                // </div>
            );
       }
       else{
            return (
                <LoaderHeader></LoaderHeader>
            )
       } 
    }
}