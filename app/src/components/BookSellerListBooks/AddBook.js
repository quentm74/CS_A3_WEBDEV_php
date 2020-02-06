import React, {useState} from "react";
import "../../redux/store";
import {useDispatch} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {Add, Clear} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import {saveBook} from "../../redux/books";

export const ADD_BOOK_HEIGHT = "90px";
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(3),
    boxSizing: "border-box",
    height: ADD_BOOK_HEIGHT,
    backgroundColor: "#eee",
  },
  form: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  input: {
    "& > div > input": {
      paddingTop: "13px !important",
    },
    marginRight: theme.spacing(2),
  },
  input_max_width: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#646464',
    marginRight: theme.spacing(2),
  },
}));

export const AddBook = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price , setPrice] = useState("");

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate onSubmit={(e) => {
        e.preventDefault();
        dispatch(saveBook(title, author, price));
      }}>
        <Input
          margin="none"
          required
          name="title"
          id="title"
          size="small"
          autoFocus
          className={`${classes.input} ${classes.input_max_width}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          startAdornment={<InputAdornment position="start">Title : </InputAdornment>}
        />
        <Input
          margin="none"
          required
          name="author"
          id="author"
          size="small"
          className={`${classes.input} ${classes.input_max_width}`}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          startAdornment={<InputAdornment position="start">Authors : </InputAdornment>}
        />
        <Input
          margin="none"
          required
          name="price"
          id="price"
          size="small"
          className={classes.input}
          value={price}
          onChange={(e) => {
            if (parseInt(e.target.value) == e.target.value) { // if int
              setPrice(parseInt(e.target.value));
            }
          }}
          startAdornment={<InputAdornment position="start">Price : </InputAdornment>}
          endAdornment={<InputAdornment position="end">€</InputAdornment>}
        />
        <Button variant="contained" color="primary" className={classes.btn} onClick={() => {
          setTitle("");
          setAuthor("");
          setPrice("");
        }}>
          <Clear className={classes.icon}/>
          Clear
        </Button>
        <Button variant="contained" color="secondary" type="submit">
          <Add className={classes.icon}/>
          Add
        </Button>
      </form>
    </div>
  );
};