import React from "react";
import { Route, Navigate } from "react-router-dom";

// Function to check if the user is authenticated
const isAuthenticated = () => {
  const authToken = localStorage.getItem("authToken");
  return authToken !== null;
};



const PrivateChefRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Element /> : <Navigate to="/" />}
    />
  );
};

export default PrivateChefRoute;
