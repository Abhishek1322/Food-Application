import React, { useState } from 'react';
import * as Images from "../../../utilities/images";

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState('false');
    const [password, setPassword] = useState("");
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <div className="changePaasword_">
                <div className="container-fluid">
                    <div className='commonInnerHeader d-flex align-items-center mt-4 ms-3 ' >
                        <img src={Images.backArrowpassword} alt="logo" className="img-fluid  innerHeaderArrow" />
                        <p className='settingMainHeading text-align-center'>Change Password</p>
                    </div>
                    <div className='changepassword'>
                        <div className="changepasswordForm">
                            <div className='settingsheader d-flex justify-content-center'>
                                <img src={Images.ChangepasswordImg} alt="logo" className="img-fluid " />
                            </div>
                            <h6 className="settingMainText mb-3 d-flex  justify-content-center mt-3">Create your new password.</h6>
                            <div className="input-container mt-5">
                                <input
                                    className="border-input"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label className="border-label">Old Password</label>
                                <p
                                    onClick={togglePasswordVisibility}
                                    className="password-button"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </p>
                            </div>

                            <div className="input-container mt-5">
                                <input type="text" className="border-input" />
                                <label className="border-label">New Password</label>
                            </div>
                            <div className="input-container mt-5">
                                <input type="text" className="border-input" />
                                <label className="border-label">Confirm Password</label>
                            </div>
                            <div className="buttonBox mt-5 d-flex  justify-content-center">
                                <button type="submit" role="button" className="smallBtn">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword