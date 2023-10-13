import React, { useState, useRef, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { useNavigate , Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import OTPInput from "react-otp-input";
import { resetPasswordOtp, resendResetPasswordOtp, onErrorStopLoad } from "../../../../redux/slices/auth";
import { useAuthSelector } from "../../../../redux/selector/auth";

const VerifyorderDetailsModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toastId = useRef(null);
    const authData = useAuthSelector();

    const [otp, setOtp] = useState("");

    // show only one toast at one time
    const showToast = (msg) => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.error(msg);
        }
    };

    // submit form data
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!otp) {
            showToast("Please enter OTP");
            return;
        }
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
    const handleResendOtp = (e) => {
        e.preventDefault();

        let params = {
            type: "forgot",
            email: authData?.userEmail?.email,
        };

        dispatch(
            resendResetPasswordOtp({
                ...params,
                cb(res) { },
            })
        );
    };
    // stop loader on page refresh
    useEffect(() => {
        dispatch(onErrorStopLoad());
    }, [dispatch]);
    return (
        <>
            <div className='verifyOrderDetailModal mt-4'>
                <img src={Images.verifyDeliveredImg} className='img-fluid' />
                <p className='accountDeleted mt-5'>Verify Order Delivery</p>
                <p className='accountdeletetxt ms-5 me-5 mb-4'>Enter the OTP that we sent on  customer’s email.</p>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        placeholder="8"
                        numInputs={4}
                        renderInput={(props) => (
                            <input {...props} className="enterOtp"/>
                        )}
                    />
                    <p className="mb-3 mt-4 inner_Text">
                    Customer not received the OTP?{" "}
                        <Link
                            onClick={(e) => handleResendOtp(e)}
                            className="resendLink"
                            href="/auth/otp"
                        >
                          <span className="insideText">Resend</span>
                        </Link>{" "}
                    </p>
                </form>
                <div className='modalfooterbtn mb-4'>
                    <div className='orderItems_ flexBox '>
                        <button className='cancelOrder_ me-4' >Cancel</button>
                        <button className='submitOrder_'>Verify</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyorderDetailsModal