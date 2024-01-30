import React from "react";
import * as Images from "../../../utilities/images";

const MainFooter = () => {
  return (
    <>
      <footer className="footer_sc">
        <div className="container pb-4">
          <div className="row">
            <div className="col-lg-4">
              <div className="footer_logo">
                <img alt="company-logo" src={Images.Logo} />
                <p className="primary pt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  laoreet nisl nibh, nec convallis tortor condimentum vitae.{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <ul className="footer_nav">
                <h5 className="footer_h pb-4">INFORMATION</h5>
                <li className="navigation">
                  <a className="footer_ank" href="#">
                    About Us
                  </a>
                </li>
                <li className="navigation">
                  <a className="footer_ank" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li className="navigation">
                  <a className="footer_ank" href="#">
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h5 className="footer_h ">Download Our App </h5>
              <div className="appButtons mt-2">
                <button className="orngButtons me-3  ">
                  <img
                    className="me-3"
                    alt="apple-logo"
                    src={Images.AppleIcon}
                  />
                  <div
                    className="btnInner
                    "
                  >
                    <span className="primary">Download on the</span>
                    <br />
                    <span className="secondary">App Store</span>
                  </div>
                </button>
                <button className="orngButtons">
                  <img
                    alt="playstoreIcon"
                    className="me-3"
                    src={Images.PlayStoreIcon}
                  />
                  <div className="btnInner">
                    <span className="primary">Get it on</span>
                    <br />
                    <span className="secondary">Google Play</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <h5 className="comman_p text-center">
            © copyright 2023. All rights reserved
          </h5>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
