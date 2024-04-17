import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import {
  getBookingRequests,
  onErrorStopLoadChef,
} from "../../../../redux/slices/chef";
import moment from "moment";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { useChefSelector } from "../../../../redux/selector/chef";
import { FadeLoader } from "react-spinners";

const NewBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chefSelector = useChefSelector();
  const [bookingRequest, setBookingRequest] = useState([]);
  const [bookingStatus, setBookingStatus] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState("");
  const [isReadMore, setIsReadMore] = useState(false);
  const [readMoreId, setReadMoreId] = useState("");
  const [showLoading, setShowLoading] = useState(true);

  // get booking request
  useEffect(() => {
    let params = {
      limit: 15,
      page: currentPage,
      status: bookingStatus,
    };
    dispatch(
      getBookingRequests({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setBookingRequest(res?.data?.data?.data);
            setPageCount(res.data.data.total_pages);
            setShowLoading(false);
          }
        },
      })
    );
  }, [bookingStatus, currentPage, pageCount]);

  // stop loading
  useEffect(() => {
    dispatch(onErrorStopLoadChef());
  }, [dispatch]);

  // Page change handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  // toggle read more
  const handleReadMore = (e, id) => {
    e.stopPropagation();
    setIsReadMore(!isReadMore);
    setReadMoreId(id);
  };

  // open booking detail page
  const handleOpenDetailPage = (id) => {
    navigate(`/booking-details?id=${id}`, { state: "/new-booking" });
  };

  return (
    <>
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
                  onClick={() => setBookingStatus("pending")}
                  className="nav-link bookingNavHeader active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  New Bookings{" "}
                </button>
                <button
                  onClick={() => setBookingStatus("accepted")}
                  className="nav-link bookingNavHeader"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Accepted
                </button>
                <button
                  onClick={() => setBookingStatus("completed")}
                  className="nav-link bookingNavHeader"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Completed
                </button>
              </div>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div
                      className={
                        bookingRequest && bookingRequest.length > 0
                          ? "profileDetail"
                          : ""
                      }
                    >
                      {bookingRequest && bookingRequest.length > 0 ? (
                        <>
                          {bookingRequest?.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => handleOpenDetailPage(item?._id)}
                              className="homeProfileBox all-bookings-height cursor-booking"
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
                                    onClick={(e) =>
                                      handleReadMore(e, item?._id)
                                    }
                                    className="read-more-desp"
                                  >
                                    {isReadMore && readMoreId === item?._id
                                      ? "Less..."
                                      : "More..."}
                                  </span>
                                )}
                              </p>
                            </div>
                          ))}
                        </>
                      ) : (
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
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {bookingRequest && bookingRequest.length > 0 && (
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
    </>
  );
};

export default NewBooking;
