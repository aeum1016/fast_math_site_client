import React, { useEffect } from "react";
import { CircularProgress, Box, Typography, Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";

import { getUserAttempts } from "../../actions/attempts";

const Attempts = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAttempts(user?.result?.email));
  }, []);

  const style = {
    borderRadius: 2,
    border: 0,
    "& .MuiDataGrid-main": { borderBottom: 0 },
    color: "#a1b2c3",
    backgroundColor: "#424242",
    "& .MuiDataGrid-cell:hover": {
      color: "#FFFFFF",
    },
    "& .MuiDataGrid-row": {
      "&:nth-of-type(2n)": { backgroundColor: "#616161" },
    },
    "& .MuiDataGrid-columnHeaders": {
      fontSize: 16,
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none",
    },
    "& .MuiPaginationItem": {
      color: "#ffffff",
    },
  };

  function createData(
    type,
    operation,
    max,
    time,
    completed,
    incorrect,
    date,
    id
  ) {
    date = new Date(date).toLocaleString();
    return {
      type: type === "correct" ? "completions" : type,
      operation: operation,
      max: max,
      time: time / 1000,
      completed: completed,
      incorrect: incorrect,
      date: date,
      id: id,
    };
  }
  function getSpeed(params) {
    return `${params.row.completed / (params.row.time / 60)}`;
  }
  function getAverage(rows) {
    var sum = 0;
    for (var i = 0; i < rows.length; i++) {
      sum += (rows[i].completed * 60) / rows[i].time;
    }
    return Math.round((sum * 1000) / rows.length) / 1000;
  }
  const columns = [
    { field: "type", headerName: "Type", width: 100 },
    { field: "operation", headerName: "Operation", width: 100 },
    { field: "max", headerName: "Max Value", width: 100 },
    { field: "time", headerName: "Time (s)", width: 100 },
    { field: "completed", headerName: "Completed", width: 100 },
    { field: "incorrect", headerName: "Incorrect", width: 100 },
    { field: "speed", headerName: "QPM", width: 100, valueGetter: getSpeed },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  const rows = [];

  const userAttempts = useSelector((state) => state.user);

  userAttempts.map((userAttempt) =>
    rows.push(
      createData(
        userAttempt.type,
        userAttempt.operation,
        userAttempt.max,
        userAttempt.time,
        userAttempt.completed,
        userAttempt.incorrect,
        userAttempt.createdAt,
        userAttempt.email + userAttempt.createdAt
      )
    )
  );

  rows.reverse();

  return !userAttempts.length ? (
    <CircularProgress />
  ) : (
    <Box
      style={{
        height: "630px",
        width: "900px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Card
        sx={{
          ...style,
        }}
      >
        <Card sx={{ ...style, display: "inline-flex" }}>
          <Typography
            variant="h4"
            margin="40px"
            fontWeight="bold"
            width="400px"
          >
            {"Avg (Total):"} {getAverage(rows)}
          </Typography>
          <Typography
            variant="h4"
            margin="40px"
            fontWeight="bold"
            width="400px"
          >
            {"Avg (Last 10):"} {getAverage(rows.slice(0, 10))}
          </Typography>
        </Card>
      </Card>
      <DataGrid
        sx={{ ...style }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        pagination
        componentsProps={{
          pagination: { sx: { ...style } },
        }}
      />
    </Box>
  );
};

export default Attempts;
