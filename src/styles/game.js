import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";

export default makeStyles((theme) => ({
  grid: {
    height: "240px",
    justifyContent: "center",
    alignItems: "center",
  },
  outside: {
    backgroundColor: grey[800],
    color: "#a1b2c3",
    input: "#a1b2c3",
    fontSize: "20pt",
    opacity: "0.6",
  },
  inside: {
    backgroundColor: grey[800],
    color: "#a1b2c3",
    input: "#a1b2c3",
    fontSize: "24pt",
    opacity: "0.8",
  },
  center: {
    backgroundColor: grey[800],
    color: "#a1b2c3",
    input: "#a1b2c3",
    fontSize: "28pt",
  },
  grey: {
    input: "#a1b2c3",
    color: "#a1b2c3",
    backgroundColor: grey[800],
  },
}));
