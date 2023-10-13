import React from "react";
import * as Images from "../../../utilities/images";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="main-div">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="commonInnerHeader d-flex align-items-center mt-4 ms-3">
                <Link to="/setting">
                  <img
                    src={Images.backArrowpassword}
                    alt="arrowImg"
                    className="img-fluid  innerHeaderArrow"
                  />
                </Link>
                <h1 className="settingMainHeading text-align-center ">
                  Privacy Policy
                </h1>
              </div>
              <div className="termAndCond">
                <div className="termcondDummy">
                  <h2 className="innerDummyHeading">What is Lorem Ipsum?</h2>
                  <p className="dummyText">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                  <p className="dummyText">
                    it is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                  </p>
                </div>
                <h3 className="condHeading">Change Password</h3>
                <p className="dummyText">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum{" "}
                </p>
                <div className="flexBox ">
                  <i class="fas fa-greater-than termcond "></i>
                  <p className="dummyText  m-0 ps-2">
                    {" "}
                    Lorem Ipsum has been the industry's standard dummy text ever
                    since.
                  </p>
                </div>
                <div className="flexBox">
                  <i class="fas fa-greater-than termcond "></i>
                  <p className="dummyText m-0 ps-2">
                    {" "}
                    When an unknown printer took a galley of type and scrambled
                    it to make a type specimen book.{" "}
                  </p>
                </div>
                <div className="flexBox">
                  <i class="fas fa-greater-than termcond "></i>
                  <p className="dummyText m-0 ps-2">
                    {" "}
                    It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially
                    unchanged.{" "}
                  </p>
                </div>
                <p className="dummyText">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
