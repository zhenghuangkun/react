
import commonUtilTool from './commonUtilTool';

const CommonPageRedirectTool = {
    redirect(obj, path){
        if(commonUtilTool.isNullOrEmpty(obj) || commonUtilTool.isNullOrEmpty(path)){
            return;
        }

        obj.props.history.push("/" + path);
        
    }
    
}

module.exports = CommonPageRedirectTool;