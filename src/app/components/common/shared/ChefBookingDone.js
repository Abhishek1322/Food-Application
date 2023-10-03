import React from 'react'
import * as Images from "../../../../utilities/images"

const ChefBookingDone = () => {
  return (
    <>
    <div className='chefbookdone'>
      <div className='orderplacesection'>
        <div className='paymentdonesection'>
          <img src={Images.accountDeleted} alt='accountdeletedimg' className='img-fluid' />
          <p className='accountDeleted mt-3'> Booking Done</p>
          <p className='accountdeletetxt mt-2 '>Your Booking has been
            done successfully .</p>
          <div className='modalfooterbtn'>
            <div className='addfoodbtn'>
              <button className='foodmodalbtn'>
                Okay
              </button>
            </div>
            <div class="progress orderbar">
              <div class="progress-bar orderprogress" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <p className='progressheading'>59 Sec</p>
            <button className='itemsQuantity'>Cancel Booking</button>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default ChefBookingDone