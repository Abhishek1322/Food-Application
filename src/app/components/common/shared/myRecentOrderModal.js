import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import ChatWithChefModal from "./chatWithChefModal";
import VerifyorderDetailsModal from "./verifyorderDetailsModal";
import {
  acceptOrder,
  getLatestOrder,
  getSingleOrderDetail,
  onErrorStopLoadChef,
} from "../../../../redux/slices/chef";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useChefSelector } from "../../../../redux/selector/chef";

const MyRecentOrderModal = (props) => {
  const { close, singleOrderId, setOrderId, handleGetRecenetOrders } = props;
  const dispatch = useDispatch();
  const chefData = useChefSelector();
  const [key, setKey] = useState(Math.random());
  const [orderDetail, setOrderDetail] = useState([]);
  const [isLoading, setIsLoading] = useState("");
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
  const handleOpenModal = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  // get single order detail
  useEffect(() => {
    handleGetSingleOrder();
  }, []);

  // get single order detail
  const handleGetSingleOrder = () => {
    let parmas = {
      id: singleOrderId,
    };
    dispatch(
      getSingleOrderDetail({
        ...parmas,
        cb(res) {
          if (res.status === 200) {
            setOrderDetail(res?.data?.data);
            setOrderId(res?.data?.data);
          }
        },
      })
    );
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoadChef());
  }, [dispatch]);

  // order ready for delivery
  const handleOrderReady = (status) => {
    setIsLoading(status);
    let params = {
      id: singleOrderId,
      status: status,
    };
    dispatch(
      acceptOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleGetSingleOrder();
            if (status === "cancelled") {
              close();
            }
            handleGetRecenetOrders();
          }
        },
      })
    );
  };

  return (
    <>
      <div className="myrecentOrders_ orderModalBtn">
        <div className="modalscroll">
          <div className="orderProfile">
            <div className="ordermenuProfile">
              <div className="orderprofile_ ">
                <img
                  src={
                    orderDetail?.userId?.userInfo?.profilePhoto
                      ? orderDetail?.userId?.userInfo?.profilePhoto
                      : Images.dummyProfile
                  }
                  alt="logo"
                  className="homeprofile"
                />
                <div className="detailInfo">
                  <p className="userProfile">
                    {orderDetail?.userId?.userInfo?.firstName}{" "}
                    {orderDetail?.userId?.userInfo?.lastName}
                  </p>
                  <p className="userInfo">Order From</p>
                </div>
              </div>
              <div className="chat_">
                <img
                  src={Images.orderMsgImg}
                  className="orderchat"
                  onClick={() => {
                    handleOpenModal("chatAboutOrder");
                  }}
                />
              </div>
            </div>
            <p className="notificationText pt-3">Delivery Address</p>
            <p className="timeOrder_">{orderDetail?.address?.city}</p>
            <div className="flexBox justify-content-between">
              <p className="Items">
                {" "}
                {orderDetail?.itemCount !== "1" ? (
                  <p className="Items">{orderDetail?.itemCount} items</p>
                ) : (
                  <p className="Items">{orderDetail?.itemCount} item</p>
                )}
              </p>
              <p className="timeOrder_ pb-2">
                Order placed on{" "}
                {moment(orderDetail?.updatedAt).format("hh:mm A")}
              </p>
            </div>
          </div>
          <div className="orderDetails_">
            <p className="reportText_ pt-3 pb-3">Ordered Items</p>
            {orderDetail?.items?.map((item, index) => (
              <div key={index} className="orderProfile">
                <div className="profileInfo">
                  <div className="orderprofile_ flexBox">
                    <img
                      src={item?.image}
                      alt="foodImtems"
                      className="homeprofile"
                    />
                    <div className="detailInfo">
                      <p className="userInfo">{item?.category}</p>
                      <p className="userProfile">{item?.name}</p>
                      <p className="orderPrice">£{item?.netPrice}.00</p>
                    </div>
                  </div>
                  <p className="cheftext">{item?.quantity}X</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="modalfooterbtn">
          <div
            className={
              orderDetail?.status === "delivered"
                ? "totalAmmount flexBox justify-content-between"
                : "totalOrderAmount_ flexBox justify-content-between pb-4"
            }
          >
            <p className="chat_Text m-0 pb-0">Total paid</p>
            <p className="chat m-0">£{orderDetail?.total}.00</p>
          </div>
          {orderDetail?.status === "pending" ? (
            <div className="orderItems_ flexBox justify-content-between ">
              <button
                onClick={() => handleOrderReady("cancelled")}
                className="cancelOrder_"
              >
                {chefData?.loading && isLoading === "cancelled" && (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                )}
                Reject
              </button>
              <button
                onClick={() => handleOrderReady("accepted")}
                className="submitOrder_"
              >
                {chefData?.loading && isLoading === "accepted" && (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                )}
                Accept
              </button>
            </div>
          ) : orderDetail?.status === "accepted" ? (
            <div className="orderItems_ flexBox justify-content-between ">
              <button
                onClick={() => handleOrderReady("readyForDelivery")}
                className="cancelOrder_  w-100"
              >
                {chefData?.loading && isLoading === "readyForDelivery" && (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                )}
                Order Ready for Delivery
              </button>
            </div>
          ) : orderDetail?.status === "readyForDelivery" ? (
            <div className="orderItems_ flexBox justify-content-between ">
              <button
                onClick={() => {
                  handleOpenModal("orderDeliver");
                }}
                className="cancelOrder_  w-100"
              >
                Order Delivered
              </button>
            </div>
          ) : (
            ""
          )}
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
            : modalDetail.flag === "orderDeliver"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "chatAboutOrder"
            ? "orderchat"
            : modalDetail.flag === "orderDeliver"
            ? "orderchat"
            : ""
        }
        child={
          modalDetail.flag === "chatAboutOrder" ? (
            <ChatWithChefModal close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "orderDeliver" ? (
            <VerifyorderDetailsModal
              handleGetOrderDetails={handleGetSingleOrder}
              recentOrderId={singleOrderId}
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
                  src={Images.backArrowpassword}
                  alt="arrowpassword"
                  className="img-fluid  arrowCommon_"
                />
                <img
                  src={Images.userProfile}
                  alt="userprofile"
                  className="img-fluid  headerImg_"
                />
                <div className="headerProfile">
                  <p className="headerTxt_">John Smith</p>
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
                    className="dropdown-menu chatmenu_"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <div
                      className=" chatnext_ flexBox"
                      onClick={() => {
                        handleOpenModal("reportchatD");
                      }}
                    >
                      <img
                        src={Images.reportchatIcon}
                        className=" img-fluid reporticon_"
                        alt="reporticon"
                      />
                      <p className="reportchattxt_ m-0 ps-2">Report Chat</p>
                    </div>
                  </ul>
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

export default MyRecentOrderModal;
