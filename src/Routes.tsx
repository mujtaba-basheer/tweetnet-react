import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Application from "./Application";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/callback" element={<Application />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

const Routes_1 = () => (
  <Router>
    <App />
  </Router>
);

export default Routes_1;
