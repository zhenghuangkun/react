import {SETLOGINSTATE} from '../actions/actions';

/*
* 初始化state
 */

const initState = {
    loginState: false,
    userName: '',
    phoneNumber: ''
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
                    userName:'',
                    phoneNumber:''
                }
            }else{
                return {
                    loginState: true,
                    userName: action.userName,
                    phoneNumber: action.phoneNumber
                } 
            }
        default:
            return state
    }
}