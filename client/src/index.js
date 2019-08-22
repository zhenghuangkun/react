/*使用es6的箭头函数*/
// var func = str => {
//     document.getElementById('app').innerHTML = str;
// };
// func('我现在在使用Babel!');
// import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
// //import {Router, Route, IndexRoute, hashHistory} from 'react-router-3';
// import React from 'react';
//import ReactDom from 'react-dom';
// import Hello from './PAGES/Hello/hello';
// import Hello from 'pages/Hello/hello';
// import Home from 'pages/Home/Home';
// import AppRoot from './AppRoot';
// import Page1 from 'pages/Page1/Page1';
// import Counter from 'pages/Counter/Counter';
//import getRouter from './router/router';
// import {AppContainer} from 'react-hot-loader'; // 导入保存状态的热更新模块
// import {Provider} from 'react-redux';
// import store from './redux/store';
// import Loadable from 'react-loadable';

/*初始化*/
// renderWithHotReload(getRouter());

// /* 当模块更新的时候，通知index.js */
// if (module.hot) {
//     module.hot.accept('./router/router', () => {
//         const getRouter = require('./router/router').default;
//         renderWithHotReload(getRouter());
//     });
// }

// const MyLoadingComponent = ({ isLoading, error, pastDelay }) => {
//     if (isLoading) {
//         return <div>Loading...</div>
//     }
//     else if (error) {
//         return <div>Sorry, there was a problem loading the page.</div>
//     }
//     else if(pastDelay){
//         return <div>delay {pastDelay}</div>
//     }
//     else {
//         return null;
//     }
// };

// const AsyncHome = Loadable({
//     loader: () => import('pages/Home/Home'),
//     loading: MyLoadingComponent
// });
// const AsyncPage1 = Loadable({
//     loader: () => import('pages/Page1/Page1'),
//     loading: MyLoadingComponent
// });
// const AsyncCounter = Loadable({
//     loader: () => import('pages/Counter/Counter'),
//     loading: MyLoadingComponent
// });

// const AsyncError= Loadable({
//     loader: () => import('pages/Home/Home'),
//     loading: MyLoadingComponent
// });

// const routes11 = [
//     { path: '/', component: AsyncHome, exact: true },
//     { path: '/page1', component: AsyncPage1 },
//     { path: '/counter', component: AsyncCounter }
// ]

// function renderWithHotReload(RootElement) {
    
//     // ReactDom.render(
//     //     <Router history={hashHistory}>
            
//     //         <Route  path="/" component={AppRoot}>
//     //             <IndexRoute  component={Home}/>
//     //             <Route path="page1" 
//     //                 getComponent={
//     //                     (nextState, callback) => {
//     //                         require.ensure([], (require) => {
//     //                             callback(null, require('./PAGES/Page1/Page1.js'))
//     //                         }, "page1")
//     //                     }
//     //                 }
//     //             />
//     //             <Route path="counter" 
//     //                 getComponent={
//     //                     (nextState, callback) => {
//     //                         require.ensure([], (require) => {
//     //                             callback(null, require('./PAGES/Counter/Counter.js'))
//     //                         }, "counter")
//     //                     }
//     //                 }
//     //             />
//     //         </Route>
            
//     //         {/* <Switch>
//     //             <Route exact path="/" component={Home} />
//     //             <Route  path="/page1" component={Page1} />
//     //             <Route  path="/counter" component={Counter} />
//     //         </Switch> */}
            
//     //     </Router>,
//     //     document.getElementById('app')
        
//         // <AppContainer>
//         //     <Provider store={store}>
//         //         <Router>
//         //             <Switch>
//         //                 {
//         //                     routes11.map((route) => (
//         //                         <Route key={route.path} path={route.path} component={route.component}  exact={route.exact} />
//         //                     ))
//         //                 }
                        
                        
//         //             </Switch>
//         //         </Router>
//         //     </Provider>
//         // </AppContainer>,
//         // document.getElementById('app')
//     // )
//     ReactDom.render(
//     <AppContainer>
//                 <Provider store={store}>
//                     {RootElement}
//                 </Provider>
//              </AppContainer>,
//              document.getElementById('app')
//     )
// }


// ReactDom.render(
//     getRouter(),
// document.getElementById('app')
// );

// 方式二
//import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'; 
//import React from 'react';
import ReactDom from 'react-dom';
//import Login from './PAGES/GH001Rui001/Login';
//import Page1 from './PAGES/Page1/Page1';
//import Counter from './PAGES/Counter/Counter';
import getRouter from './router/router';
//import RouterMan from './router/router';
require("./Resource/Style/common.css");
//require("./Resource/Style/semantic.css");
import "semantic-ui-css/semantic.css";
//import RouterMenu from './router/menu';

ReactDom.render(
    getRouter(),
    //<RouterMan />,
    //<RouterMenu></RouterMenu>,
    document.getElementById('app')
);
// ReactDom.render(
//     <Router>
        
//         <div id="center">
//             <Switch>
//                 <Route exact path="/" component={Home} />
//                 <Route  path="/page1" component={Page1} />
//                 <Route  path="/counter" component={Counter} />
//             </Switch>
//         </div>
        
//     </Router>,
//     document.getElementById('app')
// );

// 方式三
// import {Router, Route, IndexRoute, hashHistory} from 'react-router-3';
// import AppRoot from './AppRoot';
// import Home from 'pages/Home/Home';
// require("./Resource/Style/Home/home.css");

// ReactDom.render(
//     <Router history={hashHistory}>
//         <Route  path="/" component={AppRoot}>
//             <IndexRoute  component={Home}/>
//             <Route path="page1" 
//                 getComponent={
//                     (nextState, callback) => {
//                         require.ensure([], (require) => {
//                             callback(null, require('./PAGES/Page1/Page1.js'))
//                         }, "page1")
//                     }
//                 }
//             />
//             <Route path="counter" 
//                 getComponent={
//                     (nextState, callback) => {
//                         require.ensure([], (require) => {
//                             callback(null, require('./PAGES/Counter/Counter.js'))
//                         }, "counter")
//                     }
//                 }
//             />
//         </Route>
        
//         {/* <Switch>
//             <Route exact path="/" component={Home} />
//             <Route  path="/page1" component={Page1} />
//             <Route  path="/counter" component={Counter} />
//         </Switch> */}
        
//     </Router>,
//     document.getElementById('app')
// );