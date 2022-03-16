import React, { useState } from "react";
import { Typography, Card } from "@mui/material";

import { useDispatch } from "react-redux";

import Input from "./Input";
import useStyles from "../../styles/home";

const Question = ({ First, Second, Operand, qClass }) => {
  const classes = useStyles();

  const [questionData, setQuestionData] = useState({
    answer: "",
    incorrect: 0,
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

  const handleSubmit = async (e) => {
    clear();
  };

  const clear = () => {
    setQuestionData({
      answer: "",
      incorrect: 0,
    });
  };

  return (
    <Card className={qClass} elevation={0}>
      <div>
        <Typography className={qClass} variant="h6" align="center">
          {First} {Operand} {Second}
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
