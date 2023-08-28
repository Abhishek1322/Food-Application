import React from 'react';
import * as Images from "../../../utilities/images";
import { Link } from 'react-router-dom';


const CreateAccount = (props) => {

    return (
        <>
            <div className="Login">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="logleft createAccount">
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
                            <div className="logRight userRightimg mt-5">
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
                                    <h6 className="mainHeading mb-3">Create Account</h6>
                                    <p className="subHeading">Welcome to ServeItLocal</p>
                                <div className='topInputfields mt-5'>
                                        <div className='container p-0'>
                                            <div className='row'>
                                                <div className='col-lg-6'>
                                                  <div className='input-container'>
  <input type='text' className='border-input' placeholder='Bangura' />
                                                    <label className="border-label">First Name</label>
                                                  </div>
                                                </div>
                                                <div className='col-lg-6'>
                                                    <input type='text' className='border-input' />
                                                    <label className="border-label">Last Name</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-lg-12' >
                                    <div className="input-container mt-5">
                                        <input type="text" className="border-input" />
                                        <label className="border-label">Email</label>
                                    </div>
                                    </div>
                                    <div className='col-lg-12'>
                                    <div className="input-container mt-5">
                                        <input type="password" className="border-input" />
                                        <label className="border-label">Password</label>
                                    </div>
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

export default CreateAccount