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
                <img alt="company-logo" src={Images.Logo} className="logosil" />
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
                  <Link className="footer_ank" to="/user-contact-us">
                    Contact Us
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
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="">
                  <h5 className="comman_p">
                    © copyright 2024. All rights reserved
                  </h5>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="socialLinks">
                  <a href="https://twitter.com/ServeItLocal/">
                    <img
                      alt="twitter"
                      className="socialImg"
                      src={Images.twitter}
                    />
                  </a>
                  <a href="https://www.instagram.com/serveitlocal/">
                    <img
                      alt="instaIcon"
                      className="socialImg"
                      src={Images.instagram}
                    />
                  </a>
               
                  <a
                    href="
https://www.facebook.com/serveitlocal/"
                  >
                    <img
                      alt="faceBookIcon"
                      className="socialImg"
                      src={Images.facebook}
                    />
                  </a>
                  <a
                    href="
https://www.linkedin.com/company/serveitlocal/"
                  >
                    <img
                      alt="linkdin"
                      className="socialImg"
                      src={Images.linkdin}
                    />
                  </a>
                  <a href="https://www.pinterest.co.uk/serveitlocal/">
                    <img
                      alt="pintIcon"
                      className="socialImg"
                      src={Images.pinterest}
                    />
                  </a>

                  <a
                    href="
https://www.tiktok.com/@serveitlocal/

"
                  >
                    <img
                      alt="tiktok"
                      className="socialImg"
                      src={Images.tiktok}
                    />
                  </a>
                  <a
                    href="

                    https://www.snapchat.com/add/serveitlocal"
                  >
                    <img
                      alt=" snapchat"
                      className="socialImg"
                      src={Images.snapchat}
                    />
                  </a>
                  <a
                    href="
https://www.youtube.com/@serveitlocal/"
                  >
                    <img
                      alt="youtubeIcon"
                      className="socialImg"
                      src={Images.youtube}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainFooter;
