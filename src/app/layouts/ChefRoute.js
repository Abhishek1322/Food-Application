import React from "react";
import { Route, Navigate } from "react-router-dom";

const ChefRoute = ({ role, children }) => {
  const isAuthenticated = localStorage.getItem("authToken");
  return isAuthenticated && role === "chef" ? children : <Navigate to="/" />;
};

export default ChefRoute;
