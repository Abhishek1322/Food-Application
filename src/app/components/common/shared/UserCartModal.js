import React from 'react'
import * as Images from "../../../../utilities/images";

const UserCartModal = () => {
  return (
    <>
      <div className='usercartcheck'>
        <div className='modalDetail usermodaldetail'>
          <div className='usercartDetail'>
            <img src={Images.FoodIcon} className='userprofile' alt='cartImg' />
            <div className='insideModal'>
              <h6 className='foodtext'>Food Category</h6>
              <h5 className='foodItem'>Chicken Salad</h5>
              <h6 className='foodPrice'>£22.00</h6>
              <div className='quantity'>
                <div className='Quantiycheck'>
                  <img src={Images.minusModal} className='calQuantity' alt='minusModal' />
                </div>
                <span className='number' >01</span>
                <div className='Quantiycheck'>
                  <img src={Images.plusModal} className='calQuantity' alt='minusModal' />
                </div>

              </div>
            </div>
          </div>
          <div className='modalDelete_'>
            <img src={Images.cartDelete} className='cartDelete_' alt='cartcancel' />
          </div>
        </div>
        <div className='modalDetail usermodaldetail'>
          <div className='usercartDetail'>
            <img src={Images.FoodIcon} className='userprofile' alt='cartImg' />
            <div className='insideModal'>
              <h6 className='foodtext'>Food Category</h6>
              <h5 className='foodItem'>Chicken Salad</h5>
              <h6 className='foodPrice'>£22.00</h6>
              <div className='quantity'>
                <div className='Quantiycheck'>
                  <img src={Images.minusModal} className='calQuantity' alt='minusModal' />
                </div>
                <span className='number' >01</span>
                <div className='Quantiycheck'>
                  <img src={Images.plusModal} className='calQuantity' alt='minusModal' />
                </div>

              </div>
            </div>
          </div>
          <div className='modalDelete_'>
            <img src={Images.cartDelete} className='cartDelete_' alt='cartcancel' />
          </div>
        </div>
        <div className='modalfooterbtn'>
          <div className='outeraddItem'>
            <button className='addItems' type='button'>+ Add More Items</button>
            <div className='orderNow'>
              <div className='totalPrice'>
                <h6 className='totaltxt'>Total</h6>
                <p className='price'>£44.00</p>
              </div>
              <button className='orderbutton' type='button'>Order Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserCartModal