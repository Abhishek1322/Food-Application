import React from 'react'
import * as Images from "../../../utilities/images";
const DeleteAccount = () => {
    return (
        <>

            <div className="deleteAccount_">
                <div className="container-fluid">
                    <div className='commonInnerHeader d-flex align-items-center mt-4 ms-3'>
                        <img src={Images.backArrowpassword} alt="logo" className="img-fluid " />
                        <p className='settingMainHeading text-align-center '> Delete Account</p>
                    </div>
                    <div className='commonheightbox_ deleteBox_'>
                        <div className="changepassword">
                            <div className='changepasswordImg d-flex justify-content-center '>
                                <img src={Images.deleteImg} alt="logo" className="img-fluid .contactusImg " />
                            </div>
                            <h6 className="settingMainText d-flex  justify-content-center">Are you sure, you want to delete
                               <br/> your account?</h6>
                            <div className="buttonBox d-flex  justify-content-center">
                                <button type="submit" role="button" className="cancelBtn">cancel</button>
                                <button type="submit" role="button" className="smallBtn">Yes, Delete</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DeleteAccount