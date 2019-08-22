import React, {Component} from 'react';

export default class PageAction {

    constructor(){
        
    }

    initData(obj){

        obj.server.callServer(obj.server, obj);
    }
}