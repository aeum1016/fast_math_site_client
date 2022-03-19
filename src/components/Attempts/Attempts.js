import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";

const Attempts = () => {
  const style = {
    color: "#e0e0e0",
    backgroundColor: "#424242",
    border: "0",
  };

  const headerStyle = {
    color: "#e0e0e0",
    backgroundColor: "#616161",
    border: "0",
  };

  const rows = [];

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
    return { type, operation, max, time, completed, incorrect, date, id };
  }
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
  const rowsRev = rows.reverse().slice(0, 10);

  return !userAttempts.length ? (
    <CircularProgress />
  ) : (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ ...headerStyle }}>
          <TableRow sx={{ ...headerStyle }}>
            <TableCell sx={{ ...headerStyle }} align="right">
              Type
            </TableCell>
            <TableCell sx={{ ...headerStyle }} align="right">
              Operation
            </TableCell>
            <TableCell sx={{ ...headerStyle }} align="right">
              Max Value
            </TableCell>
            <TableCell sx={{ ...headerStyle }} align="right">
              Time
            </TableCell>
            <TableCell sx={{ ...headerStyle }} align="right">
              Completed
            </TableCell>
            <TableCell sx={{ ...headerStyle }} align="right">
              Incorrect
            </TableCell>
            <TableCell sx={{ ...headerStyle }} align="right">
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsRev.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                ...style,
              }}
            >
              <TableCell sx={{ ...style }} align="right">
                {row.type}
              </TableCell>
              <TableCell sx={{ ...style }} align="right">
                {row.operation}
              </TableCell>
              <TableCell sx={{ ...style }} align="right">
                {row.max}
              </TableCell>
              <TableCell sx={{ ...style }} align="right">
                {row.time}
              </TableCell>
              <TableCell sx={{ ...style }} align="right">
                {row.completed}
              </TableCell>
              <TableCell sx={{ ...style }} align="right">
                {row.incorrect}
              </TableCell>
              <TableCell sx={{ ...style }} align="right">
                {row.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Attempts;
