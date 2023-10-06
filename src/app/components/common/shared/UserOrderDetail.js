import React, { useState } from 'react'
import * as Images from "../../../../utilities/images";
import CustomModal from './CustomModal';
import UserOrderDeliver from './UserOrderDeliver';

const UserOrderDetail = () => {
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
      <div className='Userordersection'>
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
            <button className='foodmodalbtn modalfooddelivery' onClick={() => {
              handleUserProfile("orderdeliver")
            }}>
              <p className='orderfooterbtn'>Total Paid</p>
              <p className='orderfooterprice'>£66.00</p>
            </button>
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
        className={modalDetail.flag === "orderdeliver" ? "commonWidth customContent" : ""}
        ids={modalDetail.flag === "orderdeliver" ? "userorderdeliver" : ""}
        child={
          modalDetail.flag === "orderdeliver" ? (
            <UserOrderDeliver
              close={() => handleOnCloseModal()}
            />
          ) :
            ""
        }
        header=

        {modalDetail.flag === "orderdeliver" ?
          <>
            <div className='Common_header'>
              <div className='headerProfile'>
                <p className='headerTxt_'>Order #12548</p>
                <p className='headerInner_'>Delivered</p>
              </div>
            </div>
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

export default UserOrderDetail