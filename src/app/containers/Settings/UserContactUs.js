import React, { useState, useEffect, useRef } from "react";
import * as Images from "../../../utilities/images";
import { useDispatch } from "react-redux";
import {
  onErrorStopLoad,
  addContactUsDetail,
} from "../../../redux/slices/user";
import { toast } from "react-toastify";
import { useUserSelector } from "../../../redux/selector/user";

const UserContactUs = () => {
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const userSelector = useUserSelector();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  //onChange input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // stop loader on refresh page
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // submit contact details
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName) {
      showToast("Please enter first name");
      return;
    } else if (!formData.lastName) {
      showToast("Please enter last name");
      return;
    } else if (!formData.email) {
      showToast("Please enter email");
      return;
    } else if (
      formData.email &&
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        formData.email
      )
    ) {
      showToast("Please enter valid email address");
      return;
    } else if (!formData.message) {
      showToast("Please enter your message");
      return;
    }

    let params = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message,
    };

    dispatch(
      addContactUsDetail({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              message: "",
            });
          }
        },
      })
    );
  };

  return (
    <>
      <div className="changepasswordbox_">
        <h1 className="settingMainHeading text-align-center ">Contact Us!</h1>
        <div className="logRight mt-4">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="changepasswordForm">
              <div className="changepasswordImg d-flex justify-content-center">
                <img
                  src={Images.callImg}
                  alt="contactUs"
                  className="img-fluid"
                />
              </div>
              <h2 className="settingMainText mb-3 d-flex  justify-content-center mt-3">
                We will answer your questions & problems
              </h2>

              <div className="topInputfields">
                <div className="container-fluid p-0">
                  <div className="row">
                    <div className="col-lg-4 col-md-4">
                      <div className="input-container mt-5">
                        <input
                          type="text"
                          className="border-input"
                          placeholder="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange(e)}
                        />
                        <label className="border-label">First Name</label>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="input-container mt-5">
                        <input
                          type="text"
                          className="border-input"
                          placeholder="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange(e)}
                        />
                        <label className="border-label">Last Name</label>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="input-container mt-5">
                        <input
                          type="text"
                          className="border-input"
                          placeholder="Email Address"
                          name="email"
                          value={formData.email}
                          onChange={(e) => handleChange(e)}
                        />
                        <label className="border-label">Email</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="input-container mt-5">
                  <textarea
                    rows="3"
                    placeholder="Write message..."
                    name="message"
                    onChange={(e) => handleChange(e)}
                    type="text"
                    value={formData.message}
                    className="border-input"
                  />
                  <label className="border-label">Your Message</label>
                </div>
              </div>
              <div className="d-flex  justify-content-center mb-0 mt-4">
                <button
                  disabled={userSelector?.loading}
                  type="submit"
                  role="button"
                  className="smallBtn"
                >
                  SUBMIT
                  {userSelector?.loading && (
                    <span className="spinner-border spinner-border-sm me-1"></span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserContactUs;
