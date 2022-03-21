import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";

export default makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  auth: {
    color: "#a1b2c3",
    backgroundColor: grey[800],
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
}));
