import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Images from "../../../utilities/images";
import CustomModal from "./shared/CustomModal";
import UserCartModal from "./shared/UserCartModal";
import BookNowModal from "./shared/BookNowModal";
import UserBellModal from "./shared/UserBellModal";
import UserNotification from "./shared/UserNotification";

const User_Navbar = () => {
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
      <div className="main_Setting">
        <div className="navMain">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6 col-sm-12">
                <p className="settingtxt">Page Name</p>
              </div>
              <div className="col-lg-6 col-sm-12 text-end">
                <div className="flexBox">
                  <div className="headermenu">
                    <figure className="menuBox">
                      <img
                        src={Images.chat}
                        alt="logo"
                        className="img-fluid chatIconImage"
                        onClick={() => {
                          handleUserProfile("chatmessage")
                        }}
                      />
                    </figure>
                  </div>
                  <div className="headeritem">
                    <figure
                      className="menuBox"
                      onClick={() => {
                        setModalDetail({ show: true, flag: "userNotification" });
                        setKey(Math.random());
                      }}
                    >
                      <img
                        src={Images.bellImage}
                        alt="logo"
                        className="img-fluid chatIconImage"
                      />
                    </figure>
                  </div>
                  <div className="menuBox cart">
                    <img
                      src={Images.basketImg}
                      alt="logo"
                      className="img-fluid basketImg"
                      onClick={() => {
                        setModalDetail({ show: true, flag: "Usercart" });
                        setKey(Math.random());
                      }}
                    />
                    <span className="cartItems">0</span>
                  </div>
                  <button className='sarahmessagebtn' onClick={() => {
                    handleUserProfile("bookchef")
                  }}>
                    <div className="booknowimg"><img src={Images.lightcap} alt='timesquareimage' className='img-fluid' /></div>

                    <p className='availableheading'>Book Now</p>
                  </button>
                </div>
              </div>
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
        className={
          modalDetail.flag === "chatmessage" ? "commonWidth customContent" : ""
        }
        ids={
          modalDetail.flag === "chatmessage"
            ? "chatmessagemodal"
            : modalDetail.flag === "userNotification"
              ? "userNotificationModal"
              : modalDetail.flag === "Usercart"
                ? "usercartmodal"
                : modalDetail.flag === "bookchef"
                  ? "bookchefmodal"
                  : ""
        }
        child={
          modalDetail.flag === "chatmessage" ? (
            <UserBellModal close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "userNotification" ? (
            <UserNotification close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "Usercart" ? (
            <UserCartModal
              close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "bookchef" ? (
            <BookNowModal close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "chatmessage" ? (
            <>
              <h2 className="modal_Heading">Chat</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img src={Images.modalCancel} className="ModalCancel" />
              </p>
            </>
          ) : modalDetail.flag === "userNotification" ? (
            <>
              <h2 className="modal_Heading">Notification</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img src={Images.modalCancel} className="ModalCancel" />
              </p>
            </>
          ) : modalDetail.flag === "Usercart" ? (
            <>
              <h2 className="modal_Heading">Cart</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img src={Images.modalCancel} className="ModalCancel" />
              </p>
            </>
          ) : modalDetail.flag === "bookchef" ? (
            <>
              <div className='edithead'>
                <h2 className="modal_Heading">
                  Hire Chef
                </h2>
                <p className='chatUser'>Enter your venue details below.</p>
              </div>
              <p onClick={handleOnCloseModal} className='modal_cancel'>
                <img src={Images.modalCancel} className='ModalCancel' />
              </p>
            </>
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default User_Navbar;
