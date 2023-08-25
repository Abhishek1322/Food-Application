import React from "react";
import * as Images from "../../../utilities/images";

const Login = (props) => {

    return (
        <>
            <div className="Login">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="logleft">
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
                                <div className="container">
                                    <div className="flexBox justify-content-end">
                                        <h3 className="smallSubheading">Don’t have an account?</h3>
                                        <div class="form-group">
                                            <label class="toggle">
                                                <input type="checkbox" />
                                                <span class="slider"></span>
                                                <span class="labels" data-on="Login" data-off=" Sign Up"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="logForm">
                                        <h6 className="mainHeading mb-3">Login</h6>
                                        <p className="subHeading">Enter your login details below</p>
                                        <div class="input-container mt-5">
                                            <input type="text" class="border-input" placeholder="bangura@serveitlocal.com" />
                                            <label class="border-label">Email</label>
                                        </div>
                                        <div class="input-container mt-5">
                                            <input type="password" class="border-input"/>
                                            <label class="border-label">Password</label>
                                        </div>
                                        <div className="flexBox justify-content-between mt-5">
                                            <div class="custom-checkbox">
                                                <input type="checkbox" id="checkbox" class="checkbox-input"/>
                                                    <label for="checkbox" class="checkbox-label smallSubheading">Keep me Logged in</label>
                                            </div>
                                            <p className="coloredSmallSubheading m-0">Forgot Password?</p>
                                        </div>
                                        <div className="buttonBox mt-5">
                                            <button type="submit" role="button" className="smallBtn"> Login</button>
                                        </div>
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

export default Login;