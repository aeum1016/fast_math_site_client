import { createTheme } from "@mui/material/styles";
import { grey, blueGrey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: grey,
    secondary: blueGrey,
    grey: grey[600],
    white: { 500: "#000000" },
  },
});

export default theme;
