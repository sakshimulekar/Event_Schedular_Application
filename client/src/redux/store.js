import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from "redux-thunk";
import {reducer as authReducer} from "./authReducer/reducer";
import {reducer as todoReducer} from "./todoReducer/reducer"

const rootReducer=combineReducers({
    authReducer,
    todoReducer
})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))