import React, { useState, useEffect, useRef } from "react";
import * as Images from "../../../utilities/images";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLogin, onErrorStopLoad } from "../../../redux/slices/auth";
import { useAuthSelector } from "../../../redux/selector/auth";
import { doc, setDoc } from "firebase/firestore";
import { USERPARENTCOLLECTION, db } from "../../../config/firebase-config";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastId = useRef(null);
  const authData = useAuthSelector();
  const fcmToken = localStorage.getItem("fcmToken");
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  //onchange input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  // submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) {
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
    } else if (!formData.password) {
      showToast("Please enter password");
      return;
    }
    let params = {
      password: formData.password,
      email: formData.email.trim(),
    };
    dispatch(
      userLogin({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            if (!res?.data?.data?.isVerified) {
              navigate("/verification", {
                state: {
                  userEmail: formData.email,
                },
              });
              localStorage.setItem("verification", true);
            } else if (res?.data?.data?.role === "chef") {
              if (res?.data?.data?.chefInfo?.documentVerified === "verified") {
                navigate("/home");
                handleCreateUserCollection(res?.data?.data);
              } else if (
                res?.data?.data?.chefInfo?.documentVerified === "pending" &&
                res?.data?.data?.chefInfo?.step !== "3"
              ) {
                navigate("/setup-profile");
              } else if (
                res?.data?.data?.chefInfo?.documentVerified === "pending" &&
                res?.data?.data?.chefInfo?.step === "3"
              ) {
                showToast("Please wait for admin approval");
                localStorage.removeItem("authToken");
                return;
              } else if (
                res?.data?.data?.chefInfo?.documentVerified === "rejected" &&
                res?.data?.data?.chefInfo?.step !== "3"
              ) {
                showToast(
                  "Admin rejected your document. Please upload it again."
                );
                navigate("/setup-profile");
              }
            } else if (res?.data?.data?.status === "Active") {
              navigate("/home-user");
              handleCreateUserCollection(res?.data?.data);
            }
          }
        },
      })
    );
  };

  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // Update the toggle state
  const handleToggleChange = () => {
    setIsToggleOn(!isToggleOn);
    const routeToNavigate = isToggleOn ? "/login" : "/choose-roles";
    setTimeout(() => {
      navigate(routeToNavigate);
    }, 400);
  };

  // stop loader on page refresh
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // create user cpllection in firebase
  const handleCreateUserCollection = async (USER_DATA) => {
    try {
      const full_name =
        USER_DATA?.userInfo?.firstName + " " + USER_DATA?.userInfo?.lastName;
      const roomDocRef = doc(db, USERPARENTCOLLECTION, USER_DATA?.id);
      await setDoc(roomDocRef, {
        email: USER_DATA?.email,
        fcmToken: USER_DATA?.fcmToken ? USER_DATA?.fcmToken : fcmToken,
        full_name: full_name,
        id: USER_DATA?.id,
        onlineStatus: 1,
        profile_image: USER_DATA?.userInfo?.profilePhoto
          ? USER_DATA?.userInfo?.profilePhoto
          : "",
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="Login mainPage">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="logleft">
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
              <div className="logRight mt-5">
                <div className="flexBox toggleButtonMain">
                  <h3 className="smallSubheading">Don’t have an account?</h3>
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
                        data-on="Login"
                        data-off="Sign Up"
                      ></span>
                    </label>
                  </div>
                </div>
                <div className="logForm">
                  <h6 className="mainHeading mb-3">Login</h6>
                  <p className="subHeading">Enter your login details below</p>

                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-container mt-5">
                      <input
                        type="text"
                        name="email"
                        onChange={(e) => handleChange(e)}
                        className="border-input"
                        placeholder=""
                      />
                      <label className="border-label">Email</label>
                    </div>
                    <div className="input-container mt-5">
                      <input
                        name="password"
                        onChange={(e) => handleChange(e)}
                        type="password"
                        className="border-input"
                      />
                      <label className="border-label">Password</label>
                    </div>
                    <div className="flexBox justify-content-end mt-5">
                      {/* <div className="custom-checkbox">
                        <input
                          type="checkbox"
                          id="checkbox"
                          className="checkbox-input"
                        />
                        <label
                          for="checkbox"
                          className="checkbox-label smallSubheading"
                        >
                          Keep me Logged in
                        </label>
                      </div> */}
                      <Link
                        to="/forgot-password"
                        className="coloredSmallSubheading m-0"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="buttonBox mt-5">
                      <button
                        disabled={authData.loading}
                        type="submit"
                        className="smallBtn"
                      >
                        {" "}
                        Login
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

export default Login;
