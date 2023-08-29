import React,{useState} from 'react';
import * as Images from "../../../utilities/images";
import { Link } from 'react-router-dom';
import OTPInput from 'react-otp-input';

const EnterOtp = (props) => {
    const [otp, setOtp] = useState('');
    return (
        <>
            <div className="Login">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="logleft forgotIcon">
                                <figure>
                                    <img src={Images.Logo} alt="logo" className="img-fluid logo" />
                                </figure>
                                <figure className="ChefMain">
                                    <img src={Images.Chef} alt="Chef" className="img-fluid Chef" />
                                </figure>
                                <figure className="foodBox">
                                    <img src={Images.logFoodone} alt="logFood" className="img-fluid logFood" />
                                    <img src={Images.logFoodtwo} alt="logFood" className="img-fluid logFood" />
                                    <img src={Images.logFoodthree} alt="logFood" className="img-fluid logFood" />
                                    <span className="logFood">More...</span>
                                </figure>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="logRight mt-5">
                                <div className="toggleButtonMain">
                                    <div className="buttonBox">
                                        <button type="submit" role="button" className="backBtn"><i class="las la-angle-left"></i> Back to Login</button>
                                    </div>
                                </div>
                                <div className="logForm">
                                    <h6 className="mainHeading mb-3">Enter OTP</h6>
                                    <p className="subHeading">Enter the 4 digit OTP that we just sent your onyour email address.</p>
                                    <OTPInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        renderInput={(props) => <input  {...props} className="enterOtp" />}
                                    />
                                    <div className="buttonBox mt-5">
                                        <button type="submit" role="button" className="smallBtn">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EnterOtp;
