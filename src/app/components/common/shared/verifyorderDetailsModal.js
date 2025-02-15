import React, { useState, useRef, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import OTPInput from "react-otp-input";
import {
  confirmResendOtp,
  confirmOrderOtp,
  onErrorStopLoadChef,
  confirmBookingOtp,
  confirmBookingResendOtp,
} from "../../../../redux/slices/chef";
import { useChefSelector } from "../../../../redux/selector/chef";

const VerifyorderDetailsModal = ({
  close,
  recentOrderId,
  handleGetOrderDetails,
  bookingId,
  handleGetBookingDetails,
  type,
}) => {
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const chefData = useChefSelector();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState("");

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // submit otp
  const handleSubmitOtp = (e, status) => {
    e.preventDefault();
    setIsLoading(status);
    if (!otp) {
      showToast("Please enter otp");
      return;
    }
    let params = {
      id:
        type === "order" ? recentOrderId : type === "booking" ? bookingId : "",
      otp: otp,
    };

    if (type === "order") {
      dispatch(
        confirmOrderOtp({
          ...params,
          cb(res) {
            if (res.status === 200) {
              close();
              handleGetOrderDetails();
            }
          },
        })
      );
    } else {
      dispatch(
        confirmBookingOtp({
          ...params,
          cb(res) {
            if (res.status === 200) {
              close();
              handleGetBookingDetails();
            }
          },
        })
      );
    }
  };

  // stop loader on page refresh
  useEffect(() => {
    dispatch(onErrorStopLoadChef());
  }, [dispatch]);

  // resend OTP
  const handleResendOtp = (e, status) => {
    e.preventDefault();
    setIsLoading(status);
    let params = {
      id:
        type === "order" ? recentOrderId : type === "booking" ? bookingId : "",
    };
    if (type === "order") {
      dispatch(
        confirmResendOtp({
          ...params,
          cb(res) {
            if (res?.status === 200) {
              setOtp("");
            }
          },
        })
      );
    } else {
      dispatch(
        confirmBookingResendOtp({
          ...params,
          cb(res) {
            if (res?.status === 200) {
              setOtp("");
            }
          },
        })
      );
    }
  };

  return (
    <>
      <div className="verifyOrderDetailModal mt-4">
        <img src={Images.verifyDeliveredImg} className="img-fluid" />
        <p className="accountDeleted mt-5">
          {type === "order"
            ? "Verify Order Delivery"
            : "Verify Booking Complete"}
        </p>
        <p className="accountdeletetxt ms-5 me-5 mb-4">
          Enter the OTP that we sent on customer’s email.
        </p>
        <form onSubmit={(e) => handleSubmitOtp(e, "verify")}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            placeholder="4"
            numInputs={4}
            renderInput={(props) => <input {...props} className="enterOtp" />}
          />
          <p className="mb-3 mt-4 inner_Text">
            Customer not received the OTP?{" "}
            {chefData?.loading && isLoading === "resend" ? (
              <span className="spinner-border spinner-border-sm me-1"></span>
            ) : (
              <Link
                onClick={(e) => handleResendOtp(e, "resend")}
                className="resendLink"
                href=""
              >
                <span className="insideText">Resend</span>
              </Link>
            )}
          </p>
          <div className="modalfooterbtn mb-4">
            <div className="orderItems_ flexBox ">
              <button
                type="button"
                onClick={close}
                className="cancelOrder_ me-4"
              >
                Cancel
              </button>
              <button type="submit" className="submitOrder_">
                Verify
                {chefData?.loading && isLoading === "verify" && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default VerifyorderDetailsModal;
