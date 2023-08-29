import React from 'react';
import * as Images from "../../../utilities/images";
import { Link } from 'react-router-dom';

const forgotPassword = (props) => {
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
                                    <h6 className="mainHeading mb-3">Forgot password</h6>
                                    <p className="subHeading">Enter the email address that associated with your
                                        account for Verify.</p>
                                    <div className="input-container mt-5">
                                        <input type="text" className="border-input" placeholder="bangura@serveitlocal.com" />
                                        <label className="border-label">Password</label>
                                    </div>
                                    <div className="buttonBox mt-5">
                                        <button type="submit" role="button" className="smallBtn">Continue</button>
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
export default forgotPassword;
