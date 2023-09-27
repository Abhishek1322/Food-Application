import React from 'react'
import * as Images from "../../../../utilities/images";

const editProfile = () => {
    return (
        <>
            <section className='editsection'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-5 col-md-12'>
                            <div className='editleft'>
                                <img src={Images.chefProfile} alt='chefProfileimg' className='chefprofileimg' />
                                <img src={Images.editProfile} alt='editprofileimg' className='editprofileimg' />
                            </div>
                        </div>
                        <div className='col-lg-7 col-md-12'>
                            <div className='editright'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className='input-container mt-5'>
                                                <input type='text' className='border-input' placeholder='Sarah ' />
                                                <label className="border-label">First Name</label>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='input-container mt-5'>
                                                <input type='text' className='border-input' placeholder='Bergstrom' />
                                                <label className="border-label">Last Name</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-12' >
                                            <div className="input-container mt-5">
                                                <input type="text" className="border-input" placeholder='bangura@serveitlocal.com' />
                                                <label className="border-label">Email</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className='input-container mt-5'>
                                                <div className='border-box'>
                                                    <div className='restroform'>
                                                        <p className='totalPaid '>Restaurant</p>
                                                        <img src={Images.lightinfo} alt='lightinfoimg' className='img-fluid' />
                                                    </div>
                                                    <p className='restrohome'>Home</p>
                                                    <img src={Images.chefType} />
                                                </div>
                                                <div className="border-label">First Name</div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className='input-container mt-5'>
                                                <input type='text' className='border-input' placeholder='Bergstrom' />
                                                <label className="border-label">Last Name</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-12' >
                                            <div className="input-container mt-5">
                                                <input type="text" className="border-input" placeholder='bangura@serveitlocal.com' />
                                                <label className="border-label">Address</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-12' >
                                            <div className="input-container mt-5">
                                                <textarea className="border-input" rows="3">It is a long established fact that a reader will
                                                    be distracted by the readable content of a
                                                    page when looking at its layout.</textarea>
                                                <label className="border-label">Bio</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttonBox mt-5">
                                        <button type="submit" role="button" className="smallBtn"> Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default editProfile