import {applyMiddleware, combineReducers, createStore} from "redux";
import {userReducer} from "./user";

const loggingMiddleware = () => next => action => {
    const result = next(action);
    console.log("[ACTION]", action);
    return result;
};

export let store = createStore(combineReducers({
        user: userReducer,
    }), applyMiddleware(loggingMiddleware),
);

