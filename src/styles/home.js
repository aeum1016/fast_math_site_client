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
    color: grey[300],
    input: grey[300],
    fontSize: "12pt",
    opacity: "0.6",
  },
  inside: {
    backgroundColor: grey[800],
    color: grey[300],
    input: grey[300],
    fontSize: "16pt",
    opacity: "0.8",
  },
  center: {
    backgroundColor: grey[800],
    color: grey[300],
    input: grey[300],
    fontSize: "20pt",
  },
  grey: {
    input: grey[300],
    color: grey[300],
    backgroundColor: grey[800],
  },
}));
