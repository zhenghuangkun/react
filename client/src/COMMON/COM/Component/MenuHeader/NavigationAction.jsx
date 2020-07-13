import commonSessionTool from 'mvchome/utils/commonSessionTool.js';
import commonUtilTool from 'mvchome/utils/commonUtilTool.js';
import commonPageRedirectTool from '../../../MVC/utils/commonPageRedirectTool';
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
        console.log(pageObj.pageModel.navigationActiveItem);
        pageObj.pageModel.navigationActiveItem = name;

        if(name === "courseStudy"){
            //window.location.href = "CS001Rui001Page";
            //commonPageRedirectTool.redirect(pageObj, "CS001Rui001Page");
            //window.location.replace = "CS001Rui001Page";
        }
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