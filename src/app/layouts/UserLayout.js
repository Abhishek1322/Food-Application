import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import User_Sidebar from "../components/common/userSidebar";
import User_Navbar from "../components/common/userNavbar";

const UserLayout = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const authRoutes = ["/"];

  return (
    <>
      {/* <AuthNav /> */}
      {authRoutes.includes(pathName) ? (
        <>
          <main className="main">
            <Outlet />
          </main>
        </>
      ) : (
        <>
          <div className="mainBox">
            <User_Sidebar />
            <main className="main">
              <User_Navbar />
              <Outlet />
            </main>
          </div>

          {/* <MainFooter/> */}
        </>
      )}
      {/* <AuthFooter /> */}
    </>
  );
};

export default UserLayout;
