import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/common/shared/CustomModal";
import AddExpertiseModal from "../../../components/common/shared/addExpertiseModal";
import MyavailabilityModal from "../../../components/common/shared/myavailabilityModal";
import RatingReviewsModal from "../../../components/common/shared/ratingReviewsModal";
import {
  getChefProfileDetails,
  onErrorStopLoad,
  toggleAvailabilty,
} from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import moment from "moment";
import { getRating } from "../../../../redux/slices/user";
import { useAuthSelector } from "../../../../redux/selector/auth";
import LogoutModal from "../../../components/common/shared/logoutModal";

const MyProfile = () => {
  const [key, setKey] = useState(Math.random());
  const dispatch = useDispatch();
  const authData = useAuthSelector();
  const userId = localStorage.getItem("userId");
  const [chefProfileData, setProfileData] = useState([]);
  const [activeWeekDay, setActiveWeekDay] = useState("");
  const [expertice, setExpertice] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [profileUrl, setProfileUrl] = useState("");
  const [allRating, setAllRating] = useState([]);
  const [chefAvailability, setChefAvailability] = useState("");
  const [getActiveRating, setGetActiveRating] = useState("All");
  const [slotTime, setSlotTimes] = useState({
    startTime: "",
    endTime: "",
  });
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
    if (flag === "addAvailabilityModal") {
      setActiveWeekDay("");
    }
  };

  // getting chef profile information
  useEffect(() => {
    chefProfileDetails();
    handleSelectAvailabilityByDay();
  }, [userId]);

  // select availability by day
  const handleSelectAvailabilityByDay = () => {
    const weekDay = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const todayDate = new Date();
    let day = weekDay[todayDate.getDay()];
    handleSlotTime(day);
  };

  // get chef rating information
  useEffect(() => {
    handleGetChefReating();
  }, [getActiveRating]);

  // get chef details
  const chefProfileDetails = () => {
    let params = {
      userid: userId,
    };
    dispatch(
      getChefProfileDetails({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            setProfileData(res?.data?.data);
            setExpertice(res?.data?.data?.chefInfo?.expertise);
            setAvailability(res?.data?.data?.chefInfo?.availability);
            setProfileUrl(res?.data?.data?.userInfo?.profilePhoto);
            setChefAvailability(res?.data?.data?.chefInfo?.isAvailable);
          }
        },
      })
    );
  };

  // get all chef
  const handleGetChefReating = () => {
    let params = {
      chefId: authData?.userInfo?.id,
      rating: getActiveRating === "All" ? "" : getActiveRating,
    };
    dispatch(
      getRating({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setAllRating(res?.data?.data);
          }
        },
      })
    );
  };

  // week days
  const week = [
    {
      day: "mon",
      id: 1,
    },
    {
      day: "tue",
      id: 2,
    },
    {
      day: "wed",
      id: 3,
    },
    {
      day: "thu",
      id: 4,
    },
    {
      day: "fri",
      id: 5,
    },
    {
      day: "sat",
      id: 6,
    },
    {
      day: "sun",
      id: 7,
    },
  ];

  // add slot times
  const handleSlotTime = (weekDay) => {
    setActiveWeekDay(weekDay);
    const updateSlotTimes = chefProfileData?.chefInfo?.availability?.find(
      (day) => {
        return day?.day === weekDay;
      }
    );
    setSlotTimes({
      startTime: updateSlotTimes?.startTime,
      endTime: updateSlotTimes?.endTime,
    });
  };

  // stop loader on refresh page
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // toggle availability
  const handleToggleAvailabilty = (e) => {
    const { checked } = e.target;
    let params = {
      isAvailable: checked,
    };
    dispatch(
      toggleAvailabilty({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            chefProfileDetails();
          }
        },
      })
    );
  };

  return (
    <>
      <section className="profilesectionChef">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              {/* left section  */}
              <div className="profileleft">
                <img
                  src={profileUrl ? profileUrl : Images.dummyProfile}
                  alt="chefProfileimg"
                  className="chefprofileimg_"
                />
              </div>
              <div
                className="settingBox d-flex align-items-center justify-content-center cursorPoint"
                onClick={() => {
                  handleOpenModal("logOutModal");
                }}
              >
                <img
                  src={Images.logout}
                  alt="logo"
                  className="img-fluid settingIcon "
                />
                <h2 className="settingBoxtxt ms-3 mb-0">Logout</h2>
              </div>
            </div>
            <div className="col-lg-7 col-md-12">
              {/* right section  */}
              <div className="profileright">
                <div className="d-flex align-items-center justify-content-between ">
                  <div className="reviewsection reviewsection-chef">
                    <div className="stars">
                      <img
                        src={Images.star}
                        alt="starimg"
                        className="img-fluid"
                      />
                    </div>
                    <div
                      className="reviews"
                      onClick={() => {
                        handleOpenModal("ratingReviewsModal");
                      }}
                    >
                      <p className="cheftext p-0">My Ratings & Reviews</p>
                      <p className="chatheadtext">
                        {allRating?.averageRating} (
                        {allRating?.details?.data?.length} Reviews)
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="dummyText p-0 me-2">
                      Availability For Booking
                    </span>
                    <label className="switch-outer-chef">
                      <input
                        checked={chefAvailability}
                        onChange={handleToggleAvailabilty}
                        type="checkbox"
                      />
                      <span className="slider-chef round-chef"></span>
                    </label>
                  </div>
                </div>
                {/* chefdata  */}
                <div className="chefdata">
                  <Link to="/edit-chef-profile">
                    <div className="editsection">
                      <img
                        src={Images.edit}
                        alt="editimage"
                        className="img-fluid"
                      />
                      <p className="editheading">Edit profile</p>
                    </div>
                  </Link>

                  <div className="name-profile-name">
                    <div className="firstname">
                      <p className="dummyText p-0">First Name</p>
                      <p className="nameheading">
                        {chefProfileData?.userInfo?.firstName}
                      </p>
                    </div>
                    <div className="lastname">
                      <p className="dummyText p-0">Last Name</p>
                      <p className="nameheading">
                        {chefProfileData?.userInfo?.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="emailheading">
                    <p className="dummyText p-0">Email</p>
                    <p className="nameheading">{chefProfileData?.email}</p>
                  </div>
                  <div className="expertise-profile">
                    <div>
                      <p className="dummyText p-0">Chef Type</p>
                      <div className="restroinfo">
                        <p className="nameheading text-capitalize ">
                          {chefProfileData?.chefInfo?.type}
                        </p>
                        <img
                          src={Images.chefType}
                          alt="cheftypeimage"
                          className="infoimg"
                        />
                        <div className="information">
                          <p className="chatSearchere_ ">
                            The chef will prepare exquisite dishes at the
                            restaurant and deliver them to the customer's
                            location.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="chefexp">
                      <p className="dummyText p-0">Experience</p>
                      <p className="nameheading">
                        {chefProfileData?.chefInfo?.experience} Years
                      </p>
                    </div>
                  </div>
                  <div className="adressection">
                    <div className="addressimg">
                      <img
                        src={Images.Location}
                        alt="locationimg"
                        className="img-fluid"
                      />
                    </div>
                    <div className="adressheading">
                      <p className="dummyText p-0">Address</p>
                      <p className="adresssub">
                        {chefProfileData?.chefInfo?.address}
                      </p>
                    </div>
                  </div>
                  <div className="adressection">
                    <div className="addressimg">
                      <img
                        src={Images.bio}
                        alt="locationimg"
                        className="img-fluid"
                      />
                    </div>
                    <div className="adressheading">
                      <p className="dummyText p-0">Bio</p>
                      <p className="adresssub">
                        {chefProfileData?.chefInfo?.bio}
                      </p>
                    </div>
                  </div>
                </div>
                {/* chef expertise  */}
                <div className="expertise">
                  <div className="myexpertise">
                    <p className="nameheading">Add Expertise</p>
                    <button
                      className="modalclearAll"
                      onClick={() => {
                        handleOpenModal("addExpertiseModal");
                      }}
                    >
                      + Add
                    </button>
                  </div>
                  <div className="chefexpertise">
                    {expertice?.length > 0 ? (
                      <>
                        {expertice
                          ?.filter((value) => value !== "")
                          ?.map((item, index) => (
                            <div key={index} className="expertisevalue">
                              <p className="expertheading">{item}</p>
                            </div>
                          ))}
                      </>
                    ) : (
                      <p className="expertheading">N/A</p>
                    )}
                  </div>
                </div>
                <div className="availabilitydetails">
                  <div className="myexpertise">
                    <p className="nameheading">My Availability</p>
                    <button
                      className="modalclearAll"
                      onClick={() => {
                        handleOpenModal("addAvailabilityModal");
                      }}
                    >
                      + Add
                    </button>
                  </div>
                  <ul className="myavailability">
                    {week.map((day, index) => (
                      <li
                        key={index}
                        onClick={() => handleSlotTime(day.day)}
                        className={
                          activeWeekDay === day.day
                            ? "dayavailability active"
                            : "dayavailability"
                        }
                      >
                        <p
                          className={
                            activeWeekDay === day.day
                              ? "notificationText text-capitalize text-white"
                              : "notificationText text-capitalize"
                          }
                        >
                          {day.day}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="cheftime">
                    {slotTime.startTime && slotTime.endTime && activeWeekDay ? (
                      <div className="expertisevalue">
                        <p className="expertheading">
                          {moment(slotTime.startTime, "h:mm A").format(
                            "h:mm A"
                          )}{" "}
                          -{" "}
                          {moment(slotTime.endTime, "h:mm A").format("h:mm A")}
                        </p>
                      </div>
                    ) : (
                      activeWeekDay && "N/A"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "addExpertiseModal"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "addExpertiseModal"
            ? "foodexpert"
            : modalDetail.flag === "addAvailabilityModal"
            ? "myAvailability"
            : modalDetail.flag === "ratingReviewsModal"
            ? "ratingAndReview"
            : modalDetail.flag === "logOutModal"
            ? "logout"
            : ""
        }
        child={
          modalDetail.flag === "addExpertiseModal" ? (
            <AddExpertiseModal
              setExperticeValue={setExpertice}
              experticeValue={expertice}
              chefProfileDetails={chefProfileDetails}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "addAvailabilityModal" ? (
            <MyavailabilityModal
              chefProfileDetails={chefProfileDetails}
              availabilityData={availability}
              handleSelectAvailabilityByDay={handleSelectAvailabilityByDay}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "ratingReviewsModal" ? (
            <RatingReviewsModal
              setGetActiveRating={setGetActiveRating}
              allRating={allRating}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "logOutModal" ? (
            <LogoutModal close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "addExpertiseModal" ? (
            <>
              <h2 className="modal_Heading">Add Expetise</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancel"
                />
              </p>
            </>
          ) : modalDetail.flag === "addAvailabilityModal" ? (
            <>
              <h2 className="modal_Heading">My Availability</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancel"
                />
              </p>
            </>
          ) : modalDetail.flag === "ratingReviewsModal" ? (
            <>
              <h2 className="modal_Heading">Rating & Reviews</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancel"
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
export default MyProfile;
