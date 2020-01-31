import React, {useEffect} from "react";
import "../../redux/store";
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {TopBar} from "./TopBar";
import {loadBooks} from "../../redux/books";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: 'calc(100vh - 64px)',
  },
  firstRow: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    "& th": {
      backgroundColor: "inherit",
      color: "inherit",
    },
  },
}));

export const AppClient = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const books = useSelector(state => state.books.books);

  useEffect(() => {
    dispatch(loadBooks());
  }, []);

  const maxNbOfDigits = books !== null ? books[books.length - 1]['id'].toString().length : 0;
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
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books && books.map(book => {
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
                  <TableCell align="right"> </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};