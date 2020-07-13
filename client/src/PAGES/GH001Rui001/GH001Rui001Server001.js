
import BaseServer from '../../COMMON/MVC/base/baseServer';
import commonReduxTool from '../../COMMON/COM/REDUX/commonReduxTool';
import commonSessionTool from '../../COMMON/MVC/utils/commonSessionTool';
import commonPageRedirectTool from '../../COMMON/MVC/utils/commonPageRedirectTool';
import MessageHeader from '../../COMMON/COM/Component/MessageHeader/MessageHeader.jsx';
export default class GH001Rui001Server001 extends BaseServer{

    constructor(serverName){
        super(serverName);
    }

    dataRequest(pageObj){
        console.log(pageObj);
        let data={};
        data.userName = pageObj.pageModel.userName;
        data.password = pageObj.pageModel.passWord;
        data.phoneNumber = pageObj.pageModel.phone;
        data.verificationCode = pageObj.pageModel.verificationCode;
        return data;
    }

    dataResponse(pageObj, dataResult){

        console.log(dataResult);
        if(dataResult.responseHeader.status == 1){
            pageObj.pageModel.errFlag = true;
            pageObj.pageModel.errMessage = '';
            //pageObj.setState({model: pageObj.pageModel, initFlag: true});
            commonReduxTool.updateLoginState({loginState: true, 
                                              userName:pageObj.pageModel.userName,
                                              phoneNumber:pageObj.pageModel.phone
                                            });
            console.log( commonReduxTool.getLoginState());

            commonSessionTool.push('userInfo', {
                loginState: true,
                userName: pageObj.pageModel.userName,
                phoneNumber:pageObj.pageModel.phone
            });

            commonSessionTool.push('subMenuList', dataResult.responseData.subMenuList);

            //window.location.href = "page1";
            commonSessionTool.push('pageId', "login");
            //commonPageRedirectTool.redirect(pageObj, "page1");
            commonPageRedirectTool.redirect(pageObj, "GM001Rui001Page");
        }else{
            let messageHeader = new MessageHeader();
            //pageObj.pageModel.errFlag = false;
            //pageObj.pageModel.errMessage = '账号或密码错误...';
            //pageObj.setState({model: pageObj.pageModel, initFlag: true});
            messageHeader.showMessageUtil("GH001Rui001Msg1");
        }
        
    }
    
}