import React from "react";

import Game from "./Game/Game";

const Home = () => {
  return (
    <Game
      testOperation={"all"}
      maxValue={12}
      testType={"correct"}
      testCondition={20}
    />
  );
};

export default Home;
