import React, {Component} from 'react';
import commonUtilToll from '../../../MVC/utils/commonUtilTool.js';

export default class MessageHeader {
    constructor(props) {
        //super(props);
        this.method = ["error", "warning", "confirm", "info"];
    }

    keyDownAction(){
        this.pageModel[this.bindName] = this.input.value;
        //console.log(this.input.value);
    }

    iconRender(){
        if(this.icon){
            return(
                <i aria-hidden='true' className={this.iconName + ' icon'}/>
            );
        }
    }

    commonShowMessage = (msgId, title, context, messageClass) =>{
        // 取得页面消息元素
        let msgElement = document.getElementById("messageHeader");
        if(msgElement) { 
            //存在 
            // NULL

        } else{
            // 不存在-创建元素
            msgElement = document.createElement("div"); 
            msgElement.id = "messageHeader";
            document.body.appendChild(msgElement); 
        }

        // 创建页面元素div
        let divtmp = document.createElement("div");
        divtmp.id = msgId; 
        divtmp.className = "ui floating " + messageClass + " message";
         
        divtmp.onclick = function(){
            this.remove();
        };

        // 创建div子元素-icon
        let icon = document.createElement("i");
        icon.className = "close icon";
        divtmp.appendChild(icon); 

        // 创建div子元素-header
        if(!commonUtilToll.isNullOrEmpty(title)){
            let header = document.createElement("div"); 
            header.className = "header";
            header.textContent = title;
            divtmp.appendChild(header); 
        }

        
        // 创建div子元素-content
        let pCon = document.createElement("p"); 
        pCon.textContent = context;
        divtmp.appendChild(pCon); 
        msgElement.appendChild(divtmp); 
    }

    error = (msgId, title, context) =>{
        this.commonShowMessage(msgId, title, context, "error");
    }

    warning = (msgId, title, context) =>{
        this.commonShowMessage(msgId, title, context, "warning");
    }

    info = (msgId, title, context) =>{
        this.commonShowMessage(msgId, title, context, "info");
    }

    confirm = (msgId, title, context) =>{
        this.commonShowMessage(msgId, title, context, "green");
    }

    showMessage = (msgObj) =>{
        if(commonUtilToll.isNullOrEmpty(msgObj)){
            return;
        }

        if(this.method.indexOf(msgObj.type) == -1){
            console.log("message type error. not find message type");
            return;
        }
        this[msgObj.type](msgObj.id, msgObj.title, msgObj.context);
        //this.error(msgObj.id, msgObj.title, msgObj.context);
    }

    hideMessageUtil = (msgId) =>{
        // id为空，返回
        if(commonUtilToll.isNullOrEmpty(msgId)){
            return;
        }

        if(typeof(msgId) !== 'string'){
            this.remove();
            return;
        }

        // 取得页面消息元素
        let msgElement = document.getElementById("messageHeader");
        if(msgElement) { 
            //存在 
            msgElement.removeChild(msgId);
        }

        return;
        
    }

    showMessageUtil(msgId){
        
        if(commonUtilToll.isNullOrEmpty(msgId)){
            return;
        }

        if(msgId.length <= 11){
            console.log("msgId error. not find msgId");
            return;
        }

        let msgPathName = msgId.substr(0, 11);
        let msgPath = msgPathName + "/" + msgPathName + 'Msg.jsx';
        let obj;
        let msgObj
        try {
            obj = require('AUTOPATH/' + msgPath);
            msgObj = obj[msgId];
        } catch (error) {
            console.log('Load path failed , msgid=', msgId);
            console.log(error);
            return;
        }

        this.showMessage(msgObj);

    }
}