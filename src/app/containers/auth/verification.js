import React, { useState, useEffect, useRef } from "react";
import * as Images from "../../../utilities/images";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  verifyOtp,
  onErrorStopLoad,
  resendVerifyOtp,
} from "../../../redux/slices/auth";
import { useAuthSelector } from "../../../redux/selector/auth";
import { doc, setDoc } from "firebase/firestore";
import { USERPARENTCOLLECTION, db } from "../../../config/firebase-config";

const Verification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastId = useRef(null);
  const authData = useAuthSelector();
  const [isLoading, setIsLoading] = useState("");
  const fcmToken = localStorage.getItem("fcmToken");
  const userEmail = localStorage.getItem("userEmail");
  const [otp, setOtp] = useState("");

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // submit data
  const handleSubmit = (e, flag) => {
    e.preventDefault();
    if (!otp) {
      showToast("Please enter verify OTP");
      return;
    }
    setIsLoading(flag);
    let params = {
      email: userEmail,
      otp: otp,
    };
    dispatch(
      verifyOtp({
        ...params,
        cb(res) {
          if (res.status === 200) {
            if (res.data.data.role === "chef") {
              navigate("/setup-profile");
            } else {
              navigate("/home-user");
              handleCreateUserCollection(res?.data?.data);
            }
          }
        },
      })
    );
  };

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
      console.error("Error creating room:", error);
    }
  };

  // function for resend otp
  const handleResendOtp = (e, flag) => {
    e.preventDefault();
    let params = {
      type: "verify",
      email: userEmail,
    };
    setIsLoading(flag);
    dispatch(
      resendVerifyOtp({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            setOtp("");
          }
        },
      })
    );
  };

  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="Login">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="logleft verifyIcon">
                <figure>
                  <img
                    src={Images.Logo}
                    alt="logo"
                    className="img-fluid logo"
                  />
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
                <div className="toggleButtonMain">
                  <div className="buttonBox">
                    <Link to="/create-account/:user">
                      <button type="submit" role="button" className="backBtn">
                        <i className="las la-angle-left"></i> Back
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="logForm">
                  <h6 className="mainHeading mb-3">Verify Email</h6>
                  <p className="subHeading mb-4">
                    Enter the verification Code that we just sent your on your
                    email address.
                  </p>

                  <form onSubmit={(e) => handleSubmit(e, "submit")}>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={4}
                      renderInput={(props) => (
                        <input {...props} className="enterOtp" />
                      )}
                    />

                    <p className="mb-3 mt-3">
                      Don’t Received{" "}
                      {authData.loading && isLoading === "resend" ? (
                        <span className="spinner-border spinner-border-sm ms-2"></span>
                      ) : (
                        <a
                          onClick={(e) => handleResendOtp(e, "resend")}
                          className="resendLink"
                          href="/auth/otp"
                        >
                          Resend
                        </a>
                      )}
                    </p>

                    <div className="buttonBox mt-2 m-0">
                      <button
                        disabled={authData.loading && isLoading === "submit"}
                        type="submit"
                        className="smallBtn"
                      >
                        {" "}
                        Verify
                        {authData.loading && isLoading === "submit" && (
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

export default Verification;
