import React from 'react'
import * as Images from "../../../../utilities/images";
import { Link } from "react-router-dom";


const UserMyProfile = () => {
    return (
        <>
            <div className='userprofilesection profilesection'>
                    <div className="row">
                        <div className="col-lg-5 col-md-12">
                            {/* left section  */}
                            <div className="profileleft">
                                <img
                                    src={Images.UserEditProfile}
                                    alt="chefProfileimg"
                                    className="chefprofileimg"
                                />
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-12">
                            {/* right section  */}
                            <Link to="/edit-chef-profile" className='d-flex justify-content-end'>
                                <img
                                    src={Images.edit}
                                    alt="editimage"
                                    className="img-fluid"
                                />
                                <h6 className="editheading">Edit profile</h6>
                            </Link>
                            <div className="profileright">
                                {/* chefdata  */}
                                <div className='profileinfosection'>
                                    <div className="nameprofile">
                                        <div className="firstname">
                                            <h6 className="dummyText p-0">First Name</h6>
                                            <h4 className="nameheading">
                                                Bangura
                                            </h4>
                                        </div>
                                        <div className="lastname">
                                            <h6 className="dummyText p-0">Last Name</h6>
                                            <h4 className="nameheading">
                                                Serveitlocal
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="emailheading">
                                        <h6 className="dummyText p-0">Email</h6>
                                        <h4 className="nameheading">bangura@serveitlocal.com</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default UserMyProfile