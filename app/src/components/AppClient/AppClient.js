import React, {useEffect} from "react";
import "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {TopBar, TOPBAR_HEIGHT} from "./TopBar";
import {loadBooks} from "../../redux/books";
import TableContainer from "@material-ui/core/TableContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {Cart, CART_HEIGHT} from "./Cart";
import IconButton from "@material-ui/core/IconButton";
import {Add, Remove} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import {addBook, removeBook} from "../../redux/cart";

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: `calc(100vh - ${TOPBAR_HEIGHT} - ${CART_HEIGHT})`,
  },
  firstRow: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
    "& th": {
      backgroundColor: "inherit",
      color: "inherit",
    },
  },
  quantity: {
    display: "flex",
    justifyContent: "center",
  },
  number: {
    padding: theme.spacing(2),
  },
}));

export const AppClient = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const books = useSelector(state => state.books.books);
  const cart_ids = useSelector(state => state.cart.ids);

  console.log("cart_ids", cart_ids.length);

  useEffect(() => {
    dispatch(loadBooks());
  }, []);

  console.log("books", books);
  const maxNbOfDigits = (books !== null && books.length !== 0) ? books[books.length - 1]['id'].toString().length : 0;
  const displayId = (id) => {
    let display = '';
    for (let i = 0; i < maxNbOfDigits; i++) {
      display += '0';
    }
    display += id;
    return display.slice(-maxNbOfDigits);
  };

  return (
    <React.Fragment>
      <TopBar/>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className={classes.firstRow}>
              <TableCell align="right"> </TableCell>
              <TableCell align="left">
                ID
              </TableCell>
              <TableCell align="left">
                Title
              </TableCell>
              <TableCell align="left">
                Author
              </TableCell>
              <TableCell align="right">
                Price
              </TableCell>
              <TableCell align="center">
                Quantity
              </TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books && books.map(book => {
              let count = 0;
              for (let i = 0; i < cart_ids.length; ++i) {
                if (cart_ids[i] === book.id)
                  count++;
              }
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={book.id}>
                  <TableCell align="right"> </TableCell>
                  <TableCell align="left">
                    {displayId(book.id)}
                  </TableCell>
                  <TableCell align="left">
                    {book.title}
                  </TableCell>
                  <TableCell align="left">
                    {book.author}
                  </TableCell>
                  <TableCell align="right">
                    {book.price.toFixed(2)} €
                  </TableCell>
                  <TableCell align="right">
                    <div className={classes.quantity}>
                      <IconButton color="primary" onClick={() => dispatch(removeBook(book.id))}>
                        <Remove/>
                      </IconButton>
                      <Typography variant="body1" color="primary" className={classes.number}>
                        {count}
                      </Typography>
                      <IconButton color="primary" onClick={() => dispatch(addBook(book.id))}>
                        <Add/>
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell align="right"> </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Cart/>
    </React.Fragment>
  );
};
