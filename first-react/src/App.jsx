import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./components/home";
import CreatedPlans from "./components/createdPlans";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/created-plans" element={<CreatedPlans />} />
      </Routes>
    </Router>
  );
};

export default App;