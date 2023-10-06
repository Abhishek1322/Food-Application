import React from 'react'
import * as Images from "../../../../utilities/images"


const UserDeleteChat = () => {
  return (
    <>
      <div className='deletesection paymentdonesection'>
          <img src={Images.DeleteModal} alt='accountdeletedimg' className='img-fluid' />
          <p className='accountDeleted mt-3'>Delete Chat</p>
          <p className='accountdeletetxt mt-2 '>Are you sure, you want to delete this chat?</p>
          <div className='modalfooterbtn'>
            <div className='orderItems'>
              <button className='cancelOrder'>CANCEL</button>
              <button className='acceptOrder'>ACCEPT</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default UserDeleteChat