import React, { useState, useEffect } from "react";
import { Typography, Grid, TextField } from "@mui/material";

import { useDispatch } from "react-redux";

import Question from "../Question";
import { getRandomInt, getOperation } from "./Helper";
import { createAttempt, getUserAttempts } from "../../../actions/attempts";

import useStyles from "../../../styles/game";

const Game = ({ testOperation, maxValue, testType, testCondition }) => {
  const classes = useStyles();

  const max = maxValue;
  const operation = testOperation;
  const endType = testType;
  const endCondition = testCondition;
  const [timeData, setTimeData] = useState({
    startTime: 0,
    curTime: 0,
  });

  const [attemptData, setAttemptData] = useState({
    email: "",
    operation: operation,
    max: max,
    type: endType,
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

  const handleSubmit = async () => {
    dispatch(createAttempt({ ...attemptData, email: user?.result?.email }));
    clear();
  };

  const handleChange = () => {
    if (attemptData.time === 0) {
      const sTime = new Date().getTime();
      const cTime = sTime + 10;
      setTimeData({
        startTime: sTime,
        curTime: cTime,
      });
    }
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
      completed: attemptData.completed + 1,
    });
  };

  const handleIncorrect = () => {
    setAttemptData({
      ...attemptData,
      incorrect: attemptData.incorrect + 1,
    });
  };

  const clear = () => {
    setAttemptData({
      ...attemptData,
      email: "",
      time: 0,
      completed: 0,
      incorrect: 0,
    });
    setTimeData({
      startTime: 0,
      curTime: 0,
    });
  };

  useEffect(() => {
    const updateTime = setInterval(() => {
      if (timeData.startTime !== 0) {
        setTimeData({
          ...timeData,
          curTime: new Date().getTime(),
        });
        setAttemptData({
          ...attemptData,
          time: timeData.curTime - timeData.startTime,
        });
      }
    }, 10);
    return () => {
      clearInterval(updateTime);
    };
  }, [attemptData, timeData]);

  useEffect(() => {
    if (attemptData.type === "correct") {
      if (attemptData.completed === endCondition) {
        handleSubmit();
      }
    } else if (attemptData.type === "time") {
      if (attemptData.time >= endCondition * 1000) {
        handleSubmit();
      }
    }
  }, [attemptData]);

  useEffect(() => {
    dispatch(getUserAttempts(user?.result?.email));
  }, [setTimeData]);

  return (
    <span>
      <Typography variant="h2" className={classes.grey}>
        {attemptData.completed}{" "}
        {attemptData.type === "time"
          ? endCondition - Math.floor(attemptData.time / 1000)
          : attemptData.time / 1000}
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
            handleChange={handleChange}
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
