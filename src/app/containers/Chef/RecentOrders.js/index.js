import React, { useState, useEffect } from "react";
import {
  acceptOrder,
  getRecentOrder,
  onErrorStopLoadChef,
} from "../../../../redux/slices/chef";
import { useChefSelector } from "../../../../redux/selector/chef";
import { useDispatch } from "react-redux";
import moment from "moment";
import * as Images from "../../../../utilities/images";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

const RecentOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chefData = useChefSelector();
  const [recentOrders, setGetRecentOrders] = useState([]);
  const [isLoading, setIsloading] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [orderLoadingId, setOrderLoadingId] = useState("");
  const [orderStatus, setOrderStatus] = useState("pending");

  // get recent order
  const handleRecentOrder = () => {
    setShowLoading(true);
    let params = {
      status: orderStatus,
    };
    dispatch(
      getRecentOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setGetRecentOrders(res?.data?.data?.data);
            // dispatch(getLatestOrder(false));
            setShowLoading(false);
          }
        },
      })
    );
  };

  // get recent order
  useEffect(() => {
    handleRecentOrder();
  }, [chefData?.success, orderStatus]);

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoadChef());
  }, [dispatch]);

  //accept and reject order
  const handleAcceptOrder = (e, id, status) => {
    e.stopPropagation();
    setOrderLoadingId(id);
    setIsloading(status);
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
              navigate(`/order-details?recent-order=${id}`, {
                state: "/recent-orders",
              });
            } else {
              handleRecentOrder();
            }
          }
        },
      })
    );
  };

  // navigate on recent order page
  const handleOpenRecentOder = (e, id) => {
    e.preventDefault();
    navigate(`/order-details?recent-order=${id}`, {
      state: "/recent-orders",
    });
  };

  return (
    <div>
      <div className="mainchef_">
        <div className="Newbooking_">
          <nav>
            <div className="newBooking-tabs">
              <div
                className="nav nav-tabs bookingNav"
                id="nav-tab"
                role="tablist"
              >
                <button
                  onClick={() => setOrderStatus("pending")}
                  className="nav-link bookingNavHeader active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Recent Orders{" "}
                </button>
                <button
                  onClick={() => setOrderStatus("in_progress")}
                  className="nav-link bookingNavHeader"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  In-Progress
                </button>
                <button
                  onClick={() => setOrderStatus("delivered")}
                  className="nav-link bookingNavHeader"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Delivered
                </button>
              </div>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    {showLoading ? (
                      <div className="good-loader">
                        <FadeLoader
                          color={"#E65C00"}
                          size={150}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </div>
                    ) : (
                      <div
                        className={
                          recentOrders && recentOrders.length > 0
                            ? "profileDetail profileDetailNew"
                            : ""
                        }
                      >
                        {recentOrders && recentOrders.length > 0 ? (
                          <>
                            {recentOrders?.slice(0, 5)?.map((item, index) => (
                              <div
                                onClick={(e) =>
                                  handleOpenRecentOder(e, item?._id)
                                }
                                key={index}
                                className="orderDetailBox"
                              >
                                <div className="orderDetails">
                                  <p className="orderId">#{item?.orderId}</p>
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
                                        <h3 className="userProfile">
                                          {item?.userId?.userInfo?.firstName}{" "}
                                          {item?.userId?.userInfo?.lastName}
                                        </h3>
                                        <h4 className="orderFrom">
                                          Order From
                                        </h4>
                                      </div>
                                    </div>
                                    <div className="orderItems">
                                      {item?.itemCount !== "1" ? (
                                        <p className="Items">
                                          {item?.itemCount} items
                                        </p>
                                      ) : (
                                        <p className="Items">
                                          {item?.itemCount} item
                                        </p>
                                      )}

                                      <div className="showOrder">
                                        <p className="orderPrice">
                                          £{item?.total}.00
                                        </p>
                                      </div>
                                    </div>
                                    <p className="orderTime">
                                      Order placed on{" "}
                                      {moment(item?.updatedAt).format(
                                        "MMM D, YYYY"
                                      )}
                                    </p>
                                    {orderStatus === "pending" && (
                                      <div className="ordered_">
                                        <button
                                          onClick={(e) =>
                                            handleAcceptOrder(
                                              e,
                                              item?._id,
                                              "cancelled"
                                            )
                                          }
                                          className="cancelOrder d-flex align-items-center gap-2"
                                        >
                                          CANCEL
                                          {chefData?.loading &&
                                            orderLoadingId === item?._id &&
                                            isLoading === "cancelled" && (
                                              <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                        </button>
                                        <button
                                          onClick={(e) =>
                                            handleAcceptOrder(
                                              e,
                                              item?._id,
                                              "accepted"
                                            )
                                          }
                                          className="acceptOrder d-flex align-items-center gap-2"
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
                          <div className="noDataFoundImageRequestpage">
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
