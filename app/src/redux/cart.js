import * as api from "../utils/api";
import {loadingStatus} from "../utils/consts";
import {batch} from "react-redux";
import {updateErrorStatus, updateLoadingStatus, updateMsgStatus} from "./status";
import {get} from "../utils/api";

const prefix = "CART:";

const ADD_BOOK = prefix + 'ADD_BOOK';
export const addBook = (id) => ({
  type: ADD_BOOK,
  id: id,
});

const REMOVE_BOOK = prefix + 'REMOVE_BOOK';
export const removeBook = (id) => ({
  type: REMOVE_BOOK,
  id: id,
});

const CANCEL = prefix + 'CANCEL';
export const cancel = () => ({
  type: CANCEL,
});

const SET_QUANTITIES = prefix + 'SET_QUANTITIES';
export const setQuantities = (ids) => ({
  type: SET_QUANTITIES,
  ids: ids,
});

const SAVED = prefix + 'SAVED';
export const saved = () => ({
  type: SAVED,
});

export const save = () => {
  return (dispatch, getState) => {
    dispatch(updateLoadingStatus('save_command', loadingStatus.LOADING));
    dispatch(updateErrorStatus('save_command', null));
    api.post("/commands.php", {
      userid: getState().user.id,
      booksids: getState().cart.ids,
      valid: false,
    }, () => {
      dispatch(updateLoadingStatus('save_command', loadingStatus.SUCCESS));
      dispatch(saved());
    }, (error) => {
      dispatch(updateLoadingStatus('save_command', loadingStatus.ERROR));
      dispatch(updateErrorStatus('save_command', error.data.msg));
    });
  };
};

export const valid = () => {
  return (dispatch, getState) => {
    dispatch(updateLoadingStatus('save_command', loadingStatus.LOADING));
    dispatch(updateErrorStatus('save_command', null));
    api.post("/commands.php", {
      userid: getState().user.id,
      booksids: getState().cart.ids,
      valid: true,
    }, () => {
      dispatch(updateLoadingStatus('save_command', loadingStatus.SUCCESS));
      dispatch(saved());
      dispatch(cancel());
    }, (error) => {
      dispatch(updateLoadingStatus('save_command', loadingStatus.ERROR));
      dispatch(updateErrorStatus('save_command', error.data.msg));
    });
  };
};

const initState = {
  ids: [],
  changed: true,
};

export const cartReducer = (state = initState, action) => {
  const ids = JSON.parse(JSON.stringify(state.ids));
  switch (action.type) {
    case ADD_BOOK:
      ids.push(action.id);
      return {
        ...state,
        changed: true,
        ids: ids,
      };
    case REMOVE_BOOK:
      const index_element_to_remove_if_exist = ids.indexOf(action.id);
      if (index_element_to_remove_if_exist > -1) {
        ids.splice(index_element_to_remove_if_exist, 1);
      }
      return {
        ...state,
        changed: true,
        ids: ids,
      };
    case CANCEL:
      return {
        ...state,
        changed: true,
        ids: [],
      };
    case SET_QUANTITIES:
      return {
        ...state,
        ids: action.ids,
      };
    case SAVED:
      return {
        ...state,
        changed: false,
      };
  }
  return state;
};