import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import User from "./components/User/User";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route path="/user" exact element={<User />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
