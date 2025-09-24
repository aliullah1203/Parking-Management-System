import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Features from "./components/Features";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import TestEmail from "./components/TestEmail";
import PrivateRoute from "./components/PrivateRoute";
import DownNavbar from "./components/DownNavbar";
import ContactUs from "./components/ContactUs";
import UserProfile from "./components/UserProfile";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactUs />} /> {/* <-- Contact Us */}
        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard user={user} />} />}
        />
        <Route
          path="/test-email"
          element={<PrivateRoute element={<TestEmail />} />}
        />
        <Route
          path="/features"
          element={<PrivateRoute element={<Features />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<UserProfile />} />}
        />
      </Routes>
      <DownNavbar />
    </Router>
  );
}

export default App;
