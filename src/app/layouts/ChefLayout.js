import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Chef_Sidebar from "../components/common/chefSidebar";
import Chef_Navbar from "../components/common/chefNavbar";

const Chef_Layout = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const authRoutes = ["/"];

  return (
    <>
      {authRoutes.includes(pathName) ? (
        <>
          <main className="main">
            <Outlet />
          </main>
        </>
      ) : (
        <>
          <div className="mainBox">
            <Chef_Sidebar />
            <main className="main">
              <Chef_Navbar />
              <Outlet />
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Chef_Layout;
