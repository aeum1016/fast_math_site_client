import React, { useEffect, useState } from "react";

import Game from "./Game/Game";
import Settings from "./Settings/Settings";
import Attempt from "./Attempt/Attempt";

const Home = () => {
  const [settingsPage, setSettingsPage] = useState({
    on: false,
  });
  const [attemptPage, setAttemptPage] = useState({
    on: false,
  });

  const setSettingsOn = () => {
    setSettingsPage({
      on: true,
    });
  };
  const setSettingsOff = () => {
    setSettingsPage({
      on: false,
    });
  };

  const setAttemptOn = () => {
    setAttemptPage({
      on: true,
    });
  };
  const setAttemptOff = () => {
    setAttemptPage({
      on: false,
    });
  };

  const [attemptStats, setAttemptStats] = useState({
    type: "correct",
    operation: "all",
    max: 12,
    condition: 25,
    time: 0,
    completed: 0,
    incorrect: 0,
  });

  const handleAttemptStats = (e) => {
    setAttemptStats({
      ...attemptStats,
      [e.target.name]: e.target.value,
    });
  };

  const handleAttempt = (e) => {
    setAttemptStats({
      ...attemptStats,
      time: e.time,
      completed: e.completed,
      incorrect: e.incorrect,
    });
  };

  return (
    <React.Fragment>
      {settingsPage.on ? (
        <Settings
          settings={attemptStats}
          handleSettings={handleAttemptStats}
          toHome={setSettingsOff}
        />
      ) : attemptPage.on ? (
        <Attempt stats={attemptStats} toHome={setAttemptOff} />
      ) : (
        <Game
          testType={attemptStats.type}
          testOperation={attemptStats.operation}
          maxValue={attemptStats.max}
          testCondition={attemptStats.condition}
          setStats={handleAttempt}
          toSettings={setSettingsOn}
          toAttempt={setAttemptOn}
        />
      )}
    </React.Fragment>
  );
};

export default Home;
