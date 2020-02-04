import React, {useEffect} from "react";
import "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export const CART_HEIGHT = "70px";
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(3),
    boxSizing: "border-box",
    position: "absolute",
    bottom: 0,
    height: CART_HEIGHT,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
    color: "white",
  },
  price: {
    color: "white",
    marginRight: theme.spacing(3),
  },
}));

export const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const books = useSelector(state => state.books.books);

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Panier
      </Typography>
      <Typography variant="h5" className={classes.price}>
        34,00 €
      </Typography>
      <Button variant="contained" color="secondary">
        Command
      </Button>
    </div>
  );
};