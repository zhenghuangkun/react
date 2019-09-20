
import BaseServer from '../../../MVC/base/baseServer';

export default class SubMenuServer001 extends BaseServer{

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
            
        }else{
            
        }
        
        
    }
    
}