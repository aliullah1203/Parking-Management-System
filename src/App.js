import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Features from "./components/Features";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import TestEmail from "./components/TestEmail"; // ✅ Import TestEmail

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/test-email" element={<TestEmail />} />{" "}
        {/* ✅ Add route to test */}
      </Routes>
    </Router>
  );
}

export default App;
