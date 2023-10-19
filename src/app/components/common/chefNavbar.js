import React, { useEffect, useState } from "react";
import * as Images from "../../../utilities/images";
import CustomModal from "./shared/CustomModal";
import BellModal from "./shared/bellModal";
import Notification from "./shared/notification";
import Myorder from "./shared/myorderModal";
import VerifyorderDetailsModal from "./shared/verifyorderDetailsModal";
import { Link, useLocation } from "react-router-dom";
import { useAuthSelector } from "../../../redux/selector/auth";
import { useDispatch } from "react-redux";
import {
  getChefProfileDetails,
  onErrorStopLoad,
} from "../../../redux/slices/web";

const Chef_Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const userId = localStorage.getItem("userId");
  const authData = useAuthSelector();
  const [key, setKey] = useState(Math.random());
  const [chefProfileData, setProfileData] = useState([]);
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

  // stop loader on refresh page
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // get chef data
  useEffect(() => {
    let params = {
      userid: userId,
    };
    dispatch(
      getChefProfileDetails({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setProfileData(res.data);
          }
        },
      })
    );
  }, []);

  return (
    <>
      <div className="main_Setting">
        <div className="navMain">
          <div className="container-fluid p-0">
            {pathname === "/home" ? (
              <div className="row align-items-center">
                <div className="col-lg-6 col-sm-12">
                  {/* ----Home Page Header html */}
                  <h1 className="chefCommonHeader">
                    Hello,{" "}
                    <span className="chefHeading">
                      {chefProfileData?.data?.userInfo?.firstName} !
                    </span>
                  </h1>
                  {/* ----setting Page Header  
                {/* <h1 className="chefCommonHeader">Settings</h1> */}
                  {/* ----Booking Details Page Header html  &  For after booking Details Also */}
                  {/* <div className="insideCommonHeader">
                  <img src={Images.backArrowpassword} className="innerHeaderArrow" alt="arrowHeaderImg" />
                  <h1 className="chefCommonHeader ps-2">Booking Details</h1>
                </div> */}

                  {/* Order Details Header  html */}
                  {/* <div className="insideCommonHeader">
                  <img src={Images.backArrowpassword} className="innerHeaderArrow"  alt="arrowHeaderImg" />
                  <h1 className="chefCommonHeader ps-2">Order Details</h1>
                </div>
              </div> */}
                  {/* My Profile Page header css */}
                  {/* <div className="insideCommonHeader">
                  <img src={Images.backArrowpassword} className="innerHeaderArrow"  alt="arrowHeaderImg" />
                  <h1 className="chefCommonHeader ps-2">My Profile</h1>
                </div> */}
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
                            setModalDetail({ show: true, flag: "chatBox" });
                            setKey(Math.random());
                          }}
                        />
                      </figure>
                    </div>
                    <div className="headeritem">
                      <figure
                        className="menuBox"
                        onClick={() => {
                          setModalDetail({ show: true, flag: "Notification" });
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
                        src={Images.chefnavImage}
                        alt="logo"
                        className="img-fluid basketImg"
                        onClick={() => {
                          setModalDetail({ show: true, flag: "Myorder" });
                          setKey(Math.random());
                        }}
                      />
                      <span className="cartItems">5</span>
                    </div>
                  </div>

                  {/* booking Common Header */}
                  {/* <div className='orderItems_ flexBox '>
                  <button className='cancelOrder_ me-4' >Reject</button>
                  <button className='submitOrder_'>Accept</button>
                </div> */}

                  {/* order Details Header html & order Delivered */}
                  {/* <button className="chefRightHeader m-0 text-end">Order Ready for Delivery</button> */}
                  {/* Order Delivered Html */}
                  {/* <button
                  className="chefRightHeader m-0 text-end"
                  onClick={() => {
                    handleUserProfile("verifyOrderDetailModal");
                  }}
                >
                  Order Delivered
                </button> */}
                </div>
              </div>
            ) : pathname === "/menu" ? (
              <div className="row align-items-center">
                <div className="col-lg-6 col-sm-12">
                  {/* ----Home Page Header html */}
                  <h1 className="chefCommonHeader">Menu</h1>
                  {/* ----setting Page Header  
                {/* <h1 className="chefCommonHeader">Settings</h1> */}
                  {/* ----Booking Details Page Header html  &  For after booking Details Also */}
                  {/* <div className="insideCommonHeader">
                  <img src={Images.backArrowpassword} className="innerHeaderArrow" alt="arrowHeaderImg" />
                  <h1 className="chefCommonHeader ps-2">Booking Details</h1>
                </div> */}

                  {/* Order Details Header  html */}
                  {/* <div className="insideCommonHeader">
                  <img src={Images.backArrowpassword} className="innerHeaderArrow" alt="arrowHeaderImg" />
                  <h1 className="chefCommonHeader ps-2">Order Details</h1>
                </div>
              </div> */}
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
                            setModalDetail({ show: true, flag: "chatBox" });
                            setKey(Math.random());
                          }}
                        />
                      </figure>
                    </div>
                    <div className="headeritem">
                      <figure
                        className="menuBox"
                        onClick={() => {
                          setModalDetail({ show: true, flag: "Notification" });
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
                        src={Images.chefnavImage}
                        alt="logo"
                        className="img-fluid basketImg"
                        onClick={() => {
                          setModalDetail({ show: true, flag: "Myorder" });
                          setKey(Math.random());
                        }}
                      />
                      <span className="cartItems">5</span>
                    </div>
                  </div>

                  {/* booking Common Header */}
                  {/* <div className='orderItems_ flexBox '>
                  <button className='cancelOrder_ me-4' >Reject</button>
                  <button className='submitOrder_'>Accept</button>
                </div> */}

                  {/* order Details Header html & order Delivered */}
                  {/* <button className="chefRightHeader m-0 text-end">Order Ready for Delivery</button> */}
                  {/* Order Delivered Html */}
                  {/* <button
                  className="chefRightHeader m-0 text-end"
                  onClick={() => {
                    handleUserProfile("verifyOrderDetailModal");
                  }}
                >
                  Order Delivered
                </button> */}
                </div>
              </div>
            ) : pathname === "/new-booking" ? (
              <div className="row align-items-center">
                <div className="col-lg-6 col-sm-12">
                  {/* ----Home Page Header html */}
                  <h1 className="chefCommonHeader">My Bookings</h1>
                  {/* ----setting Page Header  
                {/* <h1 className="chefCommonHeader">Settings</h1> */}
                  {/* ----Booking Details Page Header html  &  For after booking Details Also */}
                  {/* <div className="insideCommonHeader">
                  <img src={Images.backArrowpassword} className="innerHeaderArrow" alt="arrowHeaderImg" />
                  <h1 className="chefCommonHeader ps-2">Booking Details</h1>
                </div> */}

                  {/* Order Details Header  html */}
                  {/* <div className="insideCommonHeader">
                  <img src={Images.backArrowpassword} className="innerHeaderArrow" alt="arrowHeaderImg" />
                  <h1 className="chefCommonHeader ps-2">Order Details</h1>
                </div>
              </div> */}
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
                            setModalDetail({ show: true, flag: "chatBox" });
                            setKey(Math.random());
                          }}
                        />
                      </figure>
                    </div>
                    <div className="headeritem">
                      <figure
                        className="menuBox"
                        onClick={() => {
                          setModalDetail({ show: true, flag: "Notification" });
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
                        src={Images.chefnavImage}
                        alt="logo"
                        className="img-fluid basketImg"
                        onClick={() => {
                          setModalDetail({ show: true, flag: "Myorder" });
                          setKey(Math.random());
                        }}
                      />
                      <span className="cartItems">5</span>
                    </div>
                  </div>

                  {/* booking Common Header */}
                  {/* <div className='orderItems_ flexBox '>
                  <button className='cancelOrder_ me-4' >Reject</button>
                  <button className='submitOrder_'>Accept</button>
                </div> */}

                  {/* order Details Header html & order Delivered */}
                  {/* <button className="chefRightHeader m-0 text-end">Order Ready for Delivery</button> */}
                  {/* Order Delivered Html */}
                  {/* <button
                  className="chefRightHeader m-0 text-end"
                  onClick={() => {
                    handleUserProfile("verifyOrderDetailModal");
                  }}
                >
                  Order Delivered
                </button> */}
                </div>
              </div>
            ) : pathname === "/booking-details" ? (
              <div className="row align-items-center">
                <div className="col-lg-6 col-sm-12">
                  {/* ----Home Page Header html */}
                  <div className="insideCommonHeader">
                    <Link to="/new-booking">
                      <img
                        src={Images.backArrowpassword}
                        className="innerHeaderArrow"
                        alt="arrowHeaderImg"
                      />
                    </Link>
                    <h1 className="chefCommonHeader ps-2">Booking Details</h1>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 text-end">
                  <div className="orderItems_ flexBox ">
                    <button className="cancelOrder_ me-4">Reject</button>
                    <button className="submitOrder_">Accept</button>
                  </div>
                </div>
              </div>
            ) : pathname === "/setting" ? (
              <div className="row align-items-center">
                <div className="col-lg-6 col-sm-12">
                  <h1 className="chefCommonHeader">Setting</h1>
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
                            setModalDetail({ show: true, flag: "chatBox" });
                            setKey(Math.random());
                          }}
                        />
                      </figure>
                    </div>
                    <div className="headeritem">
                      <figure
                        className="menuBox"
                        onClick={() => {
                          setModalDetail({ show: true, flag: "Notification" });
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
                        src={Images.chefnavImage}
                        alt="logo"
                        className="img-fluid basketImg"
                        onClick={() => {
                          setModalDetail({ show: true, flag: "Myorder" });
                          setKey(Math.random());
                        }}
                      />
                      <span className="cartItems">5</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : pathname === "/chef-profile" ||
              pathname === "/edit-chef-profile" ? (
              <div className="row align-items-center">
                <div className="col-lg-6 col-sm-12">
                  <div className="insideCommonHeader">
                    <Link
                      to={
                        pathname === "/chef-profile" ? "/home" : "/chef-profile"
                      }
                    >
                      <img
                        src={Images.backArrowpassword}
                        className="innerHeaderArrow"
                        alt="arrowHeaderImg"
                      />
                    </Link>

                    <h1 className="chefCommonHeader ps-2">
                      {pathname === "/chef-profile"
                        ? "My Profile"
                        : "Edit Profile"}
                    </h1>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
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
          modalDetail.flag === "chatBox" ? "commonWidth customContent" : ""
        }
        ids={
          modalDetail.flag === "chatBox"
            ? "chatBox"
            : modalDetail.flag === "Notification"
            ? "Notification"
            : modalDetail.flag === "Myorder"
            ? "myOrder"
            : modalDetail.flag === "verifyOrderDetailModal"
            ? "verifyOrderDetail"
            : ""
        }
        child={
          modalDetail.flag === "chatBox" ? (
            <BellModal close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "Notification" ? (
            <Notification close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "Myorder" ? (
            <Myorder close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "verifyOrderDetailModal" ? (
            <VerifyorderDetailsModal close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "chatBox" ? (
            <>
              <h2 className="modal_Heading">Chat</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="cancelModal"
                />
              </p>
            </>
          ) : modalDetail.flag === "Notification" ? (
            <>
              <h2 className="modal_Heading">Notification</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="cancelModal"
                />
              </p>
            </>
          ) : modalDetail.flag === "Myorder" ? (
            <>
              <h2 className="modal_Heading">My Order</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="cancelModal"
                />
              </p>
            </>
          ) : modalDetail.flag === "verifyOrderDetailModal" ? (
            <>
              <div className="cancelCommonHeader">
                <p onClick={handleOnCloseModal} className="modal_cancel">
                  <img
                    src={Images.modalCancel}
                    className="ModalCancel"
                    alt="cancelModal"
                  />
                </p>
              </div>
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

export default Chef_Navbar;
