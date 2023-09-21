import React, { useState } from 'react';
import * as Images from "../../../utilities/images";
import { Link } from 'react-router-dom';
const Recoverpassword = (props) => {
    const [showPassword, setShowPassword] = useState('false');
    const [password, setPassword] = useState("");
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
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
                                    <h6 className="mainHeading mb-3">Recover Password</h6>
                                    <p className="subHeading">Create your new password here.</p>
                                    <div className="input-container mt-5">
                                        <input
                                            className="border-input"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}

                                        />
                                        <label className="border-label">New Password </label>
                                        <p
                                            onClick={togglePasswordVisibility}
                                            className="password-button"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </p>
                                    </div>

                                    <div className="input-container mt-5">
                                        <input type="text" className="border-input" />
                                        <label className="border-label">Confirm Password</label>
                                    </div>
                                    <div className="buttonBox mt-5">
                                        <button type="submit" role="button" className="smallBtn">Reset Password</button>
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
export default Recoverpassword;
