import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import MyRecentOrderModal from "./myRecentOrderModal";
import {
  acceptOrder,
  getRecentOrder,
  onErrorStopLoadChef,
} from "../../../../redux/slices/chef";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useChefSelector } from "../../../../redux/selector/chef";

const Myorder = ({ close, updateNotification }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
  const chefData = useChefSelector();
  const [orderStatus, setOrderStatus] = useState("pending");
  const [orderDetails, setOrderDetails] = useState([]);
  const [searchOrder, setSearchOrder] = useState("");
  const [singleOrderId, setSingleOrderId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsloading] = useState("");
  const [orderLoadingId, setOrderLoadingId] = useState("");
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
  const handleOpenModal = (flag, id) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
    setSingleOrderId(id);
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoadChef());
  }, [dispatch]);

  // get recenet orders
  useEffect(() => {
    handleGetRecenetOrders();
  }, [orderStatus, searchOrder]);

  // get recenet orders
  const handleGetRecenetOrders = () => {
    let params = {
      status: orderStatus,
      search: searchOrder,
    };
    dispatch(
      getRecentOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setOrderDetails(res?.data?.data?.data);
          }
        },
      })
    );
  };

  //accept and reject order
  const handleAcceptOrder = (e, id, status) => {
    e.stopPropagation();
    setIsloading(status);
    setOrderLoadingId(id);
    let params = {
      id: id,
      status: status,
    };
    dispatch(
      acceptOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            if (status === "accepted") {
              handleOpenModal("myRecentOrder", id);
            } else {
              close();
              updateNotification();
            }
            // dispatch(getLatestOrder(true));
          }
        },
      })
    );
  };

  return (
    <>
      <div className="modalContent list-all-orders">
        <div className="order-outer">
          <div className="searchbar ">
            <input
              onChange={(e) => setSearchOrder(e.target.value)}
              type="text"
              placeholder="Search order by order Id"
              className="searchtext"
              value={searchOrder}
            />
            <img
              src={Images.searchbar}
              className="searchbarImg"
              alt="searchbar"
            />
            <section className="content-header">
              <div className="row">
                <div className="Maincontentbox">
                  <div className="infopages">
                    <ul
                      className="nav nav-pills mb-3 insidetabs_"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          onClick={() => setOrderStatus("pending")}
                          className={
                            orderStatus === "pending"
                              ? "nav-link innertext_ active"
                              : "nav-link innertext_"
                          }
                        >
                          Recent Orders
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={
                            orderStatus === "in_progress"
                              ? "nav-link innertext_ active"
                              : "nav-link innertext_"
                          }
                          onClick={() => setOrderStatus("in_progress")}
                        >
                          In-Progress
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={
                            orderStatus === "delivered"
                              ? "nav-link innertext_ active"
                              : "nav-link innertext_"
                          }
                          onClick={() => setOrderStatus("delivered")}
                        >
                          Delivered
                        </button>
                      </li>
                    </ul>

                    <div
                      className="tab-content order-inner-list"
                      id="pills-tabContent"
                    >
                      <div className="tab-pane fade active show">
                        <div className="Myorders_">
                          {orderDetails && orderDetails.length > 0 ? (
                            <>
                              {orderDetails?.map((item, index) => (
                                <div
                                  onClick={() => {
                                    handleOpenModal("myRecentOrder", item?._id);
                                  }}
                                  key={index}
                                  className="ordermodalBox"
                                >
                                  <div className="myorders_">
                                    <p className="orderId"># {item?.orderId}</p>
                                  </div>
                                  <div className="userOrderInfo">
                                    <div className="orderRequest">
                                      <div className="profileInfo">
                                        <img
                                          src={
                                            item?.userId?.userInfo?.profilePhoto
                                              ? item?.userId?.userInfo
                                                  ?.profilePhoto
                                              : Images.dummyProfile
                                          }
                                          alt="profile"
                                          className="homeprofile"
                                        />
                                        <div className="detailInfo">
                                          <p className="userProfile">
                                            {item?.userId?.userInfo?.firstName}{" "}
                                            {item?.userId?.userInfo?.lastName}
                                          </p>
                                          <p className="orderFrom">
                                            Order From
                                          </p>
                                        </div>
                                      </div>
                                      <div className="orderItems">
                                        <div className="orderiem_">
                                          {item?.itemCount !== "1" ? (
                                            <p className="Items">
                                              {item?.itemCount} items
                                            </p>
                                          ) : (
                                            <p className="Items">
                                              {item?.itemCount} item
                                            </p>
                                          )}
                                          <p className="timeOrder_">
                                            Order placed on{" "}
                                            {moment(item?.updatedAt).format(
                                              "hh:mm A"
                                            )}
                                          </p>
                                        </div>
                                        <div className="showOrder">
                                          <p className="orderPrice">
                                            £{item?.total}.00
                                          </p>
                                        </div>
                                      </div>
                                      {item?.status === "pending" && (
                                        <div className="orderItems">
                                          <button
                                            disabled={chefData?.loading}
                                            onClick={(e) =>
                                              handleAcceptOrder(
                                                e,
                                                item?._id,
                                                "cancelled"
                                              )
                                            }
                                            className="cancelOrder"
                                          >
                                            REJECT
                                            {chefData?.loading &&
                                              orderLoadingId === item?._id &&
                                              isLoading === "cancelled" && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                              )}
                                          </button>
                                          <button
                                            disabled={chefData?.loading}
                                            onClick={(e) =>
                                              handleAcceptOrder(
                                                e,
                                                item?._id,
                                                "accepted"
                                              )
                                            }
                                            className="acceptOrder"
                                          >
                                            ACCEPT
                                            {chefData?.loading &&
                                              orderLoadingId === item?._id &&
                                              isLoading === "accepted" && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                              )}
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : (
                            <div className="noDataFoundImage">
                              <div>
                                <img
                                  className="w-100"
                                  alt="no data found"
                                  src={Images.nodataFound}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        // backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "myRecentOrder"
            ? "commonWidth customContent"
            : ""
        }
        ids={modalDetail.flag === "myRecentOrder" ? "recentOrder" : ""}
        child={
          modalDetail.flag === "myRecentOrder" ? (
            <MyRecentOrderModal
              handleGetRecenetOrders={handleGetRecenetOrders}
              setOrderId={setOrderId}
              singleOrderId={singleOrderId}
              close={() => {
                close();
                handleOnCloseModal();
              }}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "myRecentOrder" ? (
            <>
              <div className="Common_header">
                <img
                  onClick={() => {
                    handleOnCloseModal();
                    close();
                  }}
                  src={Images.backArrowpassword}
                  alt="logo"
                  className="img-fluid  arrowCommon_"
                />
                <div className="headerProfile ps-2">
                  <p className="modal_Heading">Order #{orderId?.orderId}</p>
                  {orderId?.status === "pending" ? (
                    <p className="innerhead_ ps-3">Recent Order</p>
                  ) : orderId?.status === "accepted" ? (
                    <p className="ps-3 progress_ position-relative">
                      In-Progress
                    </p>
                  ) : orderId?.status === "readyForDelivery" ? (
                    <p className="readyDeliver position-relative ps-3">
                      Ready for Delivery
                    </p>
                  ) : orderId?.status === "delivered" ? (
                    <p className="recentOrder deliver ps-3 position-relative">
                      Order Delivered
                    </p>
                  ) : (
                    ""
                  )}
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

export default Myorder;
