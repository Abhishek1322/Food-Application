import React from "react";
import { Route, Navigate } from "react-router-dom";

const UserRoute = ({ role, children }) => {
  const isAuthenticated = localStorage.getItem("authToken");
  return isAuthenticated && role === "user" ? children : <Navigate to="/" />;
};

export default UserRoute;
