import {SETLOGINSTATE} from '../actions/actions';

/*
* 初始化state
 */

const initState = {
    loginState: false,
    userName:''
};
/*
* reducer
 */
export default function stateChanger (state, action) {
    switch (action.type) {
        case SETLOGINSTATE:
            if(action.loginState == false){
                return {
                    loginState: false,
                    userName:''
                }
            }else{
                return {
                    loginState: true,
                    userName: action.userName
                } 
            }
        default:
            return state
    }
}