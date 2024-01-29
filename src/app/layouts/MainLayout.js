import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthSelector } from "../../redux/selector/auth";
import MainNav from "../components/common/MainNav";
import MainFooter from "../components/common/MainFooter";

const MainLayout = () => {
  return (
    <>
      <MainNav />
      <Outlet />
      <MainFooter />
    </>
  );
};

export default MainLayout;
