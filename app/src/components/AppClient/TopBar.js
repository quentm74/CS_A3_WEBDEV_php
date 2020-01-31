import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {signOut} from "../../redux/user";
import {useDispatch, useSelector} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import {MenuBook} from "@material-ui/icons";
import {history} from "../../utils/history";

const useStyles = makeStyles(theme => ({
  bar: {
    height: 64,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
  name: {
    marginRight: theme.spacing(2),
  },
}));

export const TopBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const first_name = useSelector(state => state.user.first_name);
  const last_name = useSelector(state => state.user.last_name);

  return (
    <AppBar position="static" className={classes.bar}>
      <Toolbar>
        <IconButton onClick={() => history.push("/")} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuBook fontSize="large"/>
        </IconButton>
        <Typography variant="h4" className={classes.title} onClick={() => history.push("/")}>Book shop</Typography>
        <Typography variant="h6" className={classes.name}>{first_name + " " + last_name}</Typography>
        <Button variant="contained" color="secondary" onClick={() => dispatch(signOut())}>Sign out</Button>
      </Toolbar>
    </AppBar>
  );
};