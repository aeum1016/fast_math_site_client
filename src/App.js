import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import User from "./components/User/User";
import Test from "./components/Test/Test";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route path="/user" exact element={<User />} />
          <Route path="/test" exact element={<Test />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
