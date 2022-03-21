import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";

import { getUserAttempts } from "../../actions/attempts";

const UserChart = () => {
  const [rows, setRows] = useState({
    data: [],
  });

  const userAttempts = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const newRows = [];
    userAttempts.map((userAttempt) => {
      newRows.push({
        speed: (userAttempt.completed / userAttempt.time) * 60 * 1000,
        date: new Date(userAttempt.createdAt).toLocaleDateString(),
        id: userAttempt.email + userAttempt.createdAt,
      });
    });

    setRows({ data: newRows });

    const user = JSON.parse(localStorage.getItem("profile"));
    dispatch(getUserAttempts(user?.result?.email));
  }, []);

  return (
    <LineChart
      style={{
        marginLeft: "auto",
        marginRight: "auto",
      }}
      width={1000}
      height={400}
      data={rows.data}
      margin={{ top: 5, right: 50, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="20" vertical={false} />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip isAnimationActive={false} itemStyle={{ color: "black" }} />
      <Line
        isAnimationActive={false}
        type="monotone"
        dataKey="speed"
        stroke="#e0e0e0"
      />
    </LineChart>
  );
};

export default UserChart;
