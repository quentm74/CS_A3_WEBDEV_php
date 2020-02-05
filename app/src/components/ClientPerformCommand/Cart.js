import React, {useEffect} from "react";
import "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {cancel, save, valid} from "../../redux/cart";
import {Check, Clear, CreditCard, Save} from "@material-ui/icons";

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
    justifyContent: "flex-end",
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
  button: {
    marginRight: theme.spacing(1),
    backgroundColor: '#646464',
    color: theme.palette.primary.contrastText,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const books = useSelector(state => state.books.books);
  const cart_ids = useSelector(state => state.cart.ids);
  const changed = useSelector(state => state.cart.changed);

  let total = 0;
  books.map(book => {
    let occurrences = 0;
    for (let i = 0; i < cart_ids.length; ++i) {
      if (cart_ids[i] === book.id)
        occurrences++;
    }
    total += book.price * occurrences;
  });

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.price}>
        {total.toFixed(2)} €
      </Typography>
      <Button className={classes.button} variant="contained" color="default" onClick={() => dispatch(cancel())}>
        <Clear className={classes.icon}/>
        Reset
      </Button>
      <Button className={classes.button} variant="contained" color="default" onClick={() => dispatch(save())}>
        {changed ? (
          <React.Fragment>
            <Save className={classes.icon}/>
            Save
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Check className={classes.icon}/>
            Saved
          </React.Fragment>
        )}
      </Button>
      <Button variant="contained" color="secondary" onClick={() => dispatch(valid())}>
        <CreditCard className={classes.icon}/>
        Valid command
      </Button>
    </div>
  );
};