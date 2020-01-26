import * as api from "../utils/api";
import {loadingStatus} from "../utils/consts";

const prefix = "USER:";

const UPDATE_LOADING_STATUS = prefix + "UPDATE_LOADING_STATUS";
const updateLoadingStatus = (status) => ({
  type: UPDATE_LOADING_STATUS,
  status: status,
});

export const signIn = (id, password) => {
  return (dispatch, getState) => {
    dispatch(updateLoadingStatus(loadingStatus.LOADING));
    api.post("/signIn", {
      id,
      password,
    }, () => {
      dispatch(updateLoadingStatus(loadingStatus.SUCCESS));
    }, () => {
      dispatch(updateLoadingStatus(loadingStatus.ERROR));
    });
  };
};

export const userReducer = (state = {
  id: -1,
  first_name: "",
  last_name: "",
  address: "",
  bookseller: false,
  loading: loadingStatus.NOT_STARTED,
}, action) => {
  switch (action.type) {
    case UPDATE_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };
  }
  return state;
};