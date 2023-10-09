import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthSelector } from "../../redux/selector/auth";

const ChefRoute = ({ role, children }) => {
  const authData = useAuthSelector();
  console.log(
    "authDataauthData",
    authData?.userInfo?.chefInfo?.documentVerified
  );
  const isAuthenticated = localStorage.getItem("authToken");
  return isAuthenticated &&
    role === "chef" &&
    authData?.userInfo?.role === "chef" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default ChefRoute;
