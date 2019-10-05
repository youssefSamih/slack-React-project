import { combineReducers } from "redux";
import * as actionTypes from '../actions/types';

const intialState = {
    currentUser: null,
    isLoading: true
}

const user_reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false  
            }
        case actionTypes.CLEAR_USER:
            return {
                ...intialState,
                isLoading: false
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user: user_reducer
})

export default rootReducer;