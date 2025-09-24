import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/modules/navbar";
import Home from "./components/modules/home";
import About from "./components/modules/about";
import Features from "./components/modules/features";
import Login from "./components/modules/login";
import Register from "./components/modules/register";
import Dashboard from "./components/modules/dashboard";
import TestEmail from "./components/modules/testEmail";
import PrivateRoute from "./components/modules/privateRoute";
import DownNavbar from "./components/modules/downNavbar";
import ContactUs from "./components/modules/contactUs";
import UserProfile from "./components/modules/userProfile";

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
        <Route path="/contact" element={<ContactUs />} />

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
