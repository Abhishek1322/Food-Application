import React from 'react'
// import * as Images from "../../../utilities/images";
import * as Images from "../../utilities/images"


const Cart = () => {
    return (
        <>
            <div className='settingModal'>
                <div className='Modal_'>
                    <div className='ModalHeader'>
                        <p className='ModalLogo'>Cart</p>
                        <img src={Images.cartcancel} className=' img-fluid ModalCancel' alt='cartCancel' />
                    </div>
                   
                </div>
               <div className='modalContent'>
               <div className='modalDetail d-flex'>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg'/>
                        <div className='insideModal'>
                            <p className='foodtext'>Food Category</p>
                            <p className='foodItem'>Chicken Salad</p>
                            <p className='foodPrice'>£22.00</p>
                            <div className='quantity'>quantity</div>
                        </div>
                      <div className='cartcancel'>
                      <img src={Images.cartDelete} className='ModalCancel' alt='cartcancel'/>
                      </div>

                    </div>
                    <div className='modalDetail d-flex mt-3'>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg'/>
                        <div className='insideModal'>
                            <p className='foodtext'>Food Category</p>
                            <p className='foodItem'>Chicken Salad</p>
                            <p className='foodPrice'>£22.00</p>
                            <div className='quantity'>quantity</div>
                        </div>
                      <div className='cartcancel'>
                      <img src={Images.cartDelete} className='ModalCancel' alt='cartcancel'/>
                      </div>

                    </div>
                    <button className='addItems'>+ Add More Items</button>
                    <div className='orderNow'>
                        <div className='totalPrice'>
                           <p className='totaltxt'>Total</p>
                           <p className='price'>£44.00</p>
                        </div>
                        <button className='orderbutton'>Order Now</button>
                        
                    </div>
               </div>
              
            </div>


        </>

    )
}

export default Cart