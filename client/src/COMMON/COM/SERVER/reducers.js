import request from './reducers/request';

export default function combineReducers(state = {}, action) {
    return {
        responseData: request(state.counter, action)
    }
}