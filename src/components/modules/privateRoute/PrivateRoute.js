// src/components/modules/privateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("loggedInUser");

  // If no user in localStorage, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise render the requested component
  return children;
};

export default PrivateRoute;
