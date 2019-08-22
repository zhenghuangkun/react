import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

// 使用相对路径(../)
// impor Login from '../PAGES/Home/Login';
// import Page1 from '../PAGES/Page1/Page1';
// 使用相对路径
import Menu from './menu';
import Login from 'pages/GH001Rui001/GH001Rui001Page';

//import Routers from './routerMap';

//import commonReduxTool from '../redux/commonReduxTool';
//import commonSessionTool from '../COMMON/MVC/utils/commonSessionTool';
//import commonUtilTool from '../COMMON/MVC/utils/commonUtilTool';

// class RouterMan extends Component {
//     constructor(props) {
//         super(props)
//     }
//     render() {
//         let token = this.props.token;
//         return(
//             <Router>
//                 <div id="main-content">
//                     <div id="header">
//                         <ul>
//                             <li><Link to="/">首页</Link></li>
//                             <li><Link to="/page1">Page1</Link></li>
//                             <li><Link to="/counter">Counter</Link></li>
//                         </ul> 
//                     </div>
//                     <div id="body">
//                         <Switch>
//                             {Routers.map((item, index) => {
//                                 return <Route key={index} path={item.path} exact render={props =>
//                                     (!item.auth ? (<item.component {...props} />) : (token ? <item.component {...props} /> : <Redirect to={{
//                                     pathname: '/login',
//                                     state: { from: props.location }
//                                     }} />)
//                                     )} />
//                             })}
//                             {/* <Route exact path="/" component={Login}/>
//                             <Route path="/login" component={Login}/>
//                             <Route path="/page1" component={Page1}/> */}
//                         </Switch>
//                     </div>
//                     <div id="footer">
//                         <div>
//                             <div className="footer-content">
//                                 <span > <span >zhenghuangkun Limited Company</span>
//                                     &copy; 2018
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Router> 
//         );
//     }
// }




// const getRouter = () => (
    
//     <Router>
//         <div id="main-content">
//             <div id="header">
//                 <ul>
//                     <li><Link to="/">首页</Link></li>
//                     <li><Link to="/page1">Page1</Link></li>
//                     <li><Link to="/counter">Counter</Link></li>
//                 </ul> 
//             </div>
//             <div id="body">
//                 <Switch>
//                     {Routers.map((item, index) => {
//                         return <Route key={index} path={item.path} exact render={props =>
//                             (!item.auth ? (<item.component {...props} />) : (token == true ? <item.component {...props} /> : <Redirect to={{
//                               pathname: '/login',
//                               state: { from: props.location }
//                             }} />)
//                             )} />
//                     })}
//                     {/* <Route exact path="/" component={Login}/>
//                     <Route path="/login" component={Login}/>
//                     <Route path="/page1" component={Page1}/> */}
//                 </Switch>
//             </div>
//             <div id="footer">
//                 <div>
//                     <div className="footer-content">
//                         <span > <span >zhenghuangkun Limited Company</span>
//                             &copy; 2018
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </Router>
// );

// var token = commonReduxTool.getLoginState();

// if(token != true){
//     let userInfo = commonSessionTool.get('userInfo');
//     if(!commonUtilTool.isNullOrEmpty(userInfo)){
//         commonReduxTool.updateLoginState({loginState: true, userName:userInfo.userName});
//         token = true;
//     }
// }
// console.log("token=", token);

const getRouter = () => (
    
    <Router>
        
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/login" component={Login}/>
            <Menu/>
        </Switch>
    </Router>
);

export default getRouter;


// redux拿到token并挂载到App的props上面
/* const mapStateToProps = (state, ownProps) => {
    return { token: state.token }
}

export default connect(mapStateToProps)(RouterMan) */