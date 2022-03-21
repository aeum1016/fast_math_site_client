import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";

export default makeStyles((theme) => ({
  paper: {
    marginTop: "64px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
    color: "#a1b2c3",
    backgroundColor: grey[800],
  },
  root: {
    "& .MuiTextField-root": {
      margin: "8px",
    },
  },
  avatar: {
    margin: "8px",
    backgroundColor: grey[700],
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "24px",
  },
  submit: {
    margin: "24px 0 16px",
    color: "#a1b2c3",
    backgroundColor: grey[700],
  },
  googleButton: {
    marginBottom: "16px",
    color: "#a1b2c3",
    backgroundColor: grey[700],
  },
  grey: {
    input: "#a1b2c3",
    color: "#a1b2c3",
    backgroundColor: grey[800],
  },
}));
