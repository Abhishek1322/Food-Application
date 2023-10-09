import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuthSelector } from "../../redux/selector/auth";

const PublicRoute = ({ children }) => {
  const authData = useAuthSelector();
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));
  console.log(
    "authDataauthDatadscsc",
    authData?.userInfo?.chefInfo?.documentVerified
  );
  if (!isAuthenticated) {
    return children;
  } else if (isAuthenticated && authData?.userInfo?.role === "chef") {
    return <Navigate to="/setup-profile" />;
  } else if (isAuthenticated && authData?.userInfo?.role === "user") {
    return <Navigate to="/home-user" />;
  }
};

export default PublicRoute;
