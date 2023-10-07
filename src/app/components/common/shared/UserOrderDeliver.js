import React from 'react'
import * as Images from "../../../../utilities/images";


const UserOrderDeliver = () => {
  return (
    <>
      <div className='orderdeliversection Userordersection'>
        <div className='modalDetail '>
          <div className='usercartDetail'>
            <img src={Images.FoodIcon} className='userprofile' alt='cartImg' />
            <div className='insideModal'>
              <p className='foodtext'>Food Category</p>
              <p className='foodItem'>Chicken Salad</p>
              <p className='foodPrice'>£22.00</p>
            </div>
          </div>
          <p className='fooodquantity_'>2X</p>
        </div>
        <div className='modalDetail '>
          <div className='usercartDetail'>
            <img src={Images.FoodIcon} className='userprofile' alt='cartImg' />
            <div className='insideModal'>
              <p className='foodtext'>Food Category</p>
              <p className='foodItem'>Chicken Salad</p>
              <p className='foodPrice'>£22.00</p>
            </div>
          </div>
          <p className='fooodquantity_'>2X</p>
        </div>
        <div className='modalfooterbtn'>
          <div className='addfoodbtn'>
            <button className='foodmodalbtn modalfooddelivery'>
              <p className='orderfooterbtn'>Total Paid</p>
              <p className='orderfooterprice'>£66.00</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserOrderDeliver