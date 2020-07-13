

import Index from 'pages/GH001Rui001/GH001Rui001Page';
import Login from 'pages/GH001Rui001/GH001Rui001Page';
import Page1 from 'pages/Page1/Page1';
import GM001Rui001Page from 'pages/GM001Rui001/GM001Rui001Page.jsx';
import CS001Rui001Page from 'pages/CS001Rui001/CS001Rui001Page.jsx';
//import GM001Rui001Page from '../PAGES/GM001Rui001/GM001Rui001Page.jsx';
export default [
    // { path: "/", name: "App", component: Index },
    { path: "/page1", name: "page1", component: Page1, auth: true  },
    { path: "/GM001Rui001Page", name: "GM001Rui001Page", component: GM001Rui001Page, auth: true  },
    { path: "/CS001Rui001Page", name: "CS001Rui001Page", component: CS001Rui001Page, auth: true  },
    // { path: "/login", name: "Login", component: Login },
];