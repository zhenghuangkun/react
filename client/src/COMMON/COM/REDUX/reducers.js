import stateChanger  from './reducers/reducer';

export default function combineReducers(state, action) {
    return {
        reducer: stateChanger (state, action)
    }
}