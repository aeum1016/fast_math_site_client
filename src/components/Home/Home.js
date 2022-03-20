import React, { useEffect, useState } from "react";

import Game from "./Game/Game";
import Settings from "./Settings/Settings";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [settingsPage, setSettingsPage] = useState({
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

  const [settings, setSettings] = useState({
    type: "correct",
    operation: "all",
    max: 12,
    condition: 25,
  });

  const handleSettings = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <React.Fragment>
      {settingsPage.on ? (
        <Settings
          settings={settings}
          handleSettings={handleSettings}
          toHome={setSettingsOff}
        />
      ) : (
        <Game
          testType={settings.type}
          testOperation={settings.operation}
          maxValue={settings.max}
          testCondition={settings.condition}
          toSettings={setSettingsOn}
        />
      )}
    </React.Fragment>
  );
};

export default Home;
