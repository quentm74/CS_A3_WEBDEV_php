import React, {useEffect} from "react";
import "../../redux/store";
import {batch, useDispatch, useSelector} from "react-redux";
import TableContainer from "@material-ui/core/TableContainer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import {BookSellerTopBar, TOPBAR_HEIGHT} from "../BookSellerTopBar/BookSellerTopBar";
import {Assignment, Check, Clear, Delete, ListAlt, MenuBook, Person} from "@material-ui/icons";
import {loadAllCommands, selectCommand} from "../../redux/commands";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: `calc(100vh - ${TOPBAR_HEIGHT})`,
  },
  subcontainer: {
    maxHeight: "400px",
  },
  firstRow: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.main,
    "& th": {
      backgroundColor: "inherit",
      color: "inherit",
    },
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
  dialogTitleDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: "#676767",
    color: theme.palette.secondary.main,
    padding: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export const BookSellerListCommands = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const commands = useSelector(state => state.commands.commands);
  const selected_command = useSelector(state => state.commands.selectedCommand);

  useEffect(() => {
    dispatch(loadAllCommands());
  }, []);

  const maxNbOfDigits = (commands !== null && commands.length !== 0) ? commands[commands.length - 1]['id'].toString().length : 0;
  const displayId = (id) => {
    let display = '';
    for (let i = 0; i < maxNbOfDigits; i++) {
      display += '0';
    }
    display += id;
    return display.slice(-maxNbOfDigits);
  };

  const filtered_commands = commands.filter(command => command.id === selected_command);
  const command = filtered_commands.length === 0 ? null : filtered_commands[0];

  let price = null;
  if (command !== null) {
    price = 0;
    command.books.forEach(book => {
      price += book.price * book.quantity;
    });
  }

  return (
    <React.Fragment>
      {command && (
        <Dialog onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={open} maxWidth="lg">
          <DialogTitle classes={{root: classes.dialogTitle}} id="customized-dialog-title"
                       onClose={() => setOpen(false)}>
            <div className={classes.dialogTitleDiv}>
              <Assignment className={classes.icon}/>
              <Typography variant="h4">
                Command details
              </Typography>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant="h6">Date : <b>{command.date}</b></Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant="h6">Price : <b>{price.toFixed(2)} €</b></Typography>
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={12}>
                <div className={classes.title}><Person className={classes.icon}/><Typography
                  variant="h5">Client</Typography></div>
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant="h6">First Name : <b>{command.user.first_name}</b></Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant="h6">Last Name : <b>{command.user.last_name}</b></Typography>
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={10}>
                <Typography variant="h6">Address : <b>{command.user.address}</b></Typography>
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={12}>
                <div className={classes.title}><MenuBook className={classes.icon}/><Typography
                  variant="h5">Books</Typography></div>
              </Grid>
              <Grid item xs={12} sm={12}>
                {command.books && command.books.length !== 0 ? (
                  <TableContainer className={classes.subcontainer}>
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
                          <TableCell align="right">
                            Quantity
                          </TableCell>
                          <TableCell align="right"> </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {command.books.map(book => {
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
                                {book.quantity}
                              </TableCell>
                              <TableCell align="right"> </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography>
                    None
                  </Typography>
                )}
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      )}
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
                Date
              </TableCell>
              <TableCell align="center">
                Number of books
              </TableCell>
              <TableCell align="center">
                Validated
              </TableCell>
              <TableCell align="center">
                Actions
              </TableCell>
              <TableCell align="right"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commands && commands.map(command => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={command.id}>
                  <TableCell align="right"> </TableCell>
                  <TableCell align="left">
                    {displayId(command.id)}
                  </TableCell>
                  <TableCell align="left">
                    {command.user.first_name}
                  </TableCell>
                  <TableCell align="left">
                    {command.user.last_name}
                  </TableCell>
                  <TableCell align="right">
                    {command.date}
                  </TableCell>
                  <TableCell align="center">
                    {command.books.length}
                  </TableCell>
                  <TableCell align="center">
                    {command.validated === 0 ? (
                      <Clear/>
                    ) : (
                      <Check/>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => {
                      dispatch(selectCommand(command.id));
                      setOpen(true);
                    }}>
                      <ListAlt/>
                    </IconButton>
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
