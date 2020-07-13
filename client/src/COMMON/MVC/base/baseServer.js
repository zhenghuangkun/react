import React, {Component} from 'react';
const confire = require("../../../CONF/conf");

export default class BaseServer{
    constructor(serverName){
        //super();
        this.serverName = serverName;
    }

    callServer(serverObj, pageObj){
        console.log("base server, serverName=", serverObj.serverName);
        
        if(confire.MOCKFLG || (typeof(confire.MOCKFLG) === 'string' && confire.MOCKFLG == 'true') ){

            console.log("on mock debug");
            this.onMock(serverObj, pageObj);
            return;
        }

        let data = serverObj.dataRequest(pageObj);
        let dirname = serverObj.serverName.substr(0, 11);
        let apiPath = dirname + "/" + dirname + 'Api.jsx';
        
        let controllName = "course/testJson";
        let apiObj = require('AUTOPATH/' + apiPath);
        
        controllName = apiObj[serverObj.serverName].controll;
        
        //let url = confire.SERVERADDR + "course/testJson";
        let url = confire.SERVERADDR + controllName;
        this.onRequest(serverObj, pageObj, data, url);
    }

    onRequest = (serverObj, pageObj, data, url) => {
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        fetch(url, {
            method: 'POST',
            //mode:'cors', // 默认为cors 跨域
            // headers: {
            //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            // },
            headers: myHeaders,
            // 携带cookie, 用于后台验证shrio(后台对应为session).
            credentials: 'include',
            //body: 'userName=zhenghk&password=123456',
            body: `data=${JSON.stringify(data)}`
            
        }).then((response) =>  {
            if(response.ok){
                console.log("请求成功.");
                return response.json();
            }else{
                console.log("请求失败.URL=", url);
                
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText
                  })
            }
            
        }).then(function(json) {
            //console.log('parsed json', json);
            serverObj.dataResponse(pageObj, json);
        }).catch(function(error) {

            if (error.status === 404) {
                console.log(error.statusText);
            }

            if (error.status === 401) {
                console.log(error.statusText);
                console.log("还没登录，请先登录..");
                window.location.href = "/";
            }

            console.log('parsing failed', error);
            
        });
    }

    onMock(serverObj, pageObj){
        let serverName = serverObj.serverName;
        //let path = serverName.substr(0, serverName.length - 5-1);
        //let mockPath = path + '/' + serverName + 'Mock.js';
        let dirname = serverName.substr(0, 11);
        let serverNo = serverName.substr(-3, 3);
        let mockPath = dirname + "/" + dirname + 'Mock' + serverNo +'.js';
        console.log(mockPath);
        let dataResult;
        try {
            dataResult = require('MOCKPATH/' + mockPath);
        } catch (error) {
            console.log('Loading path failed ...');
            console.log(error);
            return;
        }
        //let dataResult = require('../../../MOCK/page/pageRui001Mock.js');
        //console.log(dataResult);

        serverObj.dataResponse(pageObj, dataResult);
    }
}