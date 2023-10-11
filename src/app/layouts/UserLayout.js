import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import User_Sidebar from "../components/common/userSidebar";
import User_Navbar from "../components/common/userNavbar";
import { useAuthSelector } from "../../redux/selector/auth";

const UserLayout = () => {

  const location = useLocation();
  const authData = useAuthSelector();
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <>
      {isAuthenticated && authData?.userInfo?.role === "user"
      ? 
        <div className="mainBox">
          <User_Sidebar />
          <main className="usermain">
            <User_Navbar />
            <Outlet />
          </main>
        </div>
      : (
        isAuthenticated && authData?.userInfo?.chefInfo?.documentVerified && authData?.userInfo?.role === "chef"
        ? 
          <Navigate to="/home" />
        :
          <Navigate to="/" />          
      )}
    </>
  );
};

export default UserLayout;
