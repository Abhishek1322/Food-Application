import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getBookingDetail,
  onErrorStopLoadChef,
  acceptBooking,
} from "../../../../redux/slices/chef";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useChefSelector } from "../../../../redux/selector/chef";
import CustomModal from "../../../components/common/shared/CustomModal";
import ChatWithChefModal from "../../../components/common/shared/chatWithChefModal";
import ReportchatDropModal from "../../../components/common/shared/reportchatDropModal";
import UserDeleteChat from "../../../components/common/shared/UserDeleteChat";
import { collection, onSnapshot, query } from "firebase/firestore";
import { PARENTCOLLECTIONNAME, db } from "../../../../config/firebase-config";
import { useAuthSelector } from "../../../../redux/selector/auth";
import VerifyorderDetailsModal from "../../../components/common/shared/verifyorderDetailsModal";

const BookingDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authData = useAuthSelector();
  const chefReducer = useChefSelector();
  const { search, state } = location;
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get("id");
  const [bookingDetails, setBookingDetails] = useState([]);
  const [isLoading, setIsloading] = useState("");
  const [key, setKey] = useState(Math.random());
  const [allChats, setAllChats] = useState([]);
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoadChef());
  }, [dispatch]);

  // get booking details
  const handleGetBookingDetails = () => {
    let params = {
      id: id,
    };
    dispatch(
      getBookingDetail({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setBookingDetails(res?.data?.data);
          }
        },
      })
    );
  };

  // get booking details and  get all chats
  useEffect(() => {
    const parentCollectionChat = query(collection(db, PARENTCOLLECTIONNAME));
    const unsubscribe = onSnapshot(parentCollectionChat, (snap) => {
      const messagesList = snap.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });
      const getMyChats = messagesList?.filter((item) => {
        return item?.id?.includes(authData?.userInfo?.id);
      });
      setAllChats(getMyChats);
    });
    handleGetBookingDetails();
    return () => unsubscribe;
  }, []);

  // accept bookings requests
  const handleAcceptOrderBookings = (e, status) => {
    setIsloading(status);
    let params = {
      id: id,
      status: status,
    };
    dispatch(
      acceptBooking({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleGetBookingDetails();
          }
        },
      })
    );
  };

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
  const handleOpenModal = (flag, id) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  return (
    <>
      <div className="mainchef_">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-12">
            <div className="insideCommonHeader d-flex">
              <Link to={state || "/home"} className="d-flex">
                <img
                  src={Images.backArrowpassword}
                  className="innerHeaderArrow"
                  alt="arrowHeaderImg"
                />
                <h1 className="chefCommonHeader ps-2">Booking Details</h1>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 d-flex justify-content-end">
            {bookingDetails?.status === "pending" ? (
              <div className="orderItems_ flexBox ">
                <button
                  onClick={(e) => handleAcceptOrderBookings(e, "cancelled")}
                  className="cancelOrder_ me-4 w-0"
                >
                  Reject
                  {chefReducer?.loading && isLoading === "cancelled" && (
                    <span className="spinner-border spinner-border-sm ms-1"></span>
                  )}
                </button>
                <button
                  onClick={(e) => handleAcceptOrderBookings(e, "accepted")}
                  className="submitOrder_"
                >
                  {" "}
                  Accept
                  {chefReducer?.loading && isLoading === "accepted" && (
                    <span className="spinner-border spinner-border-sm ms-1"></span>
                  )}
                </button>
              </div>
            ) : bookingDetails?.status === "accepted" ? (
              <button
                onClick={(e) => handleAcceptOrderBookings(e, "reached")}
                className="cancelOrder_ me-4 w-0"
              >
                Reached
                {chefReducer?.loading && isLoading === "reached" && (
                  <span className="spinner-border spinner-border-sm ms-1"></span>
                )}
              </button>
            ) : bookingDetails?.status === "reached" ? (
              <button
                onClick={() => handleOpenModal("bookingVerify")}
                className="cancelOrder_ me-4 w-0"
              >
                Booking Complete
                {chefReducer?.loading && isLoading === "completed" && (
                  <span className="spinner-border spinner-border-sm ms-1"></span>
                )}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="BookingDetails">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="chefJohn">
                  <div className="chatWithChef">
                    <div className="chefjohnDetail">
                      <img
                        src={
                          bookingDetails?.userId?.userInfo?.profilePhoto
                            ? bookingDetails?.userId?.userInfo?.profilePhoto
                            : Images.dummyProfile
                        }
                        alt="profile"
                        className="chefJohnImg"
                      />
                      <div className="chefinfo">
                        <h2 className="johnExplorer">
                          {bookingDetails?.userId?.userInfo?.firstName}{" "}
                          {bookingDetails?.userId?.userInfo?.lastName}
                        </h2>
                        <div className="johnChatTime mt-3">
                          <div className="chefInfo">
                            <img
                              src={Images.chefCalender}
                              alt="calender"
                              className="chefInfo_"
                            />
                          </div>
                          <div className="johnchatdetail">
                            <h5 className="chatDates">
                              {" "}
                              {moment(bookingDetails?.createdAt).format(
                                "MMM D, YYYY"
                              )}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <button
                    onClick={() => {
                      handleOpenModal("chatAboutOrder");
                    }}
                    className="sarahmessagebtn flexBox"
                    type="button"
                  >
                    <img
                      src={Images.ChefChat}
                      alt="timesquareimage"
                      className="availableimg"
                    />
                    <span className="availableheading">Chat</span>
                  </button> */}
                </div>
                <div className="venuDetail">
                  <div className="venuHere">
                    <h4 className="venuInfo">Venue Date</h4>
                    <p className="venushedule">
                      {moment(bookingDetails?.date, "DD-MM-YYYY")?.format(
                        "MMM DD, YYYY"
                      )}
                    </p>
                  </div>
                  <div className="venuHere venuThere">
                    <h4 className="venuInfo">Venue Time</h4>
                    {bookingDetails?.slots
                      ?.sort((value) => value?.from - value?.from)
                      ?.map((item, index) => (
                        <>
                          <p key={index} className="venushedule">
                            {item?.from} to {item?.to}
                          </p>
                        </>
                      ))}
                  </div>
                  <div className="venuHere">
                    <h4 className="venuInfo">Venue Address</h4>
                    <p className="venushedule">{bookingDetails?.address}</p>
                  </div>
                </div>
                <div className="descriptionInfo">
                  <h3 className="descriptionheading">Description</h3>
                  <p className="descriptiontxt">
                    {bookingDetails?.description}
                  </p>
                </div>
                <h3 className="orderId_ mt-3">Booking Items</h3>
                <div className="row">
                  <div className="col-lg-10">
                   <div className="bookingDetailsScrol">
                   {bookingDetails?.items?.map((item, index) => (
                      <div key={index} className="orderedFoodItems">
                        <div className="foodCategory flexBox">
                          <img
                            src={item?.image}
                            alt="foodItemsImg"
                            className="foodItemImg"
                          />
                          <div className="categoryinfo">
                            <h4 className="foodcategory_ text-capitalize">{item?.category}</h4>
                            <h5 className="innerfood">{item?.name}</h5>
                            <p className="innePrice">£{item?.itemTotalPrice}.00</p>
                          </div>
                        </div>
                        <p className="fooodquantity_">{item?.quantity}X</p>
                      </div>
                    ))}
                   </div>
                  </div>
                  <div className="col-lg-2">
                    <div
                      className={
                        bookingDetails?.status === "delivered"
                          ? "paidAmount paidAmmount-delivered"
                          : "paidAmount"
                      }
                    >
                      <p className="totalPaid">Total paid</p>
                      <p className="foodBill"> £{bookingDetails?.totalPrice}.00</p>
                    </div>
                  </div>
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
          modalDetail.flag === "chatAboutOrder"
            ? "commonWidth customContent"
            : modalDetail.flag === "reportchat"
            ? "commonWidth customContent"
            : "commonWidth customContent"
        }
        ids={
          modalDetail.flag === "chatAboutOrder" ||
          modalDetail.flag === "reportchat" ||
          modalDetail.flag === "deletechat" ||
          modalDetail.flag === "bookingVerify"
            ? "orderchat"
            : ""
        }
        child={
          modalDetail.flag === "chatAboutOrder" ? (
            <ChatWithChefModal
              orderDetails={bookingDetails}
              id={bookingDetails?.userId?._id}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "reportchat" ? (
            <ReportchatDropModal
              id={bookingDetails?.userId?._id}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "deletechat" ? (
            <UserDeleteChat
              allChats={allChats}
              sender_id={bookingDetails?.chefId?._id}
              sendRoomId={`${bookingDetails?.userId?._id}-${bookingDetails?.chefId?._id}`}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "bookingVerify" ? (
            <VerifyorderDetailsModal
              type="booking"
              bookingId={id}
              handleGetBookingDetails={handleGetBookingDetails}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "chatAboutOrder" ? (
            <>
              <div className="Common_header">
                <img
                  onClick={() => handleOnCloseModal()}
                  src={Images.backArrowpassword}
                  alt="arrowpassword"
                  className="img-fluid  arrowCommon_"
                />
                <img
                  src={
                    bookingDetails?.userId?.userInfo?.profilePhoto
                      ? bookingDetails?.userId?.userInfo?.profilePhoto
                      : Images.dummyProfile
                  }
                  alt="userprofile"
                  className="img-fluid  headerImg_"
                />
                <div className="headerProfile">
                  <p className="headerTxt_">
                    {bookingDetails?.userId?.userInfo?.firstName}{" "}
                    {bookingDetails?.userId?.userInfo?.lastName}
                  </p>
                  {/* <p className="headerInner_">Online</p> */}
                </div>
              </div>
              <div className="Dotsheader_">
                <div className="dropdown ">
                  <button
                    className="btn btn-secondary dropdown-toggle modalheaderDot_"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={Images.modalHeader}
                      className=" img-fluid chatreportIcon_"
                      alt="modalheader"
                    />
                  </button>
                  <ul
                    className="dropdown-menu chatdrop"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li
                      className=" chatdroplabel flexBox"
                      onClick={() => {
                        handleOpenModal("reportchat");
                      }}
                    >
                      <img
                        src={Images.reportchatIcon}
                        className=" img-fluid reporticon_"
                        alt="reportchat"
                      />
                      <h1 className="reportchat m-0 ps-2">Report Chat</h1>
                    </li>
                    <li
                      className=" chatdroplabel flexBox"
                      onClick={() => {
                        handleOpenModal("deletechat");
                      }}
                    >
                      <img
                        src={Images.ChatModal}
                        className=" img-fluid reporticon_"
                        alt="clearchat"
                      />
                      <p className="reportchat m-0 ps-2">Clear Chat</p>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : modalDetail.flag === "reportchat" ? (
            <>
              <div className="Common_header gap-2">
                <img
                  onClick={() => handleOnCloseModal()}
                  src={Images.backArrowpassword}
                  alt="arrowpassword"
                  className="img-fluid  arrowCommon_"
                />
                <div className="headerProfile">
                  <h2 className="headerTxt_ mb-0">Report Chat</h2>
                </div>
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

export default BookingDetails;
