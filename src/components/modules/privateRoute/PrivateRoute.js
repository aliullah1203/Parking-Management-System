// src/components/modules/privateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("loggedInUser");

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
