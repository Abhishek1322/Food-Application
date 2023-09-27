import React from 'react'
import * as Images from "../../../utilities/images";

const ContactUs = () => {
    return (
        <>
            <div className="contactUs">
                <div className="container-fluid">
                    <div className='commonInnerHeader d-flex align-items-center mt-4 ms-3'>
                        <img src={Images.backArrowpassword} alt="logo" className="img-fluid innerHeaderArrow " />
                        <p className='settingMainHeading text-align-center '>Contact Us</p>
                    </div>
                    <div className='changepassword'>
                        <div className="logRight mt-5">
                            <div className="changepasswordForm">
                                <div className='changepasswordImg d-flex justify-content-center'>
                                    <img src={Images.contactUs} alt="logo" className="img-fluid  contactusImg" />
                                </div>
                                <h6 className="settingMainText mb-3 d-flex  justify-content-center mt-3">We will answer your questions
                                    & problems</h6>

                                <div className='topInputfields'>
                                    <div className='container p-0'>
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <div className='input-container mt-5'>
                                                    <input type='text' className='border-input' placeholder='Bangura' />
                                                    <label className="border-label">First Name</label>
                                                </div>
                                            </div>
                                            <div className='col-lg-6'>
                                                <div className='input-container mt-5'>
                                                    <input type='text' className='border-input' placeholder='Serve' />
                                                    <label className="border-label">Last Name</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-12' >
                                    <div className="input-container mt-5">
                                        <input type="text" className="border-input" placeholder='bangura@serveitlocal.com' />
                                        <label className="border-label">Email</label>
                                    </div>
                                </div>
                                <div className='col-lg-12'>
                                    <div className="input-container mt-5">
                                        <textarea type="" className="border-input" />
                                        <label className="border-label">Your Message</label>
                                    </div>
                                </div>
                                <div className="buttonBox mt-5 d-flex  justify-content-center">
                                    <button type="submit" role="button" className="smallBtn">submit</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs