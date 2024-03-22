import Home from "pages/Home";
import Login from "pages/login/Login";
import Signup from "pages/signup/Signup";
import React from "react";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
