import React, { useState, useEffect } from "react";
import { Typography, Grid, IconButton, Box } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { useSelector, useDispatch } from "react-redux";

import Question from "../Question";
import { getRandomInt, getOperation } from "./Helper";
import { createAttempt } from "../../../actions/attempts";

import useStyles from "../../../styles/game";

const Game = ({
  testOperation,
  maxValue,
  testType,
  testCondition,
  setStats,
  toSettings,
  toAttempt,
}) => {
  const classes = useStyles();

  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

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
    max: parseInt(max),
    type: endType,
    time: 0,
    completed: 0,
    incorrect: 0,
  });

  const [curAttemptData, setCurAttemptData] = useState({
    pace: 0,
    highScore: 0,
  });

  const rows = [];

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

  const handleSubmit = async () => {
    dispatch(
      createAttempt({
        ...attemptData,
        username: user?.result?.username ? user.result.username : "Guest",
        email: user?.result?.email ? user.result.email : "Guest",
        time:
          attemptData.type === "time"
            ? Math.floor(attemptData.time)
            : attemptData.time,
        completed: questions.currentQuestion,
        incorrect: 0,
      })
    );
    setStats({
      time: attemptData.time,
      completed: questions.currentQuestion,
      incorrect: 0,
    });
    toAttempt();
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

  const handleNextQuestion = () => {
    if (
      endCondition - questions.currentQuestion >= 5 ||
      attemptData.type === "time"
    ) {
      setQuestions({
        ...questions,
        currentQuestion: questions.currentQuestion + 1,
        questionFirst: [
          ...questions.questionFirst,
          getRandomInt(attemptData.max),
        ],
        questionSecond: [
          ...questions.questionSecond,
          getRandomInt(attemptData.max),
        ],
        questionOperation: [
          ...questions.questionOperation,
          getOperation(attemptData.operation),
        ],
      });
    } else {
      setQuestions({
        ...questions,
        currentQuestion: questions.currentQuestion + 1,
      });
    }
  };

  const handleIncorrect = () => {
    setAttemptData({
      ...attemptData,
      incorrect: attemptData.incorrect + 1,
    });
  };

  useEffect(() => {
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
  }, [setStats]);

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
        setCurAttemptData({
          ...curAttemptData,
          pace: (questions.currentQuestion * 1000 * 60) / attemptData.time,
        });
      }
    }, 10);
    return () => {
      clearInterval(updateTime);
    };
  }, [attemptData, timeData]);

  useEffect(() => {
    if (attemptData.type === "correct") {
      if (questions.currentQuestion === endCondition) {
        handleSubmit();
      }
    } else if (attemptData.type === "time") {
      if (attemptData.time >= endCondition * 1000) {
        handleSubmit();
      }
    }
  }, [handleNextQuestion]);

  const userAttempts = useSelector((state) => state.user);

  useEffect(() => {
    if (userAttempts.length) {
      userAttempts.map((userAttempt) => {
        if (
          userAttempt.type === attemptData.type &&
          userAttempt.operation === attemptData.operation &&
          userAttempt.max === attemptData.max &&
          (attemptData.type === "time"
            ? true
            : userAttempt.completed === endCondition)
        ) {
          rows.push((userAttempt.completed * 1000 * 60) / userAttempt.time);
        }
      });
      rows.sort((a, b) => b - a);
      setCurAttemptData({
        ...curAttemptData,
        highScore: rows[0],
      });
    }
  }, [userAttempts]);

  return (
    <>
      <div align="center">
        <IconButton
          aria-label="settings"
          onClick={toSettings}
          className={classes.grey}
          align="center"
        >
          <SettingsOutlinedIcon className={classes.grey} />
        </IconButton>
      </div>
      <span>
        <Typography variant="h4" className={classes.grey}>
          Questions:{" "}
          {attemptData.type === "correct"
            ? endCondition - questions.currentQuestion
            : questions.currentQuestion}
        </Typography>
        <Typography variant="h4" className={classes.grey}>
          Time:{" "}
          {attemptData.type === "time"
            ? endCondition - Math.floor(attemptData.time / 1000)
            : attemptData.time / 1000}
        </Typography>
        <Typography
          variant="h4"
          className={
            curAttemptData.pace < curAttemptData.highScore
              ? classes.grey
              : classes.red
          }
        >
          QPM: {curAttemptData.pace.toFixed(2)}
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
    </>
  );
};

export default Game;
