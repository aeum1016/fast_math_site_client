import React, { useState } from "react";
import { Typography, Grid, TextField } from "@mui/material";

import { useDispatch } from "react-redux";

import Question from "./Question";
import { createAttempt } from "../../actions/attempts";

import useStyles from "../../styles/home";

const Home = () => {
  const classes = useStyles();

  const [attemptData, setAttemptData] = useState({
    email: "",
    operation: "",
    max: "",
    type: "",
    time: 0,
    completed: 0,
    incorrect: 0,
  });

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createAttempt({ ...attemptData, email: user?.result?.email }));
    clear();
  };

  const clear = () => {
    setAttemptData({
      email: "",
      operation: "",
      max: "",
      type: "",
      time: "",
      completed: "",
      incorrect: "",
    });
  };

  return (
    <Grid container className={classes.grid} columns={20}>
      <Grid item xs={2} sm={2}>
        <Question
          First={"12"}
          Second={"12"}
          Operand={"x"}
          qClass={classes.outside}
        />
      </Grid>
      <Grid item xs={4} sm={4}>
        <Question
          First={"12"}
          Second={"12"}
          Operand={"x"}
          qClass={classes.inside}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <Question
          First={"37"}
          Second={"28"}
          Operand={"+"}
          qClass={classes.center}
        />
      </Grid>
      <Grid item xs={4} sm={4}>
        <Question
          First={"12"}
          Second={"12"}
          Operand={"x"}
          qClass={classes.inside}
        />
      </Grid>
      <Grid item xs={2} sm={2}>
        <Question
          First={"12"}
          Second={"12"}
          Answer={"12312"}
          Operand={"x"}
          qClass={classes.outside}
        />
      </Grid>
    </Grid>
  );
};

export default Home;
