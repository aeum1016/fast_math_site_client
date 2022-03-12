import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";

export default makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  auth: {
    color: grey[300],
    backgroundColor: grey[800],
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
}));
