import * as api from "../utils/api";
import {loadingStatus} from "../utils/consts";
import {batch} from "react-redux";
import {updateErrorStatus, updateLoadingStatus, updateMsgStatus} from "./status";
import {setQuantities} from "./cart";

const prefix = "USERS:";

const UPDATE_USERS = prefix + 'UPDATE_USERS';
const updateUsers = (users) => ({
  type: UPDATE_USERS,
  users: users,
});

export const loadAllUsers = () => {
  return (dispatch, _) => {
    dispatch(updateLoadingStatus('load_users', loadingStatus.LOADING));
    dispatch(updateErrorStatus('load_users', null));
    api.http_get("/users.php", (data) => {
      batch(() => {
        dispatch(updateLoadingStatus('load_users', loadingStatus.SUCCESS));
        dispatch(updateUsers(data.users));
      });
    }, (error) => {
      dispatch(updateLoadingStatus('load_users', loadingStatus.ERROR));
      dispatch(updateErrorStatus('load_users', error.data.msg));
    });
  };
};

const initState = {
  users: [],
};

export const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_USERS:
      return {
        ...state,
        users: action.users,
      };
  }
  return state;
};