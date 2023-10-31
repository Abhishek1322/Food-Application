import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Images from "../../../utilities/images";
import CustomModal from "./shared/CustomModal";
import BookNowModal from "./shared/BookNowModal";
import UserBellModal from "./shared/UserBellModal";
import UserNotification from "./shared/UserNotification";
import { useAuthSelector } from "../../../redux/selector/auth";
import { useDispatch } from "react-redux";
import { getUserProfileDetails } from "../../../redux/slices/web";
import { useUserSelector } from "../../../redux/selector/user";
import CartModal from "./shared/cartModal";
import { toggleSidebar } from "../../../redux/slices/auth";

const User_Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const APIkey = "";
  const authData = useAuthSelector();
  const allUserData = useUserSelector();
  const userId = localStorage.getItem("userId");
  const [key, setKey] = useState(Math.random());
  const [toggle, setToggle] = useState(true)

  const [currentLocation, setCurrentLocation] = useState();
  const [userData, setUserData] = useState([]);
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
  // open modal
  const handleUserProfile = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  // get current location
  function getLocationInfo(latitude, longitude) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status.code === 200) {
          console.log("results:", data.results);
          setCurrentLocation(data.results[0].formatted);
        } else {
          console.log("Reverse geolocation request failed.");
        }
      })
      .catch((error) => console.error(error));
  }

  // get let long
  function success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    getLocationInfo(crd.latitude, crd.longitude);
  }

  // handling error
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  // hanldle location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  // getting user profile details
  useEffect(() => {
    let params = {
      userid: userId,
    };

    dispatch(
      getUserProfileDetails({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setUserData(res.data.data);
          }
        },
      })
    );
  }, []);


  // toggle SideBar
  useEffect(() => {
    dispatch(toggleSidebar(toggle))
  }, [toggle])

  return (
    <>
      <div className="main_Setting">
        <div className="navMain">
          <div className="container-fluid p-0">
            {pathname === "/home-user" ||
              pathname === "/user-chef-home" ||
              pathname === "/user-order-home" ||
              pathname === "/setting" ? (
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  {pathname === "/home-user" ? (
                    <>
                      <h1 className="chefCommonHeader">
                        Hello,{" "}
                        <span className="chefHeading">
                          {" "}
                          {userData?.userInfo?.firstName} !
                        </span>
                      </h1>
                      <img
                        src={Images.HeaderLocation}
                        className="img-fluid"
                        alt="headerlocation"
                      />
                      <span className="ordertimeaddress ms-1">
                        New York, 10003, 2nd Street dorm
                      </span>
                    </>
                  ) : pathname === "/user-chef-home" ? (
                    <h1 className="chefCommonHeader">Chefs</h1>
                  ) : pathname === "/user-order-home" ? (
                    <h1 className="chefCommonHeader">My Orders</h1>
                  ) : pathname === "/setting" ? (
                    <h1 className="chefCommonHeader">Setting</h1>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 text-end">
                  <div className="flexBox">
                    <div className="headermenu">
                      <figure className="menuBox">
                        <img
                          src={Images.chat}
                          alt="logo"
                          className="img-fluid chatIconImage"
                          onClick={() => {
                            handleUserProfile("chatmessage");
                          }}
                        />
                      </figure>
                    </div>
                    <div className="headeritem">
                      <figure
                        className="menuBox"
                        onClick={() => {
                          setModalDetail({
                            show: true,
                            flag: "userNotification",
                          });
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
                    <div
                      onClick={() => {
                        setModalDetail({ show: true, flag: "cartModal" });
                        setKey(Math.random());
                      }}
                      className="menuBox cart"
                    >
                      <img
                        src={Images.basketImg}
                        alt="logo"
                        className="img-fluid basketImg"
                      />
                      <span className="cartItems">
                        {allUserData?.cartCount?.totalRecords
                          ? allUserData?.cartCount?.totalRecords
                          : 0}
                      </span>
                    </div>
                    <button onClick={() => setToggle(!toggle)} className="toggleSideBtn"><i className="fas fa-bars"></i></button>

                    <button
                      className="sarahmessagebtn d-none"
                      onClick={() => {
                        handleUserProfile("bookchef");
                      }}
                    >
                      <div className="booknowimg">
                        <img
                          src={Images.lightcap}
                          alt="timesquareimage"
                          className="img-fluid"
                        />
                      </div>

                      <p className="availableheading">Book Now</p>
                    </button>

                  </div>
                </div>
              </div>
            ) : pathname === "/user-myprofile" ||
              pathname === "/user-editprofile" ? (
              <div className="row align-items-center">
                <div className="col-lg-6 col-sm-12">
                  <div className="insideCommonHeader">
                    <Link
                      to={
                        pathname === "/user-myprofile"
                          ? "/home-user"
                          : "/user-myprofile"
                      }
                    >
                      <img
                        src={Images.backArrowpassword}
                        className="innerHeaderArrow"
                      />
                    </Link>

                    <h1 className="chefCommonHeader ps-2">
                      {pathname === "/user-myprofile"
                        ? "My Profile"
                        : "Edit Profile"}
                    </h1>
                  </div>
                </div>
              </div>
            ) : pathname === "/chef-details" ? (
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="insideCommonHeader">
                    <Link to="/user-chef-home">
                      <img
                        src={Images.backArrowpassword}
                        className="innerHeaderArrow"
                      />
                    </Link>
                    <h1 className="chefCommonHeader ps-2">Chef Details</h1>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 text-end">
                  <div className="flexBox">
                    <div className="headerBook">
                      <button
                        className="sarahmessagebtn"
                        onClick={() => {
                          handleUserProfile("bookchef");
                        }}
                      >
                        <div className="booknowimg">
                          <img
                            src={Images.lightcap}
                            alt="timesquareimage"
                            className="img-fluid"
                          />
                        </div>

                        <p className="availableheading">Book Now</p>
                      </button>

                    </div>
                    <button onClick={() => setToggle(!toggle)} className="toggleSideBtn"><i className="fas fa-bars"></i></button>

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
          modalDetail.flag === "chatmessage" ? "commonWidth customContent" : ""
        }
        ids={
          modalDetail.flag === "chatmessage"
            ? "chatmessagemodal"
            : modalDetail.flag === "userNotification"
              ? "userNotificationModal"
              : modalDetail.flag === "cartModal"
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
          ) : modalDetail.flag === "cartModal" ? (
            <CartModal close={() => handleOnCloseModal()} />
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
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </>
          ) : modalDetail.flag === "userNotification" ? (
            <>
              <h2 className="modal_Heading">Notification</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </>
          ) : modalDetail.flag === "cartModal" ? (
            <>
              <h2 className="modal_Heading">Cart</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </>
          ) : modalDetail.flag === "bookchef" ? (
            <>
              <div className="edithead">
                <h2 className="modal_Heading">Hire Chef</h2>
                <p className="chatUser">Enter your venue details below.</p>
              </div>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
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
