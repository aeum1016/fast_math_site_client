import React from "react";
import { Card, Typography } from "@mui/material";

const StatCard = ({ title, value, units }) => {
  const style = {
    borderRadius: 12,
    border: 0,
    color: "#e0e0e0",
    backgroundColor: "#616161",
    elevation: 0,
  };

  return (
    <Card
      style={{
        ...style,
        height: "200px",
        width: "260px",
        marginLeft: "20px",
        marginRight: "20px",
      }}
      elevation={0}
    >
      <Typography variant="h6" fontSize={32}>
        {title} -
      </Typography>
      <Typography variant="h6" fontSize={22}>
        {value}
      </Typography>
      <Typography variant="h6" fontSize={12} color="#bdbdbd">
        {units}
      </Typography>
    </Card>
  );
};

export default StatCard;
