import React, { useEffect, useState } from "react";
import * as Images from "../../../utilities/images";
import CustomModal from "./shared/CustomModal";
import BellModal from "./shared/bellModal";
import Myorder from "./shared/myorderModal";
import VerifyorderDetailsModal from "./shared/verifyorderDetailsModal";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onErrorStopLoad, userProfileDataGet } from "../../../redux/slices/web";
import { useChefSelector } from "../../../redux/selector/chef";
import { useAuthSelector } from "../../../redux/selector/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { PARENTCOLLECTIONNAME, db } from "../../../config/firebase-config";
import UserNotification from "./shared/UserNotification";
import { getCartNotificationCount } from "../../../redux/slices/user";
import { getBankDetails } from "../../../redux/slices/auth";

const Chef_Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const authData = useAuthSelector();
  const chefSelector = useChefSelector();
  const { success } = chefSelector;
  const { pathname } = location;
  const { search } = location;
  const userId = localStorage.getItem("userId");
  const [key, setKey] = useState(Math.random());
  const [allChats, setAllChats] = useState([]);
  const [chefProfileData, setProfileData] = useState([]);
  const [notificationCart, setNotificationCart] = useState([]);
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

  const handleOpenModal = (flag) => {
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
      userProfileDataGet({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setProfileData(res.data);
          }
        },
      })
    );
    handleGetAllChats();
  }, []);

  // get all chats
  const handleGetAllChats = () => {
    const allMessageQuery = query(collection(db, PARENTCOLLECTIONNAME));
    onSnapshot(allMessageQuery, (snap) => {
      const messagesList = snap.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });
      const reversedMessagesList = messagesList.slice().reverse();
      const getMyChats = reversedMessagesList?.filter((item, index) => {
        return item?.id?.includes(authData?.userInfo?.id);
      });
      const getUnseenMessages = getMyChats?.find((item) => {
        return (
          item?.unseenMessageCount > 0 &&
          item?.lastMessage?.senderId !== authData?.userInfo?.id
        );
      });
      setAllChats(getUnseenMessages);
    });
  };

  // get all notifications
  const handleGetAllNotifications = () => {
    dispatch(
      getCartNotificationCount({
        cb(res) {
          if (res.status === 200) {
            setNotificationCart(res?.data?.data);
          }
        },
      })
    );
  };

  // // get all notifications
  useEffect(() => {
    handleGetAllNotifications();
  }, [success]);

  // get bank details
  useEffect(() => {
    dispatch(getBankDetails());
  }, []);
  
  return (
    <>
      <div className="main_Setting">
        <div className="navMain">
          <div className="container-fluid p-0">
            {pathname === "/home" ||
            pathname === "/menu" ||
            pathname === "/new-booking" ||
            pathname === "/recent-orders" ||
            pathname === "/setting" ? (
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6">
                  {/* ----Home Page Header html */}
                  {pathname === "/home" ? (
                    <>
                      <h1 className="chefCommonHeader">
                        Hello,{" "}
                        <span className="chefHeading">
                          {chefProfileData?.data?.userInfo?.firstName} !
                        </span>
                      </h1>
                      <div className="d-flex align-items-start gap-1">
                        <img
                          src={Images.HeaderLocation}
                          className="img-fluid"
                          alt="headerlocation"
                        />
                        <span className="ordertimeaddress ms-1">
                          {chefProfileData?.data?.chefInfo?.address}
                        </span>
                      </div>
                    </>
                  ) : pathname === "/menu" ? (
                    <h1 className="chefCommonHeader">Menu</h1>
                  ) : pathname === "/new-booking" ? (
                    <h1 className="chefCommonHeader">My Bookings</h1>
                  ) : pathname === "/setting" ? (
                    <h1 className="chefCommonHeader">Setting</h1>
                  ) : pathname === "/recent-orders" ? (
                    <h1 className="chefCommonHeader">Recent Orders</h1>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-lg-6 col-md-6 text-end">
                  <div className="flexBox">
                    <div
                      className={
                        allChats && allChats !== undefined ? "headermenu" : ""
                      }
                    >
                      <figure className="menuBox">
                        <img
                          src={Images.chat}
                          alt="logo"
                          className="img-fluid chatIconImage"
                          onClick={() => {
                            handleOpenModal("chatBox");
                          }}
                        />
                      </figure>
                    </div>
                    <div
                      className={
                        notificationCart?.notificationCount > 0
                          ? "headeritem"
                          : ""
                      }
                    >
                      <figure
                        className="menuBox"
                        onClick={() => {
                          handleOpenModal("Notification");
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
                          handleOpenModal("Myorder");
                        }}
                      />
                      <span className="cartItems">
                        {notificationCart?.orderCount || 0}
                      </span>
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
            <UserNotification
              updateNotification={handleGetAllNotifications}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "Myorder" ? (
            <Myorder
              updateNotification={handleGetAllNotifications}
              close={() => handleOnCloseModal()}
            />
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
