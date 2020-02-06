import * as api from "../utils/api";
import {loadingStatus} from "../utils/consts";
import {batch} from "react-redux";
import {updateErrorStatus, updateLoadingStatus, updateMsgStatus} from "./status";

const prefix = "USER:";

const UPDATE_USER = prefix + 'UPDATE_USER';
const updateUser = (id, first_name, last_name, address, bookseller) => ({
  type: UPDATE_USER,
  id: id,
  first_name: first_name,
  last_name: last_name,
  address: address,
  bookseller: bookseller,
});

export const signIn = (id, password) => {
  return (dispatch, _) => {
    dispatch(updateLoadingStatus('sign_in', loadingStatus.LOADING));
    dispatch(updateErrorStatus('sign_in', null));
    api.http_post("/sign-in.php", {
      id,
      password,
    }, (data) => {
      batch(() => {
        dispatch(updateLoadingStatus('sign_in', loadingStatus.SUCCESS));
        dispatch(updateUser(data.id, data.first_name, data.last_name, data.address, data.bookseller));
      });
    }, (error) => {
      dispatch(updateLoadingStatus('sign_in', loadingStatus.ERROR));
      dispatch(updateErrorStatus('sign_in', error.data.msg));
    });
  };
};

export const signUp = (first_name, last_name, address, password) => {
  return (dispatch, _) => {
    dispatch(updateLoadingStatus('sign_up', loadingStatus.LOADING));
    dispatch(updateErrorStatus('sign_up', null));
    api.http_post("/sign-up.php", {
      first_name,
      last_name,
      address,
      password,
    }, (data) => {
      batch(() => {
        dispatch(updateLoadingStatus('sign_up', loadingStatus.SUCCESS));
        dispatch(updateMsgStatus('sign_up', "User created, please save your ID : " + data.id));
      });
    }, (error) => {
      dispatch(updateLoadingStatus('sign_up', loadingStatus.ERROR));
      dispatch(updateErrorStatus('sign_up', error.data.msg));
    });
  };
};

export const signOut = () => {
  return (dispatch, _) => {
    dispatch(updateUser(initState.id, initState.first_name, initState.last_name, initState.address, initState.bookseller));
  };
};

const initState = {
  id: -1,
  first_name: "",
  last_name: "",
  address: "",
  bookseller: false,
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        id: action.id,
        first_name: action.first_name,
        last_name: action.last_name,
        address: action.address,
        bookseller: action.bookseller,
      };
  }
  return state;
};