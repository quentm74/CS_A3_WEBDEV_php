import React, {useState} from "react";
import "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {Add, Clear} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import {signIn} from "../../redux/user";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";

export const ADD_BOOK_HEIGHT = "90px";
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(3),
    boxSizing: "border-box",
    height: ADD_BOOK_HEIGHT,
    backgroundColor: "#d0d0d0",
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
  const [price , setPrice] = useState(null);

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate onSubmit={(e) => {
        e.preventDefault();
        console.log("ok");
      }}>
        <Input
          margin="none"
          required
          name="title"
          id="title"
          size="small"
          placeholder="Title"
          autoFocus
          className={`${classes.input} ${classes.input_max_width}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          margin="none"
          required
          name="author"
          id="author"
          size="small"
          placeholder="Authors"
          className={`${classes.input} ${classes.input_max_width}`}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Input
          margin="none"
          required
          name="price"
          id="price"
          size="small"
          placeholder="Price"
          className={classes.input}
          value={price}
          onChange={(e) => {
            if (parseInt(e.target.value, 10) === e.target.value) { // if int
              setPrice(parseInt(e.target.value, 10));
            }
          }}
          endAdornment={<InputAdornment position="end">€</InputAdornment>}
        />
        <Button variant="contained" color="primary" className={classes.btn} onClick={() => {
          setTitle("");
          setAuthor("");
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