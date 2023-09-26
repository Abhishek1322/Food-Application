import React from "react";
import * as Images from "../../../utilities/images";
import { Link, useLocation } from "react-router-dom";

const Chef_Sidebar = () => {

  
  const location = useLocation();


  return (
    <>
      <div className="sideBar">
        <div className="sidebarlogo ">
          <img src={Images.Logo} alt="logo" className="img-fluid" />
        </div>
        <div className="sidelist">
          <ul>
            <li
              className={
                location.pathname === "/home-user"
                  ? "sidebarLinks active"
                  : "sidebarLinks"
              }
            >
              <Link to="/home-user" className="sidebarItems">
                <img src={Images.homeOrange} className="imgHide" />
                <img src={Images.Home} className="imgShow" />
                <span className="d-block">Home</span>
              </Link>
            </li>
            <li className="sidebarLinks">
              <Link to="#" className="sidebarItems">
                <img src={Images.chefmenuOrange} className="imgHide" />
                <img src={Images.chefsideMenu} className="imgShow" />
                <span className="d-block">Menu</span>
              </Link>
            </li>
            <li
              className={
                location.pathname === "/my-orders"
                  ? "sidebarLinks active"
                  : "sidebarLinks"
              }
            >
              <Link to="#" className="sidebarItems">
                <img src={Images.myorderorange} className="imgHide" />
                <img src={Images.myorder} className="imgShow" />
                <span className="d-block">Bookings</span>
              </Link>
            </li>

            <li
              className={
                location.pathname === "/setting"
                  ? "sidebarLinks active"
                  : "sidebarLinks"
              }
            >
              <Link to="/setting" className=" sidebarItems">
                <img src={Images.setting} className="imgHide" />
                <img src={Images.settingGray} className="imgShow" />
                <span className="d-block">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarProfile ">
          <Link to="#">
            <img src={Images.chefProfile} alt="logo" className="userprofile" />
          </Link>
          Profile
        </div>
      </div>
    </>
  );
};

export default Chef_Sidebar;
