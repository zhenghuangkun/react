import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import commonReduxTool from '../COMMON/COM/REDUX/commonReduxTool';
import commonSessionTool from '../COMMON/MVC/utils/commonSessionTool';
import commonUtilTool from '../COMMON/MVC/utils/commonUtilTool';
import RouterMap from './routerMap';
import NavigationHeader from "componenthome/MenuHeader/NavigationHeader.jsx";
import SubMenuHeader from "componenthome/MenuHeader/SubMenuHeader.jsx";
import $ from 'jquery';

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

    /**
     * 正要装载,每一个组件render之前立即调用，页面还没渲染前
     */
	componentWillMount(){
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    /**
     * 装载完成
     */
    componentDidMount(){
        let winHeight = document.documentElement.clientHeight;
        let navHeight = document.getElementById("navigationbar").clientHeight;
        let bodyHeight = document.getElementById("body-content").clientHeight;
        let footerHeight = document.getElementById("footer").clientHeight;

        let height = winHeight-navHeight-footerHeight-5;

        if(bodyHeight < height) $("#body-content").height(height);

        window.removeEventListener('scroll', this.handleScroll.bind(this));
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    
    handleScroll = e => {
        console.log(
            '浏览器滚动事件',
            e.srcElement.scrollingElement.scrollTop,
            e.srcElement.scrollingElement.scrollHeight
          )

    }

    handleResize = e =>{
        //console.log('浏览器窗口大小改变事件', e.target.innerWidth);
        //console.log('浏览器窗口大小改变事件', e.target.innerHeight);
        this.updateWindowsSize(e.target.innerHeight);
    }

    updateWindowsSize = (winHeight) =>{
        console.log('浏览器窗口大小改变事件', winHeight);
        let navHeight = document.getElementById("navigationbar").clientHeight;
        let bodyHeight = document.getElementById("body-content").clientHeight;
        let footerHeight = document.getElementById("footer").clientHeight;

        let height = winHeight-navHeight-footerHeight-5;

        if(bodyHeight < height) $("#body-content").height(height);
    }
    

    render() {
        return(
            <Router>
                <div id="main-content">
                    {/* ---------导航栏-------- */}
                    <div id="navigationbar">
                        <NavigationHeader></NavigationHeader>
                    </div>
                    <div id="body-content" className="row">
                        {/* ---------菜单栏-------- */}
                        <div id="sidebar" className="col-md-2">
                            <div id="sidebarheader">
                                <SubMenuHeader></SubMenuHeader>
                            </div>
                        </div>

                        <div id="cotent" className="col-md-10">
                            <div >
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
                            <div className="helpItem">
                                <div className="ui large basic vertical  buttons">
                                    <button className="ui icon  button"><i aria-hidden="true" className="qrcode icon"></i></button>
                                    <button className="ui icon  button"><i aria-hidden="true" className="phone icon"></i></button>
                                    <button className="ui icon  button"><i aria-hidden="true" className="angle up icon"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* -----------底部---------- */}
                    <div id="footer">
                        <div>
                            <div id="footer-content">
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
