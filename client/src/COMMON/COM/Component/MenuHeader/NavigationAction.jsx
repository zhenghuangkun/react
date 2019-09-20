import commonSessionTool from 'mvchome/utils/commonSessionTool.js';
import commonUtilTool from 'mvchome/utils/commonUtilTool.js';
export default class NavigationAction {

    constructor(){
        //super("NavigationAction");
    }

    initData(obj){

    }

    /**
     * 菜单点击事件
     */
    handleItemClick(name){
        //console.log(e);
        let pageObj = this;
        console.log("name " + name + "click");
        console.log(pageObj.pageModel.activeItem);
        pageObj.pageModel.activeItem = name;
        pageObj.setState({model: pageObj.pageModel, initFlag: true});
    }

    /**
     *
     */
    searchClick(){
        console.log(this.pageModel.searchContents);
    }
    /**
     *
     */
    signOut(){
        window.location.href = "/";
    }
}