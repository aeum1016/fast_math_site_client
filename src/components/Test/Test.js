import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";

import { createAttempt } from "../../actions/attempts";

import useStyles from "../../styles/auth";

const Form = () => {
  const [attemptData, setAttemptData] = useState({
    email: "",
    operation: "",
    max: "",
    type: "",
    time: "",
    completed: "",
    incorrect: "",
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

  if (!user?.result?.name) {
    return (
      <Paper>
        <Typography variant="h6" align="center">
          Please Sign in to create your own memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">Creating an attempt</Typography>
        <TextField
          name="operation"
          variant="outlined"
          label="Operation"
          fullWidth
          value={attemptData.operation}
          onChange={(e) =>
            setAttemptData({ ...attemptData, operation: e.target.value })
          }
        />
        <TextField
          name="max"
          variant="outlined"
          label="Max"
          type="number"
          fullWidth
          value={attemptData.max}
          onChange={(e) =>
            setAttemptData({ ...attemptData, max: e.target.value })
          }
        />
        <TextField
          name="type"
          variant="outlined"
          label="Type"
          fullWidth
          value={attemptData.type}
          onChange={(e) =>
            setAttemptData({ ...attemptData, type: e.target.value })
          }
        />
        <TextField
          name="time"
          variant="outlined"
          label="Time"
          type="number"
          fullWidth
          value={attemptData.time}
          onChange={(e) =>
            setAttemptData({ ...attemptData, time: e.target.value })
          }
        />
        <TextField
          name="completed"
          variant="outlined"
          label="Completed"
          type="number"
          fullWidth
          value={attemptData.completed}
          onChange={(e) =>
            setAttemptData({ ...attemptData, completed: e.target.value })
          }
        />
        <TextField
          name="incorrect"
          variant="outlined"
          label="Incorrect"
          type="number"
          fullWidth
          value={attemptData.incorrect}
          onChange={(e) =>
            setAttemptData({ ...attemptData, incorrect: e.target.value })
          }
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
