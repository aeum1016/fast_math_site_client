import React from "react";
import { Paper } from "@mui/material";

import StatCard from "./StatCard";

const Attempt = ({ stats, toHome }) => {
  const style = {
    borderRadius: 12,
    border: 0,
    color: "#e0e0e0",
    backgroundColor: "#616161",
    elevation: 0,
  };

  const rows = [];

  rows.reverse();
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
    </Paper>
  );
};

export default Attempt;
