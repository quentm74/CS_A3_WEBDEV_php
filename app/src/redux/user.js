import * as api from "../utils/api";
import {loadingStatus} from "../utils/consts";
import {batch} from "react-redux";

const prefix = "USER:";

const UPDATE_LOADING_STATUS = prefix + "UPDATE_LOADING_STATUS";
const updateLoadingStatus = (status) => ({
  type: UPDATE_LOADING_STATUS,
  status: status,
});

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
    dispatch(updateLoadingStatus(loadingStatus.LOADING));
    api.post("/sign-in.php", {
      id,
      password,
    }, (data) => {
      batch(() => {
        dispatch(updateLoadingStatus(loadingStatus.SUCCESS));
        dispatch(updateUser(data.id, data.first_name, data.last_name, data.address, data.bookseller));
      });
    }, () => {
      dispatch(updateLoadingStatus(loadingStatus.ERROR));
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
  loading: loadingStatus.NOT_STARTED,
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
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