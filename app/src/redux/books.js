import * as api from "../utils/api";
import {loadingStatus} from "../utils/consts";
import {batch} from "react-redux";
import {updateErrorStatus, updateLoadingStatus, updateMsgStatus} from "./status";

const prefix = "BOOKS:";

const UPDATE_BOOKS = prefix + 'UPDATE_BOOKS';
const updateBooks = (books) => ({
  type: UPDATE_BOOKS,
  books: books,
});

export const loadBooks = () => {
  return (dispatch, _) => {
    dispatch(updateLoadingStatus('load_books', loadingStatus.LOADING));
    dispatch(updateErrorStatus('load_books', null));
    api.get("/books.php", (data) => {
      batch(() => {
        dispatch(updateLoadingStatus('load_books', loadingStatus.SUCCESS));
        dispatch(updateBooks(data.books));
      });
    }, (error) => {
      dispatch(updateLoadingStatus('load_books', loadingStatus.ERROR));
      dispatch(updateErrorStatus('load_books', error.data.msg));
    });
  };
};

const initState = {
  books: [],
};

export const booksReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_BOOKS:
      return {
        ...state,
        books: action.books,
      };
  }
  return state;
};