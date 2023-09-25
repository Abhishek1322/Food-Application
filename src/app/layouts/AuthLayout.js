import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const authRoutes = ["/resources", "/companyfrontProfile"];

  return (
    <>
      {/* <AuthNav /> */}
      {authRoutes.includes(pathName) ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <main className="main" id="main">
            <Outlet />
          </main>
        </>
      )}
      {/* <AuthFooter /> */}
    </>
  );
};

export default AuthLayout;
