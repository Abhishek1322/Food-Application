import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuthSelector } from "../../redux/selector/auth";

const PublicRoute = ({ children }) => {
  const authData = useAuthSelector();
  console.log("authDataauthData", authData?.userInfo?.role);
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  if (!isAuthenticated) {
    return children;
  } else if (isAuthenticated && authData?.userInfo?.role === "chef") {
    return <Navigate to="/home" />;
  } else if (isAuthenticated && authData?.userInfo?.role === "user") {
    return <Navigate to="/home-user" />;
  }
};

export default PublicRoute;
