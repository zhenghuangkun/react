/*action*/


export const SETLOGINSTATE = "SETLOGINSTATE";



export function setLoginState(obj){
    return {
        type: SETLOGINSTATE, 
        loginState: obj.loginState,
        userName: obj.userName
    }
}