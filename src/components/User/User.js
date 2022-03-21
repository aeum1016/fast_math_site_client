import React from "react";
import Attempts from "../Attempts/Attempts";
import LineChart from "../Attempts/UserChart";

const User = () => {
  return (
    <React.Fragment>
      <LineChart />
      <Attempts />
    </React.Fragment>
  );
};

export default User;
