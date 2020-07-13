
import BaseServer from '../../../MVC/base/baseServer';
import commonReduxTool from '../../REDUX/commonReduxTool';
import commonSessionTool from '../../../MVC/utils/commonSessionTool';
import commonUtilTool from '../../../MVC/utils/commonUtilTool';


export default class SubMenuServer001 extends BaseServer{

    constructor(serverName){
        super(serverName);
    }

    dataRequest(pageObj){
        console.log(pageObj);
        let data={};

        let userInfo = commonReduxTool.getLoginUserObj();
        if(!commonUtilTool.isNullOrEmpty(userInfo) && userInfo.loginState == true){
            data.userName = userInfo.userName;
            data.phoneNumber = userInfo.phoneNumber;
        }else{
            let userInfo = commonSessionTool.get('userInfo');
            if(!commonUtilTool.isNullOrEmpty(userInfo)){
                data.userName = userInfo.userName;
                data.phoneNumber = userInfo.phoneNumber;
            }
        }

        console.log(data);
        return data;
    }

    dataResponse(pageObj, dataResult){

        console.log(dataResult);
        if(dataResult.responseHeader.status == 1){
            let subMenuList = dataResult.responseData.subMenuList;

            if(!commonUtilTool.isNullOrEmpty(subMenuList)){
                pageObj.pageModel.subMenuList = subMenuList;
            }
            pageObj.setState({model: pageObj.pageModel, initFlag: true});
        }else{
            
        }
        
        
    }
    
}