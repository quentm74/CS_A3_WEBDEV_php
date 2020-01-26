import {applyMiddleware, combineReducers, createStore} from "redux";
import {userReducer} from "./user";
import {connectRouter} from 'connected-react-router';
import {history} from "../utils/history";

const loggingMiddleware = () => next => action => {
  const result = next(action);
  console.log("[ACTION]", action);
  return result;
};

export let store = createStore(combineReducers({
    router: connectRouter(history),
    user: userReducer,
  }), applyMiddleware(loggingMiddleware),
);

