import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
