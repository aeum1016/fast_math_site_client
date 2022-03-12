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
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "280px",
  },
  navButtons: {
    display: "flex",
    alignItems: "center",
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
