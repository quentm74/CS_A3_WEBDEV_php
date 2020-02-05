import * as api from "../utils/api";
import {loadingStatus} from "../utils/consts";
import {batch} from "react-redux";
import {updateErrorStatus, updateLoadingStatus, updateMsgStatus} from "./status";
import {setQuantities} from "./cart";

const prefix = "BOOKS:";

const UPDATE_BOOKS = prefix + 'UPDATE_BOOKS';
const updateBooks = (books) => ({
  type: UPDATE_BOOKS,
  books: books,
});

export const loadBooks = () => {
  return (dispatch, getState) => {
    dispatch(updateLoadingStatus('load_books', loadingStatus.LOADING));
    dispatch(updateErrorStatus('load_books', null));
    api.get("/books.php?userid=" + getState().user.id, (data) => {
      batch(() => {
        dispatch(updateLoadingStatus('load_books', loadingStatus.SUCCESS));

        let ids = [];
        const books = data.books.map(book => {
          for (let i = 0; i < book.quantity; i++) {
            ids.push(book.id);
          }
          return {
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
          }
        });

        dispatch(updateBooks(books));
        dispatch(setQuantities(ids));
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