import React from "react";

import Game from "./Game/Game";

const Home = () => {
  return (
    <Game
      testOperation={"+"}
      maxValue={15}
      testType={"time"}
      testCondition={20}
    />
  );
};

export default Home;
