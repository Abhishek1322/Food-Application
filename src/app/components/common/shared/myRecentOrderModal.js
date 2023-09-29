import React from 'react'
import * as Images from "../../../../utilities/images"

const MyRecentOrderModal = () => {
    return (
        <>
            <div className='recentsOrder_'>
                <div className='orderProfile'>
                    <div class="profileInfo">
                        <img src={Images.userProfile} alt="logo" class="homeprofile" />
                        <div class="detailInfo">
                            <p class="userProfile">John Smith</p>
                            <p class="userInfo">Order From</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyRecentOrderModal