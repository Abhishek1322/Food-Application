import React from 'react';
import * as Images from "../../../utilities/images";
const SettingMain = (props) => {
    return (
        <>
          <div className='main_Setting'>
          <div className='settingMain'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-6 '>
                            <div className='leftbox'>
                                <div className='settingBox d-flex align-items-center'>
                                    <img src={Images.password} alt="logo" className="img-fluid settingIcon " />
                                    <p className='settingBoxtxt ms-3 mb-0'>Change Password</p>
                                </div>
                                <div className='iconImg'>
                                    <img src={Images.nextIcon} alt="logo" className="img-fluid " />
                                </div>

                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='leftbox'>
                                <div className='settingBox d-flex align-items-center'>
                                    <img src={Images.termconditions} alt="logo" className="img-fluid settingIcon" />
                                    <p className='settingBoxtxt ms-3 mb-0'>Term & Condition</p>
                                </div>
                                <div className='iconImg'>
                                    <img src={Images.nextIcon} alt="logo" className="img-fluid " />
                                </div>

                            </div>
                        </div>
                        <div className='col-lg-6 '>
                            <div className='leftbox'>
                                <div className='settingBox d-flex align-items-center'>
                                    <img src={Images.settingcontactus} alt="logo" className="img-fluid settingIcon" />
                                    <p className='settingBoxtxt ms-3 mb-0'>Contact Us</p>
                                </div>
                                <div className='iconImg'>
                                    <img src={Images.nextIcon} alt="logo" className="img-fluid " />
                                </div>

                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='leftbox'>
                                <div className='settingBox d-flex align-items-center'>
                                    <img src={Images.DeleteSetting} alt="logo" className="img-fluid settingIcon " />
                                    <p className='settingBoxtxt ms-3 mb-0'>Delete Account</p>
                                </div>
                                <div className='iconImg'>
                                    <img src={Images.nextIcon} alt="logo" className="img-fluid " />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 '>
                            <div className='leftbox'>
                                <div className='settingBox d-flex align-items-center'>
                                    <img src={Images.privacypolicy} alt="logo" className="img-fluid settingIcon " />
                                    <p className='settingBoxtxt ms-3 mb-0'>Privacy Policy</p>
                                </div>
                                <div className='iconImg'>
                                    <img src={Images.nextIcon} alt="logo" className="img-fluid " />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='leftbox'>
                                <div className='settingBox d-flex align-items-center'>
                                    <img src={Images.logout} alt="logo" className="img-fluid settingIcon " />
                                    <p className='settingBoxtxt ms-3 mb-0'>Logout</p>
                                </div>
                                <div className='iconImg'>
                                    <img src={Images.nextIcon} alt="logo" className="img-fluid " />
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
export default SettingMain;
