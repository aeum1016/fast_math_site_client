import React, { useEffect } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";

import { getAttempts } from "../../actions/attempts";

const Leaderboard = () => {
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
    email,
    user
  ) {
    const shortDate = new Date(date).toLocaleDateString();
    return {
      type: type,
      operation: operation,
      max: max,
      time: time / 1000,
      completed: completed,
      incorrect: incorrect,
      date: shortDate,
      email: email,
      user: user,
      id: user + date,
    };
  }
  function getSpeed(params) {
    return `${params.row.completed / (params.row.time / 60)}`;
  }
  const columns = [
    { field: "user", headerName: "User", width: 150 },
    { field: "time", headerName: "Time (s)", width: 80 },
    { field: "incorrect", headerName: "Incorrect", width: 90 },
    { field: "speed", headerName: "QPM", width: 100, valueGetter: getSpeed },
    { field: "date", headerName: "Date", flex: 1 },
  ];

  const allAttempts = [];

  const attempts = useSelector((state) => state.attempts);

  attempts.map((attempt) =>
    allAttempts.push(
      createData(
        attempt.type,
        attempt.operation,
        attempt.max,
        attempt.time,
        attempt.completed,
        attempt.incorrect,
        attempt.createdAt,
        attempt.email
      )
    )
  );
  allAttempts.sort((a, b) => b.completed / b.time - a.completed / a.time);

  const uniqueUsers = new Set();
  function containsUser(a) {
    if (!uniqueUsers.has(a.email) && a.user !== "Guest") {
      uniqueUsers.add(a.email);
      return false;
    }
    return true;
  }

  const allOps12Max25Questions = allAttempts.filter(
    (a) =>
      a.type === "correct" &&
      a.operation === "all" &&
      a.max === 12 &&
      a.completed === 25 &&
      !containsUser(a)
  );
  uniqueUsers.clear();
  const allOps20Max25Questions = allAttempts.filter(
    (a) =>
      a.type === "correct" &&
      a.operation === "all" &&
      a.max === 20 &&
      a.completed === 25 &&
      !containsUser(a)
  );
  uniqueUsers.clear();
  const multiplication12Max25Questions = allAttempts.filter(
    (a) =>
      a.type === "correct" &&
      a.operation === "*" &&
      a.max === 12 &&
      a.completed === 25 &&
      !containsUser(a)
  );
  uniqueUsers.clear();
  const division12Max25Questions = allAttempts.filter(
    (a) =>
      a.type === "correct" &&
      a.operation === "/" &&
      a.max === 12 &&
      a.completed === 25 &&
      !containsUser(a)
  );
  uniqueUsers.clear();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAttempts());
  }, []);

  return !attempts.length ? (
    <CircularProgress />
  ) : (
    <>
      <Box
        style={{
          height: "680px",
          width: "100%",
          display: "inline-flex",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ width: "520px", margin: "25px" }}>
          <Typography color="#a1b2c3" fontWeight="bold" variant="h4">
            Completions All 12 25
          </Typography>
          <DataGrid
            sx={{ ...style }}
            rows={allOps12Max25Questions}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            hideFooterPagination
            disableColumnFilter
            componentsProps={{
              pagination: { sx: { ...style } },
            }}
          />
        </div>
        <div style={{ width: "520px", margin: "25px" }}>
          <Typography color="#a1b2c3" fontWeight="bold" variant="h4">
            Completions All 20 25
          </Typography>
          <DataGrid
            sx={{ ...style }}
            rows={allOps20Max25Questions}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            hideFooterPagination
            disableColumnFilter
            componentsProps={{
              pagination: { sx: { ...style } },
            }}
          />
        </div>
      </Box>
      <Box
        style={{
          height: "680px",
          width: "100%",
          display: "inline-flex",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ width: "520px", margin: "25px" }}>
          <Typography color="#a1b2c3" fontWeight="bold" variant="h4">
            Completions Mult. 12 25
          </Typography>
          <DataGrid
            sx={{ ...style }}
            rows={multiplication12Max25Questions}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            hideFooterPagination
            disableColumnFilter
            componentsProps={{
              pagination: { sx: { ...style } },
            }}
          />
        </div>
        <div style={{ width: "520px", margin: "25px" }}>
          <Typography color="#a1b2c3" fontWeight="bold" variant="h4">
            Completions Div. 12 25
          </Typography>
          <DataGrid
            sx={{ ...style }}
            rows={division12Max25Questions}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            hideFooterPagination
            disableColumnFilter
            componentsProps={{
              pagination: { sx: { ...style } },
            }}
          />
        </div>
      </Box>
    </>
  );
};

export default Leaderboard;
