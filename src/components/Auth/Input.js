import React from "react";
import { Grid, InputAdornment, IconButton, InputBase } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import useStyles from "../../styles/auth";

const Input = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <InputBase
        placeholder={label}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        name={name}
        autoFocus={autoFocus}
        type={type}
        endAdornment={
          name === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword} className={classes.grey}>
                {type === "password" ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : null
        }
        sx={{
          input: { color: "lightGray" },
        }}
      />
    </Grid>
  );
};

export default Input;
