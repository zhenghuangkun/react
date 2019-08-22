import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import commonReduxTool from '../redux/commonReduxTool';
import commonSessionTool from '../COMMON/MVC/utils/commonSessionTool';
import commonUtilTool from '../COMMON/MVC/utils/commonUtilTool';
import RouterMap from './routerMap';
import NavigationHeader from "componenthome/MenuHeader/NavigationHeader.jsx";

export default class Menu extends Component {
    constructor(props) {
        super(props);
        let token = commonReduxTool.getLoginState();
        //console.log("path:" + this.props.location.pathname);
        if(token != true){
            let userInfo = commonSessionTool.get('userInfo');
            if(!commonUtilTool.isNullOrEmpty(userInfo)){
                commonReduxTool.updateLoginState({loginState: true, userName:userInfo.userName});
                token = true;
            }
        }
        this.token = token;

        this.pageId = commonSessionTool.get('pageId');
    }

    render() {
        return(
            <Router>
                <div id="main-content">
                    {/* ---------导航栏-------- */}
                    <div className="navigationbar">
                        <NavigationHeader></NavigationHeader>
                    </div>
                    <div id="body-content">
                        {/* ---------菜单栏-------- */}
                        <div className="menubar">
                            <div className="menuheader">
                                <div id="header">
                                    <ul>
                                        <li><Link to="/">首页</Link></li>
                                        <li><Link to="/page1">Page1</Link></li>
                                        <li><Link to="/counter">Counter</Link></li>
                                    </ul> 
                                </div>
                            </div>
                        </div>

                        <div className="bodycotent">
                            <div className="scroll">
                                {/* ---------------------- */}
                                <div className="bodybar">
                                    <div className="col-md-10">
                                        <div id="body">
                                            <Switch>
                                                {RouterMap.map((item, index) => {
                                                    return <Route key={index} path={item.path} exact render={props =>
                                                        (!item.auth ? (<item.component {...props} />) : (this.token ? <item.component {...props} /> : window.location.href = "login")
                                                        )} />
                                                })}
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* -----------底部---------- */}
                    <div id="footer">
                        <div>
                            <div className="footer-content">
                                <span > <span >zhenghuangkun Limited Company</span>
                                    &copy; 2018
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Router> 
        );
    }
}
