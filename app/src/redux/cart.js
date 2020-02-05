import * as api from "../utils/api";
import {loadingStatus} from "../utils/consts";
import {batch} from "react-redux";
import {updateErrorStatus, updateLoadingStatus, updateMsgStatus} from "./status";

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

const initState = {
  ids: [],
};

export const cartReducer = (state = initState, action) => {
  const ids = JSON.parse(JSON.stringify(state.ids));
  switch (action.type) {
    case ADD_BOOK:
      ids.push(action.id);
      return {
        ...state,
        ids: ids,
      };
    case REMOVE_BOOK:
      const index_element_to_remove_if_exist = ids.indexOf(action.id);
      if (index_element_to_remove_if_exist > -1) {
        ids.splice(index_element_to_remove_if_exist, 1);
      }
      return {
        ...state,
        ids: ids,
      };
    case CANCEL:
      return {
        ...state,
        ids: [],
      };
  }
  return state;
};