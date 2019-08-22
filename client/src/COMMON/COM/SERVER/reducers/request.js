import {POST, GET, DELETE} from '../actions/action';

/*
* 初始化state
 */

const initState = {
    responseData: null
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case POST:
            return {
                responseData:  1
            };
        case GET:
            return {
                responseData: 2
            };
        case DELETE:
            return {responseData: 0};
        default:
            return state
    }
}