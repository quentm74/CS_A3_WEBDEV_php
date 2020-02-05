import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {signOut} from "../../redux/user";
import {useDispatch, useSelector} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import {Assignment, MenuBook} from "@material-ui/icons";
import {history} from "../../utils/history";

export const TOPBAR_HEIGHT = "64px";
const useStyles = makeStyles(theme => ({
  bar: {
    height: TOPBAR_HEIGHT,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    color: theme.palette.secondary.main,
  },
  title: {
    cursor: "pointer",
    color: theme.palette.secondary.main,
  },
  commands: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    marginRight: theme.spacing(2),
  },
  name: {
    marginRight: theme.spacing(2),
  },
  spacing: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export const ClientTopBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const first_name = useSelector(state => state.user.first_name);
  const last_name = useSelector(state => state.user.last_name);

  return (
    <AppBar position="static" className={classes.bar}>
      <Toolbar>
        <IconButton onClick={() => history.push("/")} edge="start" className={classes.menuButton} color="inherit"
                    aria-label="menu">
          <MenuBook fontSize="large"/>
        </IconButton>
        <div className={classes.spacing}></div>
        <Typography variant="h6" className={classes.name}>{first_name + " " + last_name}</Typography>
        <Button className={classes.commands} variant="contained" onClick={() => {
        }}>
          <Assignment className={classes.icon}/> Past Commands
        </Button>
        <Button variant="contained" color="secondary" onClick={() => dispatch(signOut())}>
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
};