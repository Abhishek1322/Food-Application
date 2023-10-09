import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal';
import CartModalCheckout from './CartModalCheckout';



const CartModal = () => {
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  //closeModal
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };

  const handleUserProfile = (flag) => {

    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };
  return (
    <>
      <div className='usercartsection'>
      <div className='modalDetail usermodaldetail '>
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
      <div className='modalDetail usermodaldetail '>
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
          <button className='addItems'>+ Add More Items</button>
        <div className='orderNow'>
          <div className='totalPrice'>
            <h6 className='totaltxt'>Total</h6>
            <p className='price'>£44.00</p>
          </div>
          <button className='orderbutton' onClick={() => {
            handleUserProfile("cartcheckout")
          }}>CheckOut</button>
        </div>
        </div>
      </div>
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={modalDetail.flag === "cartcheckout" ? "commonWidth customContent" : ""}
        ids={modalDetail.flag === "cartcheckout" ? "cartcheckoutModal" : ""}
        child={
          modalDetail.flag === "cartcheckout" ? (
            <CartModalCheckout
              close={() => handleOnCloseModal()}
            />
          ) :
            ""
        }
        header=

        {modalDetail.flag === "cartcheckout" ?
          <>
            {<h2 className="modal_Heading">
              Cart
            </h2>}
            <p onClick={handleOnCloseModal} className='modal_cancel'>
              <img src={Images.modalCancel} className='ModalCancel' />
            </p>
          </>
          :
          ''
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  )
}

export default CartModal