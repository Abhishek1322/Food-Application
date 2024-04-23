import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBookings } from "../../../../redux/slices/user";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { FadeLoader } from "react-spinners";
import * as Images from "../../../../utilities/images";
import CustomModal from "../../../components/common/shared/CustomModal";
import UserBookingDetail from "../../../components/common/shared/UserBookingDetail";

const MyBookings = () => {
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
  const [allBookings, setAllBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState("");
  const [bookingDetail, setBookingDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setBookingDetails(data);
  };

  // get all bookings
  useEffect(() => {
    setIsLoading(true);
    let params = {
      limit: 5,
      page: currentPage,
    };

    dispatch(
      getAllBookings({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            setIsLoading(false);
            setAllBookings(res?.data?.data?.data);
            setPageCount(res.data.data.total_pages);
          }
        },
      })
    );
  }, [currentPage]);

  // Page change handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <>
      {isLoading ? (
        <div className="good-loader">
          <FadeLoader
            color={"#E65C00"}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="userordersection">
          <div className="order-list-height">
            <div className="row">
              {allBookings && allBookings.length > 0 ? (
                <>
                  {allBookings?.map((item, index) => {
                    return (
                      <div key={index} className="col-lg-12">
                        <div
                          className={
                            item?.status === "pending" ||
                            item?.status === "accepted" ||
                            item?.status === "reached"
                              ? "orderprocess active mb-3"
                              : "orderprocess  mb-3"
                          }
                          onClick={() => {
                            handleOpenModal("bookingDetails", item);
                          }}
                        >
                          <article className="flexBox justify-content-between">
                            <h6 className="fooodquantity_">
                              #{item?.bookingId}
                            </h6>
                            {item?.status === "pending" ||
                            item?.status === "accepted" ||
                            item?.status === "reached" ? (
                              <h6 className="chatTime_">In-Progress</h6>
                            ) : (
                              <h6 className="chatTime_">Complete</h6>
                            )}
                          </article>
                          <div className="orderchefinfo">
                            <div className="row">
                              <div className="col-lg-6 col-md-12">
                                <div className="flexBox">
                                  <img
                                    src={
                                      item?.chefId?.userInfo?.profilePhoto
                                        ? item?.chefId?.userInfo?.profilePhoto
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
                                    <h6 className="orderFrom">Order From</h6>
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
                                    {moment(item?.updatedAt).format("hh:mm A")}
                                  </h6>
                                  <div className="userorderprice">
                                    <h5 key={index} className="orderPrice ">
                                      £{Number(item?.totalPrice)?.toFixed(2)}
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
          {allBookings && allBookings.length > 0 && (
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
      )}

      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "bookingDetails"
            ? "commonWidth customContent"
            : ""
        }
        ids={modalDetail.flag === "bookingDetails" ? "userorderdetail" : ""}
        child={
          modalDetail.flag === "bookingDetails" ? (
            <UserBookingDetail
              bookingDetail={bookingDetail}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "bookingDetails" ? (
            <>
              <div className="Common_header">
                <div className="headerProfile">
                  <p className="headerTxt_">
                    Booking #{bookingDetail?.bookingId}
                  </p>

                  {bookingDetail?.status === "pending" ||
                  bookingDetail?.status === "accepted" ||
                  bookingDetail?.status === "reached" ? (
                    <p className="headerInner_ inprofress">In-Progress</p>
                  ) : (
                    <p className="orderDelivered">Complete</p>
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

export default MyBookings;
