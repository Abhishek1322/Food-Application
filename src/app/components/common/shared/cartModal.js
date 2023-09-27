import React from 'react'
import * as Images from "../../../../utilities/images"
const CartModal = () => {
  return (
    <>
      <div className='modalContent'>
        <div className='orderDelivery_'>
            <img src={Images.orderDelivery} className='orderDeliveryimg_' alt='modalImg_'/>
            <p className='Headingsmall m-0'>Verify Order Delivery</p>
            <p className='subtext_ m-0'>Enter the OTP that we sent on  customer’s email.</p>
            <p className='resendText_ m-0'> Customer not received the OTP? 
            <span className='innersendtxt_'> Resend</span></p>
            <div className='orderItems_'>
              <button className='cancelOrder_'>Cancel</button>
              <button className='submitOrder_'>Submit</button>
            </div>
       </div>



























        {/* <div className='modalDetail '>
          <div className='usercartDetail'>
            <img src={Images.userProfile} className='userprofile' alt='cartImg' />
            <div className='insideModal'>
              <p className='foodtext'>Food Category</p>
              <p className='foodItem'>Chicken Salad</p>
              <p className='foodPrice'>£22.00</p>
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
        <div className='modalDetail '>
          <div className='usercartDetail'>
            <img src={Images.userProfile} className='userprofile' alt='cartImg' />
            <div className='insideModal'>
              <p className='foodtext'>Food Category</p>
              <p className='foodItem'>Chicken Salad</p>
              <p className='foodPrice'>£22.00</p>
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
          <div className='cartcancel'>
            <img src={Images.cartDelete} className='ModalCancel' alt='cartcancel' />
          </div>
        </div>
        <div className='outeraddItem'>
          <button className='addItems'>+ Add More Items</button>
        </div>
        <div className='orderNow'>
          <div className='totalPrice'>
            <p className='totaltxt'>Total</p>
            <p className='price'>£44.00</p>
          </div>
          <button className='orderbutton'>CheckOut</button>

        </div> */}
      </div>


    </>
  )
}

export default CartModal