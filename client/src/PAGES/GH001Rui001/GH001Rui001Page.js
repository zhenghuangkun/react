import React, {Component} from 'react';
import GH001Rui001Action from './GH001Rui001Action.js';
import GH001Rui001Server001 from './GH001Rui001Server001.js';
import GH001Rui001Model from '../../AUTO/GH001Rui001/GH001Rui001Model.jsx';
import InputText from '../../COMMON/COM/Component/Input/InputText.jsx';
import 'stylehome/GH001Rui001/gh001Rui001Style.css';

import jwkToPem from 'jwk-to-pem';
import JWK from 'jsonwebtoken';
import rsaPemToJwk from 'rsa-pem-to-jwk';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.action = new GH001Rui001Action();
        this.server = new GH001Rui001Server001("GH001Rui001Server001");
        this.pageModel = new GH001Rui001Model();
        this.state = {
            model:this.pageModel,
            initFlag: true
        }
    }

    /**
     * 正要装载,每一个组件render之前立即调用，页面还没渲染前
     */
	componentWillMount(){
        // let jwk = {
        //     "kty": "RSA",
        //     "n": "33TqqLR3eeUmDtHS89qF3p4MP7Wfqt2Zjj3lZjLjjCGDvwr9cJNlNDiuKboODgUiT4ZdPWbOiMAfDcDzlOxA04DDnEFGAf-kDQiNSe2ZtqC7bnIc8-KSG_qOGQIVaay4Ucr6ovDkykO5Hxn7OU7sJp9TP9H0JH8zMQA6YzijYH9LsupTerrY3U6zyihVEDXXOv08vBHk50BMFJbE9iwFwnxCsU5-UZUZYw87Uu0n4LPFS9BT8tUIvAfnRXIEWCha3KbFWmdZQZlyrFw0buUEf0YN3_Q0auBkdbDR_ES2PbgKTJdkjc_rEeM0TxvOUf7HuUNOhrtAVEN1D5uuxE1WSw",
        //     "e": "AQAB",
        //     "d": "DjU54mYvHpICXHjc5-JiFqiH8NkUgOG8LL4kwt3DeBp9bP0-5hSJH8vmzwJkeGG9L79EWG4b_bfxgYdeNX7cFFagmWPRFrlxbd64VRYFawZHRJt-2cbzMVI6DL8EK4bu5Ux5qTiV44Jw19hoD9nDzCTfPzSTSGrKD3iLPdnREYaIGDVxcjBv3Tx6rrv3Z2lhHHKhEHb0RRjATcjAVKV9NZhMajJ4l9pqJ3A4IQrCBl95ux6Xm1oXP0i6aR78cjchsCpcMXdP3WMsvHgTlsZT0RZLFHrvkiNHlPiil4G2_eHkwvT__CrcbO6SmI_zCtMmypuHJqcr-Xb7GPJoa64WoQ",
        //     "p": "8K33pX90XX6PZGiv26wZm7tfvqlqWFT03nUMvOAytqdxhO2HysiPn4W58OaJd1tY4372Qpiv6enmUeI4MidCie-s-d0_B6A0xfhU5EeeaDN0xDOOl8yN-kaaVj9b4HDR3c91OAwKpDJQIeJVZtxoijxl-SRx3u7Vs_7meeSpOfE",
        //     "q": "7a5KnUs1pTo72A-JquJvIz4Eu794Yh3ftTk_Et-83aE_FVc6Nk-EhfnwYSNpVmM6UKdrAoy5gsCvZPxrq-eR9pEwU8M5UOlki03vWY_nqDBpJSIqwPvGHUB16zvggsPQUyQBfnN3N8XlDi12n88ltvWwEhn1LQOwMUALEfka9_s",
        //     "dp": "DB9nGuHplY_7Xv5a5UCs5YgxkWPtJFfbIZ1Zr-XHCCY09JIWReOGQG226OhjwixKtOK_OqmAKtMKM9OmKviJRHNbDhbTxumN3u7cL8dftjXpSryiEQlPmWyW94MneI2WNIrvh4wruQuDt8EztgOiDFxwcnUgey8iend7WmZnE7E",
        //     "dq": "O-bSTUQ4N_UuQezgkF3TDrnBraO67leDGwRbfiE_U0ghQvqh5DA0QSPVzlWDZc9KUitvj8vxsR9o1PW9GS0an17GJEYuetLnkShKK3NWOhBBX6d1yP9rVdH6JhgIJEy_g0Suz7TAFiFc8i7JF8u4QJ05C8bZAMhOLotqftQeVOM",
        //     "qi": "InfGmkb2jNkPGuNiZ-mU0-ZrOgLza_fLL9ErZ35jUPhGFzdGxJNobklvsNoTd-E2GAU41YkJh24bncMLvJVYxHHA5iF7FBWx1SvpEyKVhhnIcuXGD7N5PbNZzEdmr9C6I7cPVkWO-sUV7zfFukexIcANmsd_oBBGKRoYzP5Tti4"
        //     };
        // let ops = {};
        // ops.private = false;
        // let pem = jwkToPem(jwk, ops);
        // console.log(pem);
        
        // ops.private = true;
        // let pem1 = jwkToPem(jwk, ops);
        // console.log(pem1);

        // let pem2 = "-----BEGIN RSA PRIVATE KEY-----" + "\n" +
        // "MIIEogIBAAKCAQEA33TqqLR3eeUmDtHS89qF3p4MP7Wfqt2Zjj3lZjLjjCGDvwr9" + "\n" +
        // "cJNlNDiuKboODgUiT4ZdPWbOiMAfDcDzlOxA04DDnEFGAf+kDQiNSe2ZtqC7bnIc" + "\n" +
        // "8+KSG/qOGQIVaay4Ucr6ovDkykO5Hxn7OU7sJp9TP9H0JH8zMQA6YzijYH9LsupT" + "\n" +
        // "errY3U6zyihVEDXXOv08vBHk50BMFJbE9iwFwnxCsU5+UZUZYw87Uu0n4LPFS9BT" + "\n" +
        // "8tUIvAfnRXIEWCha3KbFWmdZQZlyrFw0buUEf0YN3/Q0auBkdbDR/ES2PbgKTJdk" + "\n" +
        // "jc/rEeM0TxvOUf7HuUNOhrtAVEN1D5uuxE1WSwIDAQABAoIBAA41OeJmLx6SAlx4" + "\n" +
        // "3OfiYhaoh/DZFIDhvCy+JMLdw3gafWz9PuYUiR/L5s8CZHhhvS+/RFhuG/238YGH" + "\n" +
        // "XjV+3BRWoJlj0Ra5cW3euFUWBWsGR0SbftnG8zFSOgy/BCuG7uVMeak4leOCcNfY" + "\n" +
        // "aA/Zw8wk3z80k0hqyg94iz3Z0RGGiBg1cXIwb908eq6792dpYRxyoRB29EUYwE3I" + "\n" +
        // "wFSlfTWYTGoyeJfaaidwOCEKwgZfebsel5taFz9Iumke/HI3IbAqXDF3T91jLLx4" + "\n" +
        // "E5bGU9EWSxR675IjR5T4opeBtv3h5ML0//wq3GzukpiP8wrTJsqbhyanK/l2+xjy" + "\n" +
        // "aGuuFqECgYEA8K33pX90XX6PZGiv26wZm7tfvqlqWFT03nUMvOAytqdxhO2HysiP" + "\n" +
        // "n4W58OaJd1tY4372Qpiv6enmUeI4MidCie+s+d0/B6A0xfhU5EeeaDN0xDOOl8yN" + "\n" +
        // "+kaaVj9b4HDR3c91OAwKpDJQIeJVZtxoijxl+SRx3u7Vs/7meeSpOfECgYEA7a5K" + "\n" +
        // "nUs1pTo72A+JquJvIz4Eu794Yh3ftTk/Et+83aE/FVc6Nk+EhfnwYSNpVmM6UKdr" + "\n" +
        // "Aoy5gsCvZPxrq+eR9pEwU8M5UOlki03vWY/nqDBpJSIqwPvGHUB16zvggsPQUyQB" + "\n" +
        // "fnN3N8XlDi12n88ltvWwEhn1LQOwMUALEfka9/sCgYAMH2ca4emVj/te/lrlQKzl" + "\n" +
        // "iDGRY+0kV9shnVmv5ccIJjT0khZF44ZAbbbo6GPCLEq04r86qYAq0woz06Yq+IlE" + "\n" +
        // "c1sOFtPG6Y3e7twvx1+2NelKvKIRCU+ZbJb3gyd4jZY0iu+HjCu5C4O3wTO2A6IM" + "\n" +
        // "XHBydSB7LyJ6d3taZmcTsQKBgDvm0k1EODf1LkHs4JBd0w65wa2juu5XgxsEW34h" + "\n" +
        // "P1NIIUL6oeQwNEEj1c5Vg2XPSlIrb4/L8bEfaNT1vRktGp9exiRGLnrS55EoSitz" + "\n" +
        // "VjoQQV+ndcj/a1XR+iYYCCRMv4NErs+0wBYhXPIuyRfLuECdOQvG2QDITi6Lan7U" + "\n" +
        // "HlTjAoGAInfGmkb2jNkPGuNiZ+mU0+ZrOgLza/fLL9ErZ35jUPhGFzdGxJNobklv" + "\n" +
        // "sNoTd+E2GAU41YkJh24bncMLvJVYxHHA5iF7FBWx1SvpEyKVhhnIcuXGD7N5PbNZ" + "\n" +
        // "zEdmr9C6I7cPVkWO+sUV7zfFukexIcANmsd/oBBGKRoYzP5Tti4=" + "\n" +
        // "-----END RSA PRIVATE KEY-----";

        // console.log(pem2);
        // JWK.sign({"iss":"joe",
        //     "exp":1300819380, 
        //     "http://example.com/is_root":true,
        //     "Authorization":123456789000000000000000000000000
        //     }, 
        //     pem2, 
        //     { algorithm: 'RS256'}, 
        //     function(err, token){
        //         console.log(token);
        //     }
        // );

        // let jwk2 = rsaPemToJwk(pem1, {use: 'sig'}, 'private');
        // console.log(jwk2);
        document.title = "登录页面";
        this.action.initData(this);
    }
    
    /**
     * 装载完成
     */
    componentDidMount(){

    }


    render() {
        let logoStyle={
            width: '200px',
            height: '60px'

        };

        if(this.state.initFlag){
            return (
                <div className="login-content">
                    <div className="row">
                        <div className="col-md-8"></div>
                        <div className="col-md-4" >
                            <div style={{marginTop:'20%'}}>
                                <img src="../../Resource/image/com/logo.png" alt="logo" style={logoStyle}></img>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8"></div>
                        <div className="col-md-4">
                            <div className="login-body">
                                <div style={{witdh:'100%', background:'#ece6e6a1'}}>
                                    <div style={{paddingLeft: '8px', paddingTop: '4px', paddingBottom: '8px'}}>
                                        <span></span>
                                        
                                        <label style={{color: '#3cb6b7e8', fontSize: '18px'}}><i aria-hidden='true' className='key icon'/>用户登录</label>
                                    </div>
                                </div>
                                {/* <div className="row" style={{marginTop: '8px'}} >
                                    <div className="col-md-3" style={{textAlign: 'right', paddingRight:'12px'}}><label style={{fontSize: '16px'}}>账 号:</label></div>
                                    <div className="col-md-9">
                                        <InputText  type="text" inputType="" placeholder="username" model={this.pageModel} property='userName' className="input-body" icon="left icon" iconName="user" />
                                    </div>
                                </div> */}
                                <div style={{marginTop: '8px', witdh:'100%'}}>
                                    <div className="loginInputGroup">
                                        <InputText  divClass="loginInputGC" type="text" inputType="" placeholder="username" model={this.pageModel} property='userName' className="input-body" icon="left icon" iconName="user" />
                                    </div>
                                    
                                </div>
                                {/* <div className="row" style={{marginTop: '8px'}}>
                                    <div className="col-md-3" style={{textAlign: 'right', paddingRight:'12px'}}><label style={{fontSize: '16px'}}>密 码:</label></div>
                                    <div className="col-md-9">
                                        <InputText  placeholder="password" model={this.pageModel} property='passWord' type='password' className="input-body" icon="left icon" iconName="lock"/>
                                    </div>
                                </div> */}
                                <div style={{marginTop: '8px', witdh:'100%'}}>
                                    <div className="loginInputGroup">
                                        <InputText  divClass="loginInputGC" placeholder="password" model={this.pageModel} property='passWord' type='password' className="input-body" icon="left icon" iconName="lock"/>
                                    </div>
                                </div>
                                {/* <div hidden={this.state.model.errFlag}>
                                    <div className="no-padding-center" style={{marginTop: '15px'}}>
                                        <label style={{color: 'red'}}>{this.state.model.errMessage}</label>
                                    </div>
                                </div> */}
                                {/* <div className="row" style={{marginTop: '15px'}}>
                                    <div className="col-md-6 no-padding-center">
                                        <button type="button" className="btn-warning" onClick={this.action.loginReq.bind(this)}>登录</button>
                                    </div>
                                    <div className="col-md-6 no-padding-center">
                                        <button type="button" className="btn-success">重置</button>
                                    </div>
                                </div> */}
                                
                                {/* <div style={{marginTop: '8px', witdh:'100%'}}>
                                    <div className="loginInputGC">
                                        <div className="ui input action mini">
                                            <InputText className="phoneInput" type="text" inputType="" placeholder="手机号" model={this.pageModel} property='phone' divTag="false" style={{ height: '38px'}}/>
                                            <button disabled={this.state.model.sndMsgBtnDisabledFlg} className="ui button" style={{height: '38px', paddingLeft: '1.72em', paddingRight: '1.72em'}} onClick={this.action.sendVerificationCode.bind(this)}>{this.state.model.sndMsgBtnText}</button>
                                        </div>
                                    </div>
                                </div> */}
                                <div style={{marginTop: '8px', witdh:'100%'}}>
                                    <div className="loginInputGroup">
                                        <InputText divClass="loginInputGC" placeholder="手机号码" model={this.pageModel} property='phone' type='text' id="input-body-verCode" >
                                            <button disabled={this.state.model.sndMsgBtnDisabledFlg} id="input-button-verCode" className="ui button" onClick={this.action.sendVerificationCode.bind(this)} style={{height:'38px', width:'40%', fontSize: '0.8rem'}}>{this.state.model.sndMsgBtnText}</button>
                                        </InputText>
                                    </div>
                                </div>
                                <div style={{marginTop: '8px', witdh:'100%'}}>
                                    <div className="loginInputGroup">
                                        <InputText  divClass="loginInputGC" placeholder="验证码" model={this.pageModel} property='verificationCode' type='text' className="input-body" />   
                                  
                                    </div>
                                </div>
                                

                                <div style={{marginTop: '15px', witdh:'100%'}}>
                                    <div className="loginInputGroup">
                                        <div className="loginInputGC">
                                            <button type="button" className="ui yellow fluid button" onClick={this.action.loginReq.bind(this)}>登录</button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginTop: '15px', witdh:'100%'}}>
                                    <div className="loginInputGroup">
                                        <div className="loginInputGC">
                                            <button type="button" className="ui blue fluid button" onClick={this.action.loginReq.bind(this)}>注册</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
            );
        }
        else{
            return "";
        }
    }
}