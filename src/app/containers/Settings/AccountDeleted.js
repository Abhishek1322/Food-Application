import React from 'react'
import * as Images from "../../../utilities/images";
const AccountDeleted = () => {
  return (
    <>
     <div className="Login">
                <div className="container-fluid">

                    <div className='changepassword loadingpage'>
                        <div className="logRight mt-5">
                            <div className="changepasswordForm">
                                <div className='changepasswordImg d-flex justify-content-center'>
                                    <img src={Images.accountDeleted} alt="logo" className="img-fluid " />
                                </div>
                                <h6 className="accountDeleted mb-3 d-flex  justify-content-center mt-3">Account Deleted</h6>
                                <p className="accountdeletetxt mb-3 d-flex  justify-content-center mt-3">Your account has been deleted
successfully.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    </>
  ) 
}

export default AccountDeleted