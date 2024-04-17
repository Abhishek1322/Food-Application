import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthSelector } from "../../redux/selector/auth";

const CommonProtectLayout = () => {
  const authData = useAuthSelector();
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <>
      {isAuthenticated &&
      (authData?.userInfo?.role === "user" ||
        authData?.userInfo?.role === "chef") ? (
        <main className="main" id="main">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default CommonProtectLayout;
