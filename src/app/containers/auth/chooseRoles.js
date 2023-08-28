import React from 'react';
import * as Images from "../../../utilities/images";


const ChooseRoles = () => {

    return (
        <>
            <div className="Login">
                <div className="container-fluid">
                    <div className='flexBox justify-content-between pt-4'>
                        <figure>
                            <img src={Images.Logo} alt="logo" className="img-fluid logo m-0" />
                        </figure>
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
                    </div>
                    <div className='chooseroleBox'>
                        <div className='row justify-content-center'>
                            <div className='col-lg-2'>
                                <div className='roleBox'>
                                    <figure>
                                        <img src={Images.RoleUser} alt='RoleChef' className='img-fluid RoleChef' />
                                    </figure>
                                    <h5>Continue As a User</h5>
                                    <figure>
                                        <img src={Images.ChooseRoleIcon} alt='ChooseRoleIcon' className='img-fluid ChooseRoleIcon' />
                                    </figure>
                                </div>
                            </div>
                            <div className='col-lg-2'>
                                <div className='roleBox'>
                                    <figure>
                                        <img src={Images.RoleChef} alt='RoleChef' className='img-fluid RoleChef' />
                                    </figure>
                                    <h5>Continue As a Chef</h5>
                                    <figure>
                                        <img src={Images.ChooseRoleIcon } alt='ChooseRoleIcon' className='img-fluid ChooseRoleIcon' />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChooseRoles