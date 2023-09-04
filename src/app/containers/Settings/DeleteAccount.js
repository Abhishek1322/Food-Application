import React from 'react'
import * as Images from "../../../utilities/images";
const DeleteAccount = () => {
    return (
        <>
            <div className="Login">
                <div className="container-fluid">
                    <div className='passwordHeading d-flex align-items-center mt-4 ms-3'>
                        <img src={Images.backArrowpassword} alt="logo" className="img-fluid " />
                        <p className='changepasswordleft text-align-center '> Delete Account</p>
                    </div>
                    <div className='commonheightbox_ deleteBox_'>
                        <div className="logRight mt-5">
                            <div className="changepasswordForm">
                                <div className='changepasswordImg d-flex justify-content-center '>
                                    <img src={Images.DeleteAccount} alt="logo" className="img-fluid " />
                                </div>
                                <h6 className="changepassHeading mb-3 d-flex  justify-content-center mt-3">Are you sure, you want to delete
                                    your account?</h6>
                                    <div className="buttonBox mt-5 d-flex  justify-content-center">
                                    <button type="submit" role="button" className="cancelBtn">cancel</button>
                                     <button type="submit" role="button" className="smallBtn">Yes, Delete</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteAccount