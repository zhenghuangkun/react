import React, {Component} from 'react';
import commonSessionTool from '../../COMMON/MVC/utils/commonSessionTool.js';
import commonUtilTool from '../../COMMON/MVC/utils/commonUtilTool.js';
import MessageHeader from '../../COMMON/COM/Component/MessageHeader/MessageHeader.jsx';
import GH001Rui001Server002 from './GH001Rui001Server002.js';
export default class GH001Rui001Action {

    constructor(){
        //super("GH001Rui001Action");
    }

    initData(obj){

        //obj.server.callServer(obj.server, obj);
    }

    /**
     * 登录
     */
    loginReq(){
        this.server.callServer(this.server, this);
    }

    /**
     * 发送验证码
     */
    sendVerificationCode(){
        // 判断手机号是否为空
        if(commonUtilTool.isNullOrEmpty(this.pageModel.phone)){
            let messageHeader = new MessageHeader();
            messageHeader.showMessageUtil("GH001Rui001Msg2");
            return;
        }

        // 判断格式是否正确
        if(!commonUtilTool.isPhoneNumber(this.pageModel.phone)){
            let messageHeader = new MessageHeader();
            messageHeader.showMessageUtil("GH001Rui001Msg3");
            return;
        }

        let gh001Rui001Server002 = new GH001Rui001Server002("GH001Rui001Server002");
        gh001Rui001Server002.callServer(gh001Rui001Server002, this);
    }

    /**
     * 开始倒计时-重新发送验证码
     */
    startTimer(pageObj){
        // 设置btn属性不能点击
        pageObj.pageModel.sndMsgBtnDisabledFlg = true;
        let count = pageObj.pageModel.resndMsgCount;
        if(count > 0 && count <= 60 ){
            count --;
            pageObj.pageModel.resndMsgCount = count;
            pageObj.pageModel.sndMsgBtnText = pageObj.pageModel.resndMsgText + "(" + count + "s)";

        }else{
            pageObj.pageModel.sndMsgBtnDisabledFlg = false;
            pageObj.pageModel.resndMsgCount = 60;
            pageObj.pageModel.sndMsgBtnText = pageObj.pageModel.sndMsgText;
            clearInterval(pageObj.pageModel.timer);
        }

        pageObj.setState({model: pageObj.pageModel, initFlag: true});

    }

    resendVerificationCode(pageObj){
        pageObj.pageModel.timer = setInterval(this.startTimer.bind(this, pageObj), 1000);
    }

}