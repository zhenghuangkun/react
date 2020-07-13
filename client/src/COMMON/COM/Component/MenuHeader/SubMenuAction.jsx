import commonSessionTool from 'mvchome/utils/commonSessionTool.js';
import commonUtilTool from 'mvchome/utils/commonUtilTool.js';
export default class SubMenuAction {

    constructor(){
        //super("NavigationAction");
    }

    initData(obj){
        obj.server.callServer(obj.server, obj);
    }

    /**
     * 菜单点击事件
     */
    handleItemClick(name, ){
        //console.log(e);

        let pageObj = this;
        console.log("name " + name + "click");
        console.log(pageObj.pageModel.subMenuActiveItem);
        pageObj.pageModel.subMenuActiveItem = name;
        pageObj.setState({model: pageObj.pageModel, initFlag: true});
    }

    
}