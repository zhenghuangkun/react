
import BaseServer from '../../COMMON/MVC/base/baseServer';
export default class PageServer extends BaseServer{

    constructor(serverName){
        super(serverName);
    }

    dataRequest(pageObj){
        console.log(pageObj);
        let data={};
        data.userName = "zhenghk123";
        data.passWord = "12345678";

        return data;
    }

    dataResponse(pageObj, dataResult){

        console.log(dataResult);
        pageObj.pageMode.data = {};
        pageObj.pageMode.data.userName = dataResult.userName;
        pageObj.pageMode.data.passWord = dataResult.passWord;

        pageObj.setState({model: pageObj.pageMode, initFlag: true});
    }
    
}