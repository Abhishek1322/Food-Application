import React from 'react'
import * as Images from "../../../../utilities/images"

const ChefBookingDone = () => {
  return (
    <>
    <div className='chefbookdone orderplacesection paymentdonesection'>
          <img src={Images.accountDeleted} alt='accountdeletedimg' className='img-fluid' />
          <h1 className='accountDeleted mt-3'> Booking Done</h1>
          <p className='accountdeletetxt mt-2 '>Your Booking has been
            done successfully .</p>
          <div className='modalfooterbtn'>
            <div className='addfoodbtn'>
              <button className='foodmodalbtn' type='button'>
                Okay
              </button>
            </div>
            <div className="progress orderbar">
              <div className="progress-bar orderprogress" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <p className='progressheading'>59 Sec</p>
            <button className='itemsQuantity' type='button'>Cancel Booking</button>
          </div>
        </div>
    </>
  )
}

export default ChefBookingDone