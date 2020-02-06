import React, {useEffect} from "react";
import "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {deleteBook, loadAllBooks} from "../../redux/books";
import TableContainer from "@material-ui/core/TableContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {BookSellerTopBar, TOPBAR_HEIGHT} from "../BookSellerTopBar/BookSellerTopBar";
import IconButton from "@material-ui/core/IconButton";
import {Clear, Delete, HowToReg} from "@material-ui/icons";
import {loadAllUsers} from "../../redux/users";

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: `calc(100vh - ${TOPBAR_HEIGHT})`,
  },
  firstRow: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
    "& th": {
      backgroundColor: "inherit",
      color: "inherit",
    },
  },
}));

export const BookSellerListUsers = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const users = useSelector(state => state.users.users);

  useEffect(() => {
    dispatch(loadAllUsers());
  }, []);

  const maxNbOfDigits = (users !== null && users.length !== 0) ? users[users.length - 1]['id'].toString().length : 0;
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
      <BookSellerTopBar/>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className={classes.firstRow}>
              <TableCell align="right"> </TableCell>
              <TableCell align="left">
                ID
              </TableCell>
              <TableCell align="left">
                First name
              </TableCell>
              <TableCell align="left">
                Last name
              </TableCell>
              <TableCell align="right">
                Address
              </TableCell>
              <TableCell align="center">
                Bookseller
              </TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map(user => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                  <TableCell align="right"> </TableCell>
                  <TableCell align="left">
                    {displayId(user.id)}
                  </TableCell>
                  <TableCell align="left">
                    {user.first_name}
                  </TableCell>
                  <TableCell align="left">
                    {user.last_name}
                  </TableCell>
                  <TableCell align="right">
                    {user.address}
                  </TableCell>
                  <TableCell align="center">
                    {user.bookseller === 0 ? (
                      <Clear/>
                    ) : (
                      <HowToReg/>
                    )}
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
