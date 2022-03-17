import React, { useState } from "react";
import { Typography, Card } from "@mui/material";

import { useDispatch } from "react-redux";

import Input from "./Input";
import { getAnswer } from "./Game/Helper";
import useStyles from "../../styles/game";

const Question = ({
  First,
  Second,
  Operation,
  qClass,
  handleCorrect,
  handleIncorrect,
}) => {
  const classes = useStyles();

  const [questionData, setQuestionData] = useState({
    answer: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    if (
      String(
        getAnswer(Operation === "/" ? First * Second : First, Second, Operation)
      ) === questionData.answer
    ) {
      handleCorrect(questionData);
      clear();
    } else {
      handleIncorrect(questionData);
    }
  };

  const clear = () => {
    setQuestionData({
      answer: "",
    });
  };

  return (
    <Card className={qClass} elevation={0}>
      <div>
        <Typography className={qClass} variant="h6" align="center">
          {Operation === "/" ? First * Second : First} {Operation} {Second}
        </Typography>
      </div>
      <div align="center">
        {qClass === classes.center ? (
          <Input
            name="answer"
            label="Answer"
            inputValue={questionData.answer}
            handleChange={handleChange}
            onKeyPress={handleKeypress}
            autoFocus={true}
          />
        ) : null}
      </div>
    </Card>
  );
};

export default Question;
