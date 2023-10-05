import React from 'react'
import * as Images from "../../../../utilities/images";
import { Link } from "react-router-dom";


const UserMyProfile = () => {
    return (
        <>
            <div className='userprofilesection'>
                <section className="profilesection">
                    <div className="container-fluid">
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
                                            <p className="editheading">Edit profile</p>
                                        </Link>
                                <div className="profileright">
                                    {/* chefdata  */}
                                    <div className='profileinfosection'>
                                        <div className="nameprofile">
                                            <div className="firstname">
                                                <p className="dummyText p-0">First Name</p>
                                                <p className="nameheading">
                                                    Bangura
                                                </p>
                                            </div>
                                            <div className="lastname">
                                                <p className="dummyText p-0">Last Name</p>
                                                <p className="nameheading">
                                                    Serveitlocal
                                                </p>
                                            </div>
                                        </div>
                                        <div className="emailheading">
                                            <p className="dummyText p-0">Email</p>
                                            <p className="nameheading">bangura@serveitlocal.com</p>
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

export default UserMyProfile