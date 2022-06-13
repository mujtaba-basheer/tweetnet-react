import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Callback from "./Callback";
import Follows from "./Follows";
import Tweets from "./Tweets";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/follows" element={<Follows />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tweets/:id" element={<Tweets />} />
    </Routes>
  );
};

const Routes_1 = () => (
  <Router>
    <App />
  </Router>
);

export default Routes_1;
