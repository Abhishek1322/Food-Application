import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { useDispatch } from "react-redux";
import {
  getSingleOrderDetail,
  onErrorStopLoadChef,
  acceptOrder,
} from "../../../../redux/slices/chef";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import ChatWithChefModal from "../../../components/common/shared/chatWithChefModal";
import CustomModal from "../../../components/common/shared/CustomModal";
import ReportchatDropModal from "../../../components/common/shared/reportchatDropModal";
import UserDeleteChat from "../../../components/common/shared/UserDeleteChat";
import { collection, onSnapshot, query } from "firebase/firestore";
import { PARENTCOLLECTIONNAME, db } from "../../../../config/firebase-config";
import { useAuthSelector } from "../../../../redux/selector/auth";
import { useChefSelector } from "../../../../redux/selector/chef";
import VerifyorderDetailsModal from "../../../components/common/shared/verifyorderDetailsModal";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const authData = useAuthSelector();
  const chefData = useChefSelector();
  const { loading } = chefData;
  const { search, state } = location;
  const searchParams = new URLSearchParams(search);
  const recentOrderId = searchParams.get("recent-order");
  const [orderDetails, setOrderDetails] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [key, setKey] = useState(Math.random());
  const [isLoading, setIsLoading] = useState("");
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  // get order details
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
    handleGetOrderDetails();
    return () => unsubscribe;
  }, []);

  // get order details
  const handleGetOrderDetails = () => {
    let params = {
      id: recentOrderId,
    };
    dispatch(
      getSingleOrderDetail({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setOrderDetails(res?.data?.data);
          }
        },
      })
    );
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoadChef());
  }, [dispatch]);

  //accept and reject order
  const handleAcceptOrder = (e, status) => {
    e.preventDefault();
    let params = {
      id: recentOrderId,
      status: status,
    };
    setIsLoading(status);
    dispatch(
      acceptOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            if (status === "cancelled") {
              navigate(`/home`);
            } else {
              handleGetOrderDetails();
            }
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
  const handleOpenModal = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  // check order status
  const getOrderStatus = () => {
    switch (orderDetails?.status) {
      case "pending":
        return <p className="recentOrder recentOrder">Recent Order</p>;
      case "accepted":
        return <p className="recentOrder progress_">In-Progress</p>;
      case "readyForDelivery":
        <p className="recentOrder deliver">Ready for Delivery</p>;
      default:
        <p className="recentOrder recentOrder">Recent Order</p>;
    }
  };

  // handle order buttons
  const handleOrderButtons = () => {
    switch (orderDetails?.status) {
      case "pending":
        return (
          <>
            <button
              onClick={(e) => handleAcceptOrder(e, "cancelled")}
              className="cancelOrder_ me-4"
            >
              Reject
              {loading && isLoading === "cancelled" && (
                <span className="spinner-border spinner-border-sm ms-1"></span>
              )}
            </button>
            <button
              onClick={(e) => handleAcceptOrder(e, "accepted")}
              className="submitOrder_"
            >
              Accept
              {loading && isLoading === "accepted" && (
                <span className="spinner-border spinner-border-sm ms-1"></span>
              )}
            </button>
          </>
        );
      case "accepted":
        return (
          <button
            onClick={(e) => handleAcceptOrder(e, "readyForDelivery")}
            className="chefRightHeader m-0 text-end d-flex align-items-center gap-2"
          >
            Order Ready for Delivery
            {loading && isLoading === "readyForDelivery" && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
          </button>
        );
      case "readyForDelivery":
        return (
          <button
            onClick={() => handleOpenModal("verifyOrder")}
            className="chefRightHeader m-0 text-end"
          >
            Order Delivered
          </button>
        );
      case "delivered":
        return "";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="mainchef_ ">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-12">
            <div className="insideCommonHeader d-flex">
              <Link to={state || "/home"} className="d-flex align-items-center">
                <img
                  src={Images.backArrowpassword}
                  className="innerHeaderArrow"
                  alt="arrowHeaderImg"
                />
                <h1 className="chefCommonHeader ps-2">Order Details</h1>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 d-flex justify-content-end">
            <div className="orderItems_ flexBox ">
              {/* {orderDetails?.status === "accepted" ? (
                <button
                  onClick={() => handleAcceptOrder("readyForDelivery")}
                  className="chefRightHeader m-0 text-end d-flex align-items-center gap-2"
                >
                  {chefData?.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  Order Ready for Delivery
                </button>
              ) : orderDetails?.status === "delivered" ? (
                ""
              ) : (
                <button
                  onClick={() => handleOpenModal("verifyOrder")}
                  className="chefRightHeader m-0 text-end"
                >
                  Order Delivered
                </button>
              )} */}
              {handleOrderButtons()}
            </div>
          </div>
        </div>
        <div className="orderDeatils">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="orderIdDetail">{getOrderStatus()}</div>
                <div className="chefJohn">
                  <div className="chatWithChef">
                    <div className="chefjohnDetail">
                      <img
                        src={
                          orderDetails?.userId?.userInfo?.profilePhoto
                            ? orderDetails?.userId?.userInfo?.profilePhoto
                            : Images.dummyProfile
                        }
                        alt="homeProfileImg"
                        className="chefJohnImg"
                      />
                      <div className="chefinfo">
                        <h2 className="johnExplorer">
                          {orderDetails?.userId?.userInfo?.firstName}{" "}
                          {orderDetails?.userId?.userInfo?.lastName}
                        </h2>
                        <div className="johnChatTime mt-3">
                          <div className="chefInfo">
                            <img
                              src={Images.chefLocationImg}
                              alt="chefLocationImg"
                              className="chefLocation_"
                            />
                          </div>
                          <div className="johnchatdetail">
                            <p className="chatDates">
                              {/* {moment(orderDetails?.updatedAt).format(
                                "MMM D, YYYY"
                              )} */}
                              Order From
                            </p>
                          </div>
                        </div>
                        <p className="itemsQuantity">
                          {parseInt(orderDetails?.itemCount)}{" "}
                          {parseInt(orderDetails?.itemCount) === 1
                            ? "Item"
                            : "Items"}
                        </p>

                        <p className="ordertimeaddress">
                          Order placed on{" "}
                          {moment(orderDetails?.updatedAt).format("hh:mm A")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="chefChat">
                    {/* <div
                      onClick={() => {
                        handleOpenModal("chatAboutOrder");
                      }}
                      className={
                        orderDetails?.status === "delivered"
                          ? "chatwithjohn order-delivered-chat"
                          : "chatwithjohn"
                      }
                    >
                      <div
                        className={
                          orderDetails?.status === "delivered"
                            ? "chatImg chatImg-delivered"
                            : "chatImg"
                        }
                      >
                        <i className="fas fa-comment-dots chatImage"></i>
                      </div>
                      <div className="chatText">
                        <p className="chat">Chat</p>
                      </div>
                    </div> */}
                    <div className="deliveryAddress">
                      <p className="deliveryinfo">Delivery Address</p>
                      <p className="orderAddress">
                        {orderDetails?.address?.city}
                      </p>
                    </div>
                  </div>
                </div>
                <h3 className="orderId_ mt-3">Ordered Items</h3>
                <div className="row">
                  <div className="col-lg-10">
                   <div className="orderDetailScroll">
                   {orderDetails?.items?.map((item, index) => (
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
                            <p className="innePrice">£{item?.netPrice}.00</p>
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
                        orderDetails?.status === "delivered"
                          ? "paidAmmount paidAmmount-delivered"
                          : "paidAmmount"
                      }
                    >
                      <p className="totalPaid">Total paid</p>
                      <p className="foodBill"> £{orderDetails?.total}.00</p>
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
          modalDetail.flag === "chatAboutOrder"
            ? "orderchat"
            : modalDetail.flag === "reportchat"
            ? "orderchat"
            : modalDetail.flag === "deletechat" ||
              modalDetail.flag === "verifyOrder"
            ? "orderchat"
            : ""
        }
        child={
          modalDetail.flag === "chatAboutOrder" ? (
            <ChatWithChefModal
              orderDetails={orderDetails}
              id={orderDetails?.userId?._id}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "reportchat" ? (
            <ReportchatDropModal
              id={orderDetails?.userId?._id}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "deletechat" ? (
            <UserDeleteChat
              allChats={allChats}
              sender_id={orderDetails?.chefId?._id}
              sendRoomId={`${orderDetails?.userId?._id}-${orderDetails?.chefId?._id}`}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "verifyOrder" ? (
            <VerifyorderDetailsModal
              handleGetOrderDetails={handleGetOrderDetails}
              recentOrderId={recentOrderId}
              type="order"
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
                    orderDetails?.userId?.userInfo?.profilePhoto
                      ? orderDetails?.userId?.userInfo?.profilePhoto
                      : Images.dummyProfile
                  }
                  alt="userprofile"
                  className="img-fluid  headerImg_"
                />
                <div className="headerProfile">
                  <p className="headerTxt_">
                    {orderDetails?.userId?.userInfo?.firstName}{" "}
                    {orderDetails?.userId?.userInfo?.lastName}
                  </p>
                  <p className="headerInner_">Online</p>
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

export default OrderDetails;
