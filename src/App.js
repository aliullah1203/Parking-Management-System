// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/modules/navbar";
import DownNavbar from "./components/modules/downNavbar";

import Home from "./components/modules/home";
import About from "./components/modules/about";
import ContactUs from "./components/modules/contactUs";
import Login from "./components/modules/login";
import Register from "./components/modules/register";

import Dashboard from "./components/modules/dashboard/Dashboard";
import TestEmail from "./components/modules/testEmail";
import Features from "./components/modules/features";
import UserProfile from "./components/modules/userProfile";
import PrivateRoute from "./components/modules/privateRoute";
import SlotDetails from "./components/modules/dashboard/SlotDetails";
import Author from "./components/modules/authority"; // uses index.js

function App() {
  // Load user from localStorage
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  // Slots state is lifted to App.js
  const [slots, setSlots] = useState(
    JSON.parse(localStorage.getItem("slots")) ||
      Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        available: true,
        start: null,
        end: null,
        notified: false,
        email: "",
      }))
  );

  // Persist user
  useEffect(() => {
    if (user) localStorage.setItem("loggedInUser", JSON.stringify(user));
    else localStorage.removeItem("loggedInUser");
  }, [user]);

  // Persist slots
  useEffect(() => {
    localStorage.setItem("slots", JSON.stringify(slots));
  }, [slots]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/author" element={<Author />} />

        {/* Private routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={
                <Dashboard
                  user={user}
                  setUser={setUser}
                  slots={slots}
                  setSlots={setSlots}
                />
              }
            />
          }
        />
        <Route
          path="/test-email"
          element={<PrivateRoute element={<TestEmail />} />}
        />
        <Route path="/slot/:id" element={<SlotDetails slots={slots} />} />

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
