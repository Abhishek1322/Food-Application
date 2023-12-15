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

const OrderDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;
  const searchParams = new URLSearchParams(search);
  const recentOrderId = searchParams.get("recent-order");
  const [orderDetails, setOrderDetails] = useState([]);
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  // get order details
  useEffect(() => {
    handleGetOrderDetails();
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
    let params = {
      id: recentOrderId,
      status: status,
    };
    dispatch(
      acceptOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            if (status === "accepted") {
              navigate(`/anotherorder-detail?recent-order=${recentOrderId}`);
            } else {
              navigate(`/home`);
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
      <div className="mainchef_ ">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-12">
            <div className="insideCommonHeader d-flex">
              <Link to="/home" className="d-flex">
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
              <button
                onClick={(e) => handleAcceptOrder(e, "cancelled")}
                className="cancelOrder_ me-4"
              >
                Reject
              </button>
              <button
                onClick={(e) => handleAcceptOrder(e, "accepted")}
                className="submitOrder_"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
        <div className="orderDeatils">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="orderIdDetail">
                  <p className="orderId_">Order #{orderDetails?.orderId}</p>
                  {orderDetails?.status === "accepted" ? (
                    <p className="recentOrder progress_">In-Progress</p>
                  ) : orderDetails?.status === "readyForDelivery" ? (
                    <p className="recentOrder deliver">Ready for Delivery</p>
                  ) : (
                    <p className="recentOrder recentOrder">Recent Order</p>
                  )}
                </div>
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
                        <div className="johnChatTime">
                          <div className="chefInfo">
                            <img
                              src={Images.chefLocationImg}
                              alt="chefLocationImg"
                              className="chefLocation_"
                            />
                          </div>
                          <div className="johnchatdetail">
                            <p className="chatDates">
                              {moment(orderDetails?.updatedAt).format(
                                "MMM D, YYYY"
                              )}
                            </p>
                          </div>
                        </div>
                        {orderDetails?.itemCount === "1" ? (
                          <p className="itemsQuantity">
                            {orderDetails?.itemCount} Item
                          </p>
                        ) : (
                          <p className="itemsQuantity">
                            {orderDetails?.itemCount} Items
                          </p>
                        )}
                        <p className="ordertimeaddress">
                          Order placed on{" "}
                          {moment(orderDetails?.updatedAt).format("hh:mm A")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="chefChat">
                    <div
                      onClick={() => {
                        handleOpenModal("chatAboutOrder");
                      }}
                      className="chatwithjohn"
                    >
                      <div className="chatImg">
                        <i className="fas fa-comment-dots chatImage chatbg"></i>
                      </div>
                      <div className="chatText">
                        <p className="chat">chat</p>
                      </div>
                    </div>
                    <div className="deliveryAddress">
                      <p className="deliveryinfo">Delivery Address</p>
                      <p className="orderAddress">
                        {orderDetails?.address?.city}
                      </p>
                    </div>
                  </div>
                </div>
                <h3 className="orderId_">Ordered Items</h3>
                <div className="row align-items-center">
                  <div className="col-lg-10">
                    {orderDetails?.items?.map((item, index) => (
                      <div key={index} className="orderedFoodItems">
                        <div className="foodCategory flexBox">
                          <img
                            src={item?.image}
                            alt="foodItemsImg"
                            className="foodItemImg"
                          />
                          <div className="categoryinfo">
                            <h4 className="foodcategory_">{item?.category}</h4>
                            <h5 className="innerfood">{item?.name}</h5>
                            <p className="innePrice">£{item?.netPrice}.00</p>
                          </div>
                        </div>
                        <p className="fooodquantity_">{item?.quantity}X</p>
                      </div>
                    ))}
                  </div>
                  <div className="col-lg-2">
                    <div className="paidAmmount">
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
            : ""
        }
        ids={modalDetail.flag === "chatAboutOrder" ? "orderchat" : ""}
        child={
          modalDetail.flag === "chatAboutOrder" ? (
            <ChatWithChefModal
              orderDetails={orderDetails}
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

export default OrderDetails;
