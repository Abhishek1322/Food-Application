import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import { useDispatch } from "react-redux";
import {
  getRecentOrder,
  acceptOrder,
  onErrorStopLoadChef,
  getBookingRequests,
} from "../../../../redux/slices/chef";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useChefSelector } from "../../../../redux/selector/chef";
import { FadeLoader } from "react-spinners";

const HomeRequsest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chefData = useChefSelector();
  const [isLoading, setIsloading] = useState("");
  const [bookingRequest, setBookingRequest] = useState([]);
  const [recentOrders, setGetRecentOrders] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const [readMoreId, setReadMoreId] = useState("");
  const [orderLoadingId, setOrderLoadingId] = useState("");

  // get recent order
  const handleRecentOrder = () => {
    setShowLoading(true);
    let params = {
      status: "pending",
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
  }, [chefData?.success]);

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoadChef());
  }, [dispatch]);

  // navigate on recent order page
  const handleOpenRecentOder = (e, id) => {
    e.preventDefault();
    navigate(`/order-details?recent-order=${id}`, { state: "/home" });
  };

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
              navigate(`/order-details?recent-order=${id}`, { state: "/home" });
            } else {
              handleRecentOrder();
            }
          }
        },
      })
    );
  };

  // get booking request
  useEffect(() => {
    let params = {
      limit: 15,
      status: "pending",
    };
    dispatch(
      getBookingRequests({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setBookingRequest(res?.data?.data?.data);
          }
        },
      })
    );
  }, []);

  // toggle read more
  const handleReadMore = (e, id) => {
    e.stopPropagation();
    setIsReadMore(!isReadMore);
    setReadMoreId(id);
  };

  // open booking detail page
  const handleOpenDetailPage = (id) => {
    navigate(`/booking-details?id=${id}`, { state: "/home" });
  };

  return (
    <>
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
        <div className="mainchef_">
          <div className="homePage">
            <div className="container-fluid p-0">
              <div className="row">
                <div className="col-lg-12 col-sm-12">
                  <div className="innerhomeheader">
                    <h2 className="headerinnerheading">New Booking Requests</h2>
                    {bookingRequest && bookingRequest.length > 0 && (
                      <div className="seeAll">
                        <Link to="/new-booking">
                          <p className="headerinnertxt">See All</p>
                        </Link>
                        <img
                          src={Images.homeArow}
                          alt="homearrow"
                          className="seeArrow"
                        />
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      bookingRequest && bookingRequest.length > 0
                        ? "profileDetail"
                        : ""
                    }
                  >
                    {bookingRequest && bookingRequest.length > 0 ? (
                      <>
                        {bookingRequest?.slice(0, 5)?.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => handleOpenDetailPage(item?._id)}
                            className="homeProfileBox all-bookings-height"
                          >
                            <div className="profileInfo">
                              <img
                                src={
                                  item?.userId?.userInfo?.profilePhoto
                                    ? item?.userId?.userInfo?.profilePhoto
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
                                <h4 className="userInfo">
                                  {moment(item?.createdAt).format(
                                    "MMM D, YYYY"
                                  )}
                                </h4>
                              </div>
                            </div>
                            <p className="userInfoTxt">
                              {isReadMore && readMoreId === item?._id
                                ? item?.description
                                : item?.description?.slice(0, 200)}
                              &nbsp;
                              {item?.description?.length > 200 && (
                                <span
                                  onClick={(e) => handleReadMore(e, item?._id)}
                                  className="read-more-desp"
                                >
                                  {isReadMore && readMoreId === item?._id
                                    ? "Less More..."
                                    : "More..."}
                                </span>
                              )}
                            </p>
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

                  <div className="innerhomeheader">
                    <h3 className="headerinnerheading">Recent Orders</h3>
                    {recentOrders && recentOrders.length > 0 && (
                      <Link to="/recent-orders">
                        <div className="seeAll">
                          <p className="headerinnertxt">See All</p>
                          <img
                            src={Images.homeArow}
                            alt="arrowImg"
                            className="seeArrow"
                          />
                        </div>
                      </Link>
                    )}
                  </div>
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
                            onClick={(e) => handleOpenRecentOder(e, item?._id)}
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
                                        ? item?.userId?.userInfo?.profilePhoto
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
                                    <h4 className="orderFrom">Order From</h4>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeRequsest;
