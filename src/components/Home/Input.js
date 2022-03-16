import React from "react";
import { Grid, OutlinedInput } from "@mui/material";

const MyInput = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  onKeyPress,
  inputValue,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <OutlinedInput
        name={name}
        placeholder={label}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={onKeyPress}
        type={type}
        autoFocus={autoFocus}
        variant="outlined"
        required
        sx={{
          input: { color: "lightGray" },
        }}
        size="medium"
        fullWidth
        autoComplete="off"
      />
    </Grid>
  );
};

export default MyInput;
