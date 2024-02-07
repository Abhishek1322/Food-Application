import React from "react";
import * as Images from "../../../utilities/images";
import { Link } from "react-router-dom";

const MainFooter = () => {
  return (
    <>
      <footer className="footer_sc">
        <div className="container pb-4">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="footer_logo ">
                <img alt="company-logo" src={Images.Logo} />
                {/* <p className="primary pt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  laoreet nisl nibh, nec convallis tortor condimentum vitae.{" "}
                </p> */}
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <ul className="footer_nav">
                <h5 className="footer_h pb-4">INFORMATION</h5>
                <li className="navigation">
                  <Link className="footer_ank" to="/about-us">
                    About Us
                  </Link>
                </li>
                <li className="navigation">
                  <Link className="footer_ank" to="/privacy-policy">
                    Privacy Policy 
                  </Link>
                </li>
                <li className="navigation">
                  <Link className="footer_ank" to="/term-condition">
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4">
              <h5 className="footer_h ">Download Our App </h5>
              <div className="appButtons mt-3">
                <a href="#" className="orngButtons me-2  ">
                  <img
                    className="appImages me-1"
                    alt="apple-logo"
                    src={Images.appStoreOrange}
                  />
                  
                </a>
                <a href="#" className="orngButtons">
                  <img
                    alt="playstoreIcon"
                    className="appImages "
                    src={Images.googleStore}
                  />
                  
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <h5 className="comman_p text-center">
            © copyright 2024. All rights reserved
          </h5>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
