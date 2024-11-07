import {applyMiddleware, combineReducers, createStore} from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from "./reducers/authReducer.js";
import taskReducer from "./reducers/taskReducer.js";

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
