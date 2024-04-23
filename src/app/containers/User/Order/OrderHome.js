import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "../../../components/common/shared/CustomModal";
import UserOrderDetail from "../../../components/common/shared/UserOrderDetail";
import { getAllOrder, onErrorStopLoad } from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { FadeLoader } from "react-spinners";
import MyBookings from "./MyBookings";
import { useLocation } from "react-router-dom";

const UserOrderHome = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [key, setKey] = useState(Math.random());
  const [allOrders, setAllOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const [isOrder, setIsOrder] = useState(
    location?.state ? location?.state : "order"
  );
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
  const handleOpenModal = (flag, data) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
    setOrderDetail(data);
  };

  // get all orders
  useEffect(() => {
    let params = {
      limit: 5,
      page: currentPage,
    };

    dispatch(
      getAllOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setAllOrders(res?.data?.data?.data);
            setPageCount(res.data.data.total_pages);
            setShowLoading(false);
          }
        },
      })
    );
  }, [currentPage]);

  // stop looader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // Page change handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <>
      <div className="userordersection">
        <div className="newBooking-tabs">
          <div className="nav nav-tabs bookingNav" id="nav-tab" role="tablist">
            <button
              onClick={() => setIsOrder("order")}
              className={
                isOrder === "order"
                  ? "nav-link bookingNavHeader active"
                  : "nav-link bookingNavHeader"
              }
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Orders
            </button>
            <button
              onClick={() => setIsOrder("booking")}
              className={
                isOrder === "booking"
                  ? "nav-link bookingNavHeader active"
                  : "nav-link bookingNavHeader"
              }
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Bookings
            </button>
          </div>
        </div>
      </div>

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
        <>
          {isOrder === "order" ? (
            <div className="userordersection">
              <div className="order-list-height">
                <div className="row">
                  {allOrders && allOrders.length > 0 ? (
                    <>
                      {allOrders?.map((item, index) => {
                        return (
                          <div key={index} className="col-lg-12">
                            <div
                              className={
                                item?.status === "pending" ||
                                item?.status === "accepted" ||
                                item?.status === "readyForDelivery"
                                  ? "orderprocess active mb-3"
                                  : "orderprocess  mb-3"
                              }
                              onClick={() => {
                                handleOpenModal("orderdetail", item);
                              }}
                            >
                              <article className="flexBox justify-content-between">
                                <h6 className="fooodquantity_">
                                  #{item?.orderId}
                                </h6>
                                {item?.status === "pending" ||
                                item?.status === "accepted" ||
                                item?.status === "readyForDelivery" ? (
                                  <h6 className="chatTime_">In-Progress</h6>
                                ) : (
                                  <h6 className="chatTime_">Delivered</h6>
                                )}
                              </article>
                              <div className="orderchefinfo">
                                <div className="row">
                                  <div className="col-lg-6 col-md-12">
                                    <div className="flexBox">
                                      <img
                                        src={
                                          item?.chefId?.userInfo?.profilePhoto
                                            ? item?.chefId?.userInfo
                                                ?.profilePhoto
                                            : Images.dummyProfile
                                        }
                                        alt="chefimg"
                                        className="img-fluid chefOrderImg"
                                      />
                                      <div className="orderchefname">
                                        <h6 className="chefName">
                                          {item?.chefId?.userInfo?.firstName}{" "}
                                          {item?.chefId?.userInfo?.lastName}
                                        </h6>
                                        <h6 className="orderFrom">
                                          Order From
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-6 col-md-12">
                                    <div className="orderstatus">
                                      <h6 className="Items">
                                        {item?.itemCount} Item
                                      </h6>
                                      <h6 className="timeOrder_">
                                        Order placed on{" "}
                                        {moment(item?.updatedAt).format(
                                          "hh:mm A"
                                        )}
                                      </h6>
                                      <div className="userorderprice">
                                        <h5 key={index} className="orderPrice ">
                                          £{Number(item?.total)?.toFixed(2)}
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
              {allOrders && allOrders.length > 0 && (
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  pageCount={pageCount}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={3}
                  onPageChange={handlePageChange}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              )}
            </div>
          ) : (
            <MyBookings />
          )}
        </>
      )}
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "orderdetail" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "orderdetail" ? "userorderdetail" : ""}
        child={
          modalDetail.flag === "orderdetail" ? (
            <UserOrderDetail
              close={() => handleOnCloseModal()}
              orderDetail={orderDetail}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "orderdetail" ? (
            <>
              <div className="Common_header">
                <div className="headerProfile">
                  <p className="headerTxt_">Order #{orderDetail?.orderId}</p>

                  {orderDetail?.status === "pending" ||
                  orderDetail?.status === "accepted" ||
                  orderDetail?.status === "readyForDelivery" ? (
                    <p className="headerInner_ inprofress">In-Progress</p>
                  ) : (
                    <p className="orderDelivered">Delivered</p>
                  )}
                </div>
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

export default UserOrderHome;
