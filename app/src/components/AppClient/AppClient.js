import React from "react";
import "../../redux/store";
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {TopBar} from "./TopBar";

export const AppClient = () => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <TopBar/>
      <Container>
        <Typography variant="h1">Welcome again !</Typography>
      </Container>
    </React.Fragment>
  );
};