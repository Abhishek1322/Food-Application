import React, { useState, useEffect } from "react";
import * as Images from "../../../utilities/images";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  onErrorStopLoad,
  addContactUsDetail,
} from "../../../redux/slices/user";

const ContactUs = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });


  //onChange input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value});
  };

  // stop loader on refresh page
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="contactUs">
        <div className="container-fluid">
          <div className="commonInnerHeader d-flex align-items-center mt-4 ms-3">
            <Link to="/setting">
              <img
                src={Images.backArrowpassword}
                alt="arrowImg"
                className="img-fluid  innerHeaderArrow"
              />
            </Link>
            <h1 className="settingMainHeading text-align-center ">
              Contact Us
            </h1>
          </div>
          <div className="changepassword">
            <div className="logRight mt-5">
              <div className="changepasswordForm">
                <div className="changepasswordImg d-flex justify-content-center">
                  <img
                    src={Images.contactUs}
                    alt="contactUs"
                    className="img-fluid  contactusImg"
                  />
                </div>
                <h6 className="settingMainText mb-3 d-flex  justify-content-center mt-3">
                  We will answer your questions & problems
                </h6>

                <div className="topInputfields">
                  <div className="container p-0">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="input-container mt-5">
                          <input
                            type="text"
                            className="border-input"
                            placeholder="Enter your first name"
                            name="firstName"
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="border-label">First Name</label>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="input-container mt-5">
                          <input
                            type="text"
                            className="border-input"
                            placeholder="Enter your last name"
                            name="lastName"
                            onChange={(e) => handleChange(e)}
                          />
                          <label className="border-label">Last Name</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-container mt-5">
                    <input
                      type="text"
                      className="border-input"
                      placeholder="Enter your last email address"
                      name="email"
                      onChange={(e) => handleChange(e)}
                    />
                    <label className="border-label">Email</label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="input-container mt-5">
                    <textarea
                      placeholder="Write message..."
                      name="message"
                      onChange={(e) => handleChange(e)}
                      type="text"
                      className="border-input"
                    />
                    <label className="border-label">Your Message</label>
                  </div>
                </div>
                <div className="buttonBox mt-5 d-flex  justify-content-center">
                  <button type="submit" role="button" className="smallBtn">
                    submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
