import {applyMiddleware, combineReducers, createStore} from "redux";
import {userReducer} from "./user";
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {history} from "../utils/history";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const loggingMiddleware = () => next => action => {
  const result = next(action);
  console.log("[ACTION]", action);
  return result;
};

export let store = createStore(combineReducers({
  router: connectRouter(history),
  user: userReducer,
}), composeWithDevTools(applyMiddleware(thunk, loggingMiddleware, routerMiddleware(history)))
);

