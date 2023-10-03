import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/common/shared/CustomModal";
import AddExpertiseModal from "../../../components/common/shared/addExpertiseModal";
import MyavailabilityModal from "../../../components/common/shared/myavailabilityModal";
import RatingReviewsModal from "../../../components/common/shared/ratingReviewsModal";
import { useAuthSelector } from "../../../../redux/selector/auth";
import {
    getChefProfileDetails,
    onErrorStopLoad,
} from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";

const MyProfile = () => {
    const [key, setKey] = useState(Math.random());
    const authData = useAuthSelector();
    const dispatch = useDispatch();
    const userId = localStorage.getItem("userId");
    const [chefProfileData, setProfileData] = useState([]);
    const [activeWeekDay, setActiveWeekDay] = useState("");
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

    const handleUserProfile = (flag) => {
        setModalDetail({
            show: true,
            flag: flag,
            type: flag,
        });
        setKey(Math.random());
    };

    useEffect(() => {
        let params = {
            userid: userId,
        };
        dispatch(
            getChefProfileDetails({
                ...params,
                cb(res) {
                    setProfileData(res.data.data);
                },
            })
        );
    }, []);

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

    return (
        <>
            <section className="profilesection">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5 col-md-12">
                            {/* left section  */}
                            <div className="profileleft">
                                <img
                                    src={Images.chefProfile}
                                    alt="chefProfileimg"
                                    className="chefprofileimg"
                                />
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-12">
                            {/* right section  */}
                            <div className="profileright">
                                <div className="reviewsection">
                                    <div className="stars">
                                        <img
                                            src={Images.star}
                                            alt="starimg"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="reviews" onClick={() => {
                                            handleUserProfile("ratingReviewsModal");
                                        }} >
                                        <p className="cheftext p-0">My Ratings & Reviews</p>
                                        <p className="chatheadtext">4.5 (845 Reviews)</p>
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

                                    <div className="nameprofile">
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
                                    <div className="experprofile">
                                        <div className="chefname">
                                            <p className="dummyText p-0">Chef Type</p>
                                            <div className="restroinfo">
                                                <p className="nameheading">
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
                                                {chefProfileData?.chefInfo?.experience}Years
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
                                        <p className="nameheading">My Expertise</p>
                                        <button
                                            className="modalclearAll"
                                            onClick={() => {
                                                handleUserProfile("addExpertiseModal");
                                            }}
                                        >
                                            + Add
                                        </button>
                                    </div>
                                    <div className="chefexpertise">
                                        {chefProfileData?.chefInfo?.expertise?.length > 0 ? (
                                            <>
                                                {chefProfileData?.chefInfo?.expertise?.map(
                                                    (item, index) => (
                                                        <div key={index} className="expertisevalue">
                                                            <p className="expertheading">{item}</p>
                                                        </div>
                                                    )
                                                )}
                                            </>
                                        ) : (
                                            <p className="expertheading">N/A</p>
                                        )}
                                    </div>
                                </div>
                                <div className="availabilitydetails">
                                    <div className="myexpertise">
                                        <p className="nameheading">My Availability</p>
                                        <button className="modalclearAll" onClick={() => {
                                            handleUserProfile("addAvailabilityModal");
                                        }}>+ Add</button>
                                    </div>
                                    <ul className="myavailability">
                                        {week.map((day, index) => (
                                            <>
                                                <li className="dayavailability">
                                                    <p
                                                        className={
                                                            activeWeekDay === day.day
                                                                ? "notificationText active text-capitalize bg-danger"
                                                                : "notificationText text-capitalize"
                                                        }
                                                    >
                                                        {day.day}
                                                    </p>
                                                </li>
                                            </>
                                        ))}
                                    </ul>
                                    <div className="cheftime">
                                        <div className="expertisevalue">
                                            <p className="expertheading">09:00 am - 12:30 pm</p>
                                        </div>
                                        <div className="expertisevalue">
                                            <p className="expertheading">02:00 pm - 04:00 pm</p>
                                        </div>
                                        <div className="expertisevalue">
                                            <p className="expertheading">06:30 pm - 10:20 pm</p>
                                        </div>
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
                ids={modalDetail.flag === "addExpertiseModal" ? "foodexpert" : modalDetail.flag === "addAvailabilityModal" ? "myAvailability" : modalDetail.flag === "ratingReviewsModal" ? "ratingAndReview" :""}
                child={
                    modalDetail.flag === "addExpertiseModal" ? (
                        <AddExpertiseModal close={() => handleOnCloseModal()} />
                    ) : modalDetail.flag === "addAvailabilityModal" ? (
                        <MyavailabilityModal close={() => handleOnCloseModal()} />
                    )
                    : modalDetail.flag === "ratingReviewsModal" ? (
                        <RatingReviewsModal close={() => handleOnCloseModal()} />
                    )
                        :
                        ''
                }
                header={
                    modalDetail.flag === "addExpertiseModal" ? (
                        <>
                            <h2 className="modal_Heading">Add Expetise</h2>
                            <p onClick={handleOnCloseModal} className="modal_cancel">
                                <img src={Images.modalCancel} className="ModalCancel" />
                            </p>
                        </>
                    ):
                    modalDetail.flag === "addAvailabilityModal" ? (
                        <>
                            <h2 className="modal_Heading">My Availability</h2>
                            <p onClick={handleOnCloseModal} className="modal_cancel">
                                <img src={Images.modalCancel} className="ModalCancel" />
                            </p>
                        </>
                    ) :
                    modalDetail.flag === "ratingReviewsModal" ? (
                        <>
                            <h2 className="modal_Heading">Rating & Reviews</h2>
                            <p onClick={handleOnCloseModal} className="modal_cancel">
                                <img src={Images.modalCancel} className="ModalCancel" />
                            </p>
                        </>
                    )  : (
                        ""
                    )
                }
                onCloseModal={() => handleOnCloseModal()}
            />
        </>
    );
};

export default MyProfile;
