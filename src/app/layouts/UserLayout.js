import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import User_Sidebar from "../components/common/userSidebar";
import User_Navbar from "../components/common/userNavbar";
import { useAuthSelector } from "../../redux/selector/auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useUserSelector } from "../../redux/selector/user";

const UserLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  const userSelector = useUserSelector();
  const { paymentIntent } = userSelector;
  const checkRoutes = [
    "/user-myprofile",
    "/user-editprofile",
    "/user-manageaddress",
    "/thank-you",
  ];
  const authData = useAuthSelector();
  const isAuthenticated = localStorage.getItem("authToken");

  //STRIPE_PUBLISHABLE_KEY
  const stripePromise = loadStripe(
    process.env.REACT_APP_SRTIPE_PUBLISHABLE_KEY
  );
  // payment options stripe
  const options = {
    clientSecret: paymentIntent?.client_secret,
  };
  return (
    <>
      {isAuthenticated && authData?.userInfo?.role === "user" ? (
        <>
          <Elements stripe={stripePromise} options={options}>
            {checkRoutes.includes(pathname) ? (
              <main className="usermain">
                <User_Navbar />
                <Outlet />
              </main>
            ) : (
              <div
                className={
                  authData?.showSideBar
                    ? "mainBox activeSidebar"
                    : "mainBox inActiveSidebar"
                }
              >
                <User_Sidebar />
                <main className="usermain">
                  <User_Navbar />
                  <Outlet />
                </main>
              </div>
            )}
          </Elements>
        </>
      ) : isAuthenticated &&
        authData?.userInfo?.chefInfo?.documentVerified &&
        authData?.userInfo?.role === "chef" ? (
        <Navigate to="/home" />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default UserLayout;
