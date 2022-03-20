import React from "react";

import {
  FormControl,
  InputLabel,
  IconButton,
  Select,
  MenuItem,
  Paper,
  Box,
} from "@mui/material";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import useStyles from "../../../styles/settings";

const Settings = ({ settings, handleSettings, toHome }) => {
  const classes = useStyles();

  document.onkeydown = (e) => {
    if (e.code === "Enter" || e.code === "Space") toHome();
  };

  return (
    <Paper
      style={{
        width: "760px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Box
        style={{
          width: "40px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <IconButton
          aria-label="settings"
          onClick={toHome}
          className={classes.grey}
          align="center"
        >
          <CalculateOutlinedIcon className={classes.grey} />
        </IconButton>
      </Box>
      <FormControl
        style={{
          width: "150px",
          margin: "20px",
        }}
      >
        <InputLabel id="inputType">Type</InputLabel>
        <Select
          labelId="inputType"
          name="type"
          value={settings.type}
          label="Type"
          onChange={handleSettings}
        >
          <MenuItem value={"correct"}>Correct</MenuItem>
          <MenuItem value={"time"}>Time</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        style={{
          width: "150px",
          margin: "20px",
        }}
      >
        <InputLabel id="inputOperation">Operation</InputLabel>
        <Select
          labelId="inputOperation"
          name="operation"
          value={settings.operation}
          label="Operation"
          onChange={handleSettings}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"+"}>Addition</MenuItem>
          <MenuItem value={"-"}>Subtraction</MenuItem>
          <MenuItem value={"*"}>Multiplication</MenuItem>
          <MenuItem value={"/"}>Division</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        style={{
          width: "150px",
          margin: "20px",
        }}
      >
        <InputLabel id="inputMaxValue">Max Value</InputLabel>
        <Select
          labelId="inputMaxValue"
          name="max"
          value={settings.max}
          label="Max Value"
          onChange={handleSettings}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        style={{
          width: "150px",
          margin: "20px",
        }}
      >
        <InputLabel id="inputCondition">End Condition</InputLabel>
        <Select
          labelId="inputCondition"
          name="condition"
          value={settings.condition}
          label="End Condition"
          onChange={handleSettings}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default Settings;
