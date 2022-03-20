import { makeStyles } from "@mui/styles";
import { grey } from "@mui/material/colors";

export default makeStyles((theme) => ({
  appBar: {
    backgroundColor: grey[800],
    borderRadius: 8,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "10px 100px",
  },
  heading: {
    color: grey[300],
    fontWeight: "bolder",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    color: grey[300],
    whiteSpace: "nowrap",
  },
  brandContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "220px",
  },
  navButtons: {
    display: "flex",
    alignItems: "center",
    width: "500px",
  },
  auth: {
    color: grey[300],
    backgroundColor: grey[800],
  },
  grey: {
    color: grey[300],
    backgroundColor: grey[800],
  },
}));
