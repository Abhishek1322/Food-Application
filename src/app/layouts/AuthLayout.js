import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthSelector } from "../../redux/selector/auth";

const AuthLayout = () => {
  const authData = useAuthSelector();
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <>
      {isAuthenticated &&
      authData?.userInfo?.chefInfo?.documentVerified &&
      authData?.userInfo?.role === "chef" ? (
        <Navigate to="/home" />
      ) : isAuthenticated && authData?.userInfo?.role === "user" ? (
        <Navigate to="/home-user" />
      ) : (
        <main className="main" id="main">
          <Outlet />
        </main>
      )}
    </>
  );
};

export default AuthLayout;
