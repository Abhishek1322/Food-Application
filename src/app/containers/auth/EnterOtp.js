import React, { useState, useRef, useEffect } from "react";
import * as Images from "../../../utilities/images";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import OTPInput from "react-otp-input";
import {
  resetPasswordOtp,
  resendResetPasswordOtp,
  onErrorStopLoad,
} from "../../../redux/slices/auth";
import { useAuthSelector } from "../../../redux/selector/auth";

const EnterOtp = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastId = useRef(null);
  const authData = useAuthSelector();
  const [isLoading, setIsLoading] = useState("");
  const [otp, setOtp] = useState("");

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // submit form data
  const handleSubmit = (e, flag) => {
    e.preventDefault();
    if (!otp) {
      showToast("Please enter OTP");
      return;
    }
    setIsLoading(flag);
    let params = {
      otp: otp,
    };
    dispatch(
      resetPasswordOtp({
        ...params,
        cb(res) {
          if (res.status === 200) {
            navigate("/recover-password");
          }
        },
      })
    );
  };

  // function for resend otp
  const handleResendOtp = (e, flag) => {
    e.preventDefault();
    setIsLoading(flag);
    let params = {
      type: "forgot",
      email: authData?.userEmail?.email,
    };

    dispatch(
      resendResetPasswordOtp({
        ...params,
        cb(res) {},
      })
    );
  };

  // stop loader on page refresh
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="Login">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 pe-0">
              <div className="logleft forgotIcon Enterlock">
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
                    <Link to="/login">
                      <button type="submit" role="button" className="backBtn">
                        <i className="las la-angle-left"></i> Back to Login
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="logForm">
                  <h6 className="mainHeading mb-3">Enter OTP</h6>
                  <p className="subHeading">
                    Enter the 4 digit OTP that we just sent your onyour email
                    address.
                  </p>

                  <form onSubmit={(e) => handleSubmit(e, "submit")}>
                    <OTPInput
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
                        <Link
                          onClick={(e) => handleResendOtp(e, "resend")}
                          className="Link"
                          href="/auth/otp"
                        >
                          Resend
                        </Link>
                      )}
                    </p>

                    <div className="buttonBox mt-5">
                      <button
                        disabled={authData.loading}
                        type="submit"
                        className="smallBtn"
                      >
                        Submit
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
export default EnterOtp;
