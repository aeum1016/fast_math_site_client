import React, { useState, useEffect } from "react";
import { Typography, Grid, TextField } from "@mui/material";

import { useDispatch } from "react-redux";

import Question from "../Question";
import { getRandomInt, getOperation } from "./Helper";
import { createAttempt, getAttempts } from "../../../actions/attempts";

import useStyles from "../../../styles/game";

const Game = ({ curQuestion, testOperation, maxValue, testType }) => {
  const classes = useStyles();

  const max = maxValue;
  const operation = testOperation;

  const [attemptData, setAttemptData] = useState({
    email: "",
    operation: operation,
    max: max,
    type: testType,
    time: 0,
    completed: 0,
    incorrect: 0,
  });

  const [questions, setQuestions] = useState({
    currentQuestion: 0,
    questionFirst: [
      getRandomInt(attemptData.max),
      getRandomInt(attemptData.max),
      getRandomInt(attemptData.max),
      getRandomInt(attemptData.max),
    ],
    questionSecond: [
      getRandomInt(attemptData.max),
      getRandomInt(attemptData.max),
      getRandomInt(attemptData.max),
      getRandomInt(attemptData.max),
    ],
    questionOperation: [
      getOperation(attemptData.operation),
      getOperation(attemptData.operation),
      getOperation(attemptData.operation),
      getOperation(attemptData.operation),
    ],
  });

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createAttempt({ ...attemptData, email: user?.result?.email }));
    clear();
  };

  const handleNextQuestion = (e) => {
    setQuestions({
      ...questions,
      currentQuestion: questions.currentQuestion + 1,
    });
    questions.questionFirst.push(getRandomInt(attemptData.max));
    questions.questionSecond.push(getRandomInt(attemptData.max));
    questions.questionOperation.push(getOperation(attemptData.operation));
    setAttemptData({
      ...attemptData,
      incorrect:
        attemptData.incorrect +
        (isNaN(parseInt(e.incorrect)) ? 0 : parseInt(e.incorrect)),
      completed: attemptData.completed + 1,
    });
  };

  const handleIncorrect = (e) => {
    setAttemptData({
      ...attemptData,
      incorrect: attemptData.incorrect + 1,
    });
  };

  useEffect(() => {
    dispatch(getAttempts());
  }, [questions]);

  const clear = () => {
    setAttemptData({
      email: "",
      time: 0,
      completed: 0,
      incorrect: 0,
    });
  };

  return (
    <span>
      <Typography variant="h2">
        {attemptData.completed} {attemptData.incorrect}
      </Typography>
      <Grid container className={classes.grid} columns={20}>
        <Grid item xs={2} sm={2}>
          {questions.currentQuestion >= 2 ? (
            <Question
              First={questions.questionFirst[questions.currentQuestion - 2]}
              Second={questions.questionSecond[questions.currentQuestion - 2]}
              Operation={
                questions.questionOperation[questions.currentQuestion - 2]
              }
              qClass={classes.outside}
            />
          ) : null}
        </Grid>
        <Grid item xs={4} sm={4}>
          {questions.currentQuestion >= 1 ? (
            <Question
              First={questions.questionFirst[questions.currentQuestion - 1]}
              Second={questions.questionSecond[questions.currentQuestion - 1]}
              Operation={
                questions.questionOperation[questions.currentQuestion - 1]
              }
              qClass={classes.inside}
            />
          ) : null}
        </Grid>
        <Grid item xs={6} sm={6}>
          <Question
            First={questions.questionFirst[questions.currentQuestion]}
            Second={questions.questionSecond[questions.currentQuestion]}
            Operation={questions.questionOperation[questions.currentQuestion]}
            qClass={classes.center}
            handleCorrect={handleNextQuestion}
            handleIncorrect={handleIncorrect}
          />
        </Grid>
        <Grid item xs={4} sm={4}>
          <Question
            First={questions.questionFirst[questions.currentQuestion + 1]}
            Second={questions.questionSecond[questions.currentQuestion + 1]}
            Operation={
              questions.questionOperation[questions.currentQuestion + 1]
            }
            qClass={classes.inside}
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <Question
            First={questions.questionFirst[questions.currentQuestion + 2]}
            Second={questions.questionSecond[questions.currentQuestion + 2]}
            Operation={
              questions.questionOperation[questions.currentQuestion + 2]
            }
            qClass={classes.outside}
          />
        </Grid>
      </Grid>
    </span>
  );
};

export default Game;
