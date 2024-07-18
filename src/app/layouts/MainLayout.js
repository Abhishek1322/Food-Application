import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthSelector } from "../../redux/selector/auth";
import MainNav from "../components/common/MainNav";
import MainFooter from "../components/common/MainFooter";
import "../../public/css/landingPage.css";

const MainLayout = () => {
  const authData = useAuthSelector();
  const lacotion = useLocation();
  const { pathname } = lacotion;
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <>
      {!isAuthenticated ? (
        <>
          <div
            className={
              pathname === "/user-contact-us"
                ? "banner banner-contact"
                : "banner"
            }
          >
            <MainNav />
            <Outlet />
          </div>
          <MainFooter />
        </>
      ) : isAuthenticated &&
        authData?.userInfo?.role === "chef" &&
        authData?.userInfo?.chefInfo?.documentVerified === "verified" ? (
        <Navigate to="/home" />
      ) : (
        <Navigate to="/home-user" />
      )}
    </>
  );
};

export default MainLayout;
