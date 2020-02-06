import {applyMiddleware, combineReducers, createStore} from "redux";
import {userReducer} from "./user";
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {history} from "../utils/history";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import {statusReducer} from "./status";
import {booksReducer} from "./books";
import {cartReducer} from "./cart";
import {usersReducer} from "./users";
import {commandsReducer} from "./commands";

const loggingMiddleware = () => next => action => {
  const result = next(action);
  console.log("[ACTION]", action);
  return result;
};

export let store = createStore(combineReducers({
    router: connectRouter(history),
    user: persistReducer({key: 'user', storage}, userReducer),
    books: booksReducer,
    cart: cartReducer,
    status: statusReducer,
    users: usersReducer,
    commands: commandsReducer,
  }), composeWithDevTools(applyMiddleware(thunk, loggingMiddleware, routerMiddleware(history))),
);

export let persistor = persistStore(store);