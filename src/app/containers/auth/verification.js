import React, { useState } from 'react';
import * as Images from "../../../utilities/images";
import OtpInput from 'react-otp-input';


const Verification = () => {
    const [otp, setOtp] = useState('');
    return (
        <>
            <div className="Login">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="logleft verifyIcon">
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
                                        <button type="submit" role="button" className="backBtn"><i class="las la-angle-left"></i> Back</button>
                                    </div>
                                </div>
                                <div className="logForm">
                                    <h6 className="mainHeading mb-3">Verify Email</h6>
                                    <p className="subHeading mb-4">Enter the verification Code that we just sent your on your
                                        email address.</p>
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={4}
                                        // renderSeparator={<span>-</span>}
                                        renderInput={(props) => <input {...props} className="enterOtp" />}
                                    />
                                    <div className="buttonBox mt-5">
                                        <button type="submit" role="button" className="smallBtn"> Verify</button>
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

export default Verification