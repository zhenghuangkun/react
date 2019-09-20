import {createStore} from '../../../../node_modules/redux';
import combineReducers from './reducers.js';

let store = createStore(combineReducers);

export default store;