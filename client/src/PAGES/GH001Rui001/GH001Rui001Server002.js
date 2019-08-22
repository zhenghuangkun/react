
import BaseServer from '../../COMMON/MVC/base/baseServer';
export default class GH001Rui001Server002 extends BaseServer{

    /**
     * 发送手机验证码services
     * @param {*} serverName 
     */
    constructor(serverName){
        super(serverName);
    }

    dataRequest(pageObj){
        console.log(pageObj);
        let data={};
        data.phoneNumber = pageObj.pageModel.phone;

        return data;
    }

    dataResponse(pageObj, dataResult){
        console.log(dataResult);
        if(dataResult.responseHeader.status == 1){
            pageObj.action.resendVerificationCode(pageObj);
        }else{
            
        }
        
        
    }
    
}