import React from 'react'
import * as Images from "../../utilities/images"
const Notification = () => {
    return (
        <>
            <div className='settingModal'>
                <div className='Modal_'>
                    <div className='ModalHeader'>
                        <p className='ModalLogo'>Notifications</p>
                        <img src={Images.cartcancel} className=' img-fluid ModalCancel' alt='cartCancel' />
                    </div>

                </div>
                <div className='modalContent'>
                    <p className='modalclearAll text-end'>Clear All.</p>

                </div>
                <div className='notificationModal'>
                    <p className='notificationText'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <p className='notificationTime'>02:21 pm</p>

                </div>

            </div>


        </>
    )
}

export default Notification