import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthSelector } from "../../redux/selector/auth";
import MainNav from "../components/common/MainNav";
import MainFooter from "../components/common/MainFooter";
import "../../public/css/landingPage.css";

const MainLayout = () => {
  const authData = useAuthSelector();
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <>
      {!isAuthenticated ? (
        <>
          <div className="banner">
            <MainNav />
            <Outlet />
          </div>
          <MainFooter />
        </>
      ) : isAuthenticated &&
        authData?.userInfo?.role === "chef" &&
        authData?.userInfo?.chefInfo?.documentVerified ? (
        <Navigate to="/home" />
      ) : (
        <Navigate to="/home-user" />
      )}
    </>
  );
};

export default MainLayout;
