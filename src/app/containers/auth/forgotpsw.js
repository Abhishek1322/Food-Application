import React from 'react';
import * as Images from "../../../utilities/images";
import { Link } from 'react-router-dom';

const forgotpsw = (props)=>{
    return(
        <>
         <div className="Login mainPage">
                <div className="container-fluid">
                    <div className="row align-items-center">
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
                                    <div className="flexBox toggleButtonMain">
                                        <h3 className="smallSubheading">Don’t have an account?</h3>
                                        <div className="form-group">
                                            <label className="toggle">
                                                <input type="checkbox" />
                                                <span className="slider"></span>
                                                <span className="labels" data-on="Login" data-off=" Sign Up"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="logForm">
                                        <h6 className="mainHeading mb-3">Login</h6>
                                        <p className="subHeading">Enter your login details below</p>
                                        <div className="input-container mt-5">
                                            <input type="text" className="border-input" placeholder="bangura@serveitlocal.com" />
                                            <label className="border-label">Email</label>
                                        </div>
                                        <div className="input-container mt-5">
                                            <input type="password" className="border-input"/>
                                            <label className="border-label">Password</label>
                                        </div>
                                        <div className="flexBox justify-content-between mt-5">
                                            <div className="custom-checkbox">
                                                <input type="checkbox" id="checkbox" className="checkbox-input"/>
                                                    <label for="checkbox" className="checkbox-label smallSubheading">Keep me Logged in</label>
                                            </div>
                                            <Link className="coloredSmallSubheading m-0">Forgot Password?</Link>
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
        </>
    )
}
export default forgotpsw;
