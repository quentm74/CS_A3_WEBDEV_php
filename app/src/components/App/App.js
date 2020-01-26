import React from "react";
import "../../redux/store";
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import {signOut} from "../../redux/user";
import Typography from "@material-ui/core/Typography";

export const App = () => {
  const dispatch = useDispatch();

  const first_name = useSelector(state => state.user.first_name);
  const last_name = useSelector(state => state.user.last_name);

  return (
    <Container>
      <Typography variant="h1">Welcome {first_name + " " + last_name}</Typography>
      <Button onClick={() => dispatch(signOut())}>Sign out</Button>
    </Container>
  );
};