import React from 'react'
import * as Images from "../../../../utilities/images";
import { Link } from 'react-router-dom';

const UserManageAddress = () => {
    return (
        <>
            <div className='settingmanagesection'>
                <div className="contactUs">
                    <div className="container-fluid">
                        <div className='commonInnerHeader d-flex align-items-center mt-4 ms-3'>
                            <img src={Images.backArrowpassword} alt="logo" className="img-fluid innerHeaderArrow " />
                            <p className='settingMainHeading text-align-center '>Manage Address</p>
                        </div>
                        <div className='changepassword'>
                            <div className="logRight mt-5">
                                <div className="changepasswordForm">
                                    <div className='changepasswordImg d-flex justify-content-center'>
                                        <img src={Images.ManageLocation} alt="logo" className="img-fluid  contactusImg" />
                                    </div>
                                    <h6 className="settingMainText mb-3 d-flex  justify-content-center mt-3">Add New and Edit your
                                        Saved Addresses</h6>
                                    <div className='managehome'>
                                        <img src={Images.ManageHome} alt='Homeimg' className='img-fluid' />
                                        <div className='managetext'>
                                            <p className='notificationText'>Home</p>
                                            <p className='cheftext pt-1'>New York, 10003, 2nd Street dorm</p>
                                            <div class="dropdown dropleft managedrop">
                                                <img src={Images.chatsDots} className='dropdown-toggle manageimg' alt='cartcancel' data-bs-toggle="dropdown" />
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#"><img src={Images.EditImg} alt='editimage' className='img-fluid' /> <span className='editdrop'>Edit </span></a></li>
                                                    <li><a class="dropdown-item " href="#"><img src={Images.cartDelete} alt='editimage' className='img-fluid' /> <span className='editdrop'>Delete</span></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='managehome mt-3'>
                                        <img src={Images.ManageOffice} alt='Homeimg' className='img-fluid' />
                                        <div className='managetext'>
                                            <p className='notificationText'>Office</p>
                                            <p className='cheftext pt-1'>New York, 10003, 2nd Street dorm</p>
                                            <div class="dropdown dropleft managedrop">
                                            <img src={Images.chatsDots} className='dropdown-toggle manageimg' alt='cartcancel' data-bs-toggle="dropdown" />
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#"><img src={Images.EditImg} alt='editimage' className='img-fluid' /> <span className='editdrop'>Edit </span></a></li>
                                                    <li><a class="dropdown-item " href="#"><img src={Images.cartDelete} alt='editimage' className='img-fluid' /> <span className='editdrop'>Delete</span></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="#">
                                     <p className='cancelOrder'>+ Add New Address</p>
                                    </Link>
                                    <div className="buttonBox mt-5 d-flex  justify-content-center">
                                        <button type="submit" role="button" className="smallBtn">SAVE</button>
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

export default UserManageAddress