import React, { useState } from "react";
import * as Images from "../../../utilities/images";
import { useNavigate } from "react-router-dom";

const MainNav = () => {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [checkToggleOn,setCheckToggleOn] = useState("");
  const navigate = useNavigate();

  // Update the toggle state
  const handleToggleChange = (flag) => {
    setIsToggleOn(!isToggleOn);
    setCheckToggleOn(flag)
    let routeToNavigate;
    if (flag === "login") {
      routeToNavigate = isToggleOn ? "/" : "/login";
    } else {
      routeToNavigate = isToggleOn ? "/" : "/choose-roles";
    }
    setTimeout(() => {
      navigate(routeToNavigate);
    }, 400);
  };

  return (
    <>
      <div className="container">
        <div className="header ">
          <img alt="company-logo" src={Images.Logo} />
          <div className="logButtons ms-auto d-flex gap-3">
            <div className="form-group landing-page-group">
              <label className="toggle">
                <input
                  onChange={() => handleToggleChange("login")}
                  checked={checkToggleOn === "login" && isToggleOn}
                  type="checkbox"
                />
                <span className="slider"></span>
                <span
                  className="labels"
                  data-on="Login"
                  data-off="LOGIN"
                ></span>
              </label>
            </div>
            <div className="form-group">
              <label className="toggle">
                <input
                  onChange={() => handleToggleChange("choose-role")}
                  checked={checkToggleOn === "choose-role" && isToggleOn}
                  type="checkbox"
                />
                <span className="slider"></span>
                <span
                  className="labels"
                  data-on="join us"
                  data-off="JOIN US"
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNav;
