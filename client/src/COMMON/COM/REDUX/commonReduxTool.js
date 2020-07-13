import {setLoginState} from './actions/actions';

import store from './store';

// 打印初始状态
//console.log(store.getState());

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
//let unsubscribe = store.subscribe(() =>
    //console.log("sss,", store.getState())
//);

// 发起一系列 action


// 停止监听 state 更新
//unsubscribe();

const commonReduxTool = {
    updateLoginState(obj){
        if(!obj){
            return;
        }
        if(!obj.loginState){
            return;
        }
        store.dispatch(setLoginState(obj));
    },

    getLoginState(){
        
        var obj = store.getState();
        //console.log(obj);
        if(!obj.reducer){
            return false;
        }
        return obj.reducer.loginState;
    },

    getLoginUserName(){
        
        var obj = store.getState();
        //console.log(obj);
        if(!obj.reducer){
            return "";
        }
        if(!obj.reducer.loginState){
            return "";
        }
        return obj.reducer.userName;
    },

    getLoginUserObj(){
        
        var obj = store.getState();
        //console.log(obj);
        if(!obj.reducer){
            return NULL;
        }
        if(!obj.reducer.loginState){
            return NULL;
        }
        return obj.reducer;
    }
}

module.exports = commonReduxTool;