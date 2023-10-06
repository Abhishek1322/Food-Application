import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { Link } from "react-router-dom";
import { getUserProfileDetails } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";


const UserEditProfile = () => {
    return (
        <>
            <div className='userEditprofileSection'>
                <section className="editsection">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-lg-5 col-md-12">
                                <div className="editleft">
                                    <img
                                        src={Images.UserEditProfile}
                                        alt="chefProfileimg"
                                        className="chefprofileimg"
                                    />
                                    <img
                                        src={Images.editProfile}
                                        alt="editprofileimg"
                                        className="editprofileimg"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-12">
                                <div className="editright">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="input-container mt-5">
                                                    <input
                                                        type="text"
                                                        value="Bangura"
                                                        className="border-input"
                                                        placeholder="Sarah "
                                                    />
                                                    <label className="border-label">First Name</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                        <div className="col-lg-12">
                                                <div className="input-container mt-5">
                                                    <input
                                                        type="text"
                                                        value="Serveitlocal"
                                                        className="border-input"
                                                        placeholder="Bergstrom"
                                                    />
                                                    <label className="border-label">Last Name</label>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="buttonBox mt-5">
                                            <button type="submit" role="button" className="smallBtn">
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default UserEditProfile