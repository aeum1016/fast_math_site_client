import React, { useEffect } from "react";
import { Paper, Typography, Box } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import StatCard from "./StatCard";
import { getUserAttempts } from "../../../actions/attempts";

const Attempt = ({ stats, toHome }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAttempts(user?.result?.email));
  }, []);

  const style = {
    borderRadius: 12,
    border: 0,
    color: "#e0e0e0",
    backgroundColor: "#616161",
    elevation: 0,
  };

  const rows = [];

  const userAttempts = useSelector((state) => state.user);
  var highScore = false;

  if (userAttempts.length) {
    userAttempts.map((userAttempt) => {
      if (
        userAttempt.type === stats.type &&
        userAttempt.operation === stats.operation &&
        userAttempt.max === stats.max
      ) {
        rows.push((userAttempt.completed * 1000 * 60) / userAttempt.time);
      }
    });

    rows.sort((a, b) => b - a);
    if ((stats.completed * 1000 * 60) / stats.time >= rows[0]) highScore = true;
  }

  document.onkeydown = (e) => {
    if (e.code === "Enter" || e.code === "Space") toHome();
  };
  return (
    <Paper
      style={{
        ...style,
        height: "400px",
        width: "900px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      onClick={toHome}
    >
      {user ? null : (
        <Box
          style={{
            width: "280px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Typography
            style={{ marginLeft: "20px", marginBottom: "10px" }}
            variant="h6"
            fontWeight="bold"
            display="inline"
          >
            (Sign in to save your scores)
          </Typography>
        </Box>
      )}
      <Typography
        style={{ marginLeft: "20px", marginBottom: "10px" }}
        variant="h4"
        fontWeight="bold"
        display="inline"
      >
        Summary
      </Typography>
      <Typography
        style={{ marginLeft: "25px", marginBottom: "10px" }}
        variant="h4"
        fontWeight="bold"
        display="inline"
      >
        {highScore ? "*New Record*" : null}
      </Typography>
      <div style={{ ...style, display: "inline-flex" }}>
        <StatCard title="Game Type" value={stats.type} units="" />
        <StatCard title="Operation" value={stats.operation} units="" />
        <StatCard title="Max Value" value={stats.max} units="" />
      </div>
      <div style={{ ...style, display: "inline-flex" }}>
        <StatCard
          title="Speed"
          value={
            Math.round((stats.completed * 60 * 1000 * 1000) / stats.time) / 1000
          }
          units="Questions Per Minute"
        />
        <StatCard title="Completed" value={stats.completed} units="Questions" />
        <StatCard title="Time" value={stats.time / 1000} units="seconds" />
      </div>
      <Box
        style={{
          width: "180px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Typography variant="h6" fontSize="10pt" color="#bdbdbd">
          Press Space or Enter to return
        </Typography>
      </Box>
    </Paper>
  );
};

export default Attempt;
