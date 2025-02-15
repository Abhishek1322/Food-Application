import React, { useState, useEffect, useRef } from "react";
import * as Images from "../../../utilities/images";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import { userSignUp, onErrorStopLoad } from "../../../redux/slices/auth";
import { useAuthSelector } from "../../../redux/selector/auth";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dialCode, setDialCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isToggleOn, setIsToggleOn] = useState(false);
  const { role } = useParams();
  const toastId = useRef(null);
  const authData = useAuthSelector();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  //onchange input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // submit form data
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
      toastId.current = showToast("Please enter valid email address");
      return;
    } else if (!phoneNumber && role === "chef") {
      showToast("Please enter phone number");
      return;
    } else if (!formData.password) {
      showToast("Please enter password");
      return;
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d.!@#$%^&*()_+]{8,}$/.test(
        formData.password
      )
    ) {
      showToast(
        "Password must be at least 8 characters long with 1 capital letter, 1 number and 1 special character"
      );
      return;
    }

    let params = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      email: formData.email.trim(),
      role: role,
      dialCode: dialCode,
      phoneNo: phoneNumber,
    };
    if (role === "user") {
      delete params.dialCode;
      delete params.phoneNo;
    }

    dispatch(
      userSignUp({
        ...params,
        cb(res) {
          if (res.status === 200) {
            navigate("/verification");
          }
        },
      })
    );
  };

  // Update the toggle state
  const handleToggleChange = () => {
    setIsToggleOn(!isToggleOn);
    const routeToNavigate = isToggleOn ? "/choose-roles" : "/login";
    setTimeout(() => {
      navigate(routeToNavigate);
    }, 400);
  };

  // stop loader on page refresh
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  const onChangePhoneNumber = (value, data) => {
    setDialCode(data.dialCode);
    let validNumber = value.slice(data.dialCode.length);
    setPhoneNumber(validNumber);
  };

  return (
    <>
      <div className="Login">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="logleft createAccount">
                <figure>
                  <Link to="/">
                    <img
                      src={Images.Logo}
                      alt="logo"
                      className="img-fluid logo"
                    />
                  </Link>
                </figure>
                <figure className="ChefMain">
                  <img
                    src={Images.Chef}
                    alt="Chef"
                    className="img-fluid Chef"
                  />
                </figure>
                <figure className="foodBox">
                  <img
                    src={Images.logFoodone}
                    alt="logFood"
                    className="img-fluid logFood"
                  />
                  <img
                    src={Images.logFoodtwo}
                    alt="logFood"
                    className="img-fluid logFood"
                  />
                  <img
                    src={Images.logFoodthree}
                    alt="logFood"
                    className="img-fluid logFood"
                  />
                  <span className="logFood">More...</span>
                </figure>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="logRight userRightimg mt-5">
                <div className="flexBox toggleButtonMain">
                  <h3 className="smallSubheading">
                    Already have an a account?
                  </h3>
                  <div className="form-group">
                    <label className="toggle">
                      <input
                        onChange={handleToggleChange}
                        checked={isToggleOn}
                        type="checkbox"
                      />
                      <span className="slider"></span>
                      <span
                        className="labels"
                        data-on="Sign Up"
                        data-off="Login"
                      ></span>
                    </label>
                  </div>
                </div>
                <div className="logForm">
                  <h6 className="mainHeading mb-3">Create Account</h6>
                  <p className="subHeading">Welcome to ServeItLocal</p>

                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="topInputfields">
                      {/* <div className="container p-0"> */}
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="input-container mt-5">
                            <input
                              type="text"
                              className="border-input"
                              placeholder=""
                              name="firstName"
                              onChange={(e) => handleChange(e)}
                            />
                            <label className="border-label">First Name</label>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="input-container mt-5">
                            <input
                              onChange={(e) => handleChange(e)}
                              type="text"
                              name="lastName"
                              className="border-input"
                            />
                            <label className="border-label">Last Name</label>
                          </div>
                        </div>
                      </div>
                      {/* </div>t */}
                    </div>

                    <div className="row">
                      <div
                        className={role === "chef" ? "col-lg-6" : "col-lg-12"}
                      >
                        <div className="input-container mt-5">
                          <input
                            onChange={(e) => handleChange(e)}
                            type="text"
                            name="email"
                            className="border-input"
                          />
                          <label className="border-label">Email</label>
                        </div>
                      </div>

                      {role === "chef" && (
                        <div className="col-lg-6">
                          <div className="input-container mt-5 phone-input-dropdown">
                            <label className="border-label">Phone</label>
                            <PhoneInput
                              className="border-input"
                              country={"us"}
                              onChange={(value, data, event, formattedValue) =>
                                onChangePhoneNumber(
                                  value,
                                  data,
                                  event,
                                  formattedValue
                                )
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-lg-12">
                      <div className="input-container mt-5">
                        <input
                          onChange={(e) => handleChange(e)}
                          type="password"
                          name="password"
                          className="border-input"
                        />
                        <label className="border-label">Password</label>
                      </div>
                    </div>
                    <div className="buttonBox mt-5">
                      <button
                        disabled={authData.loading}
                        type="submit"
                        className="smallBtn"
                      >
                        {" "}
                        Sign Up
                        {authData.loading && (
                          <span className="spinner-border spinner-border-sm ms-2"></span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
