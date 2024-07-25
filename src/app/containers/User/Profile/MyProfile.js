import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { Link } from "react-router-dom";
import { getUserProfileDetails } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import CustomModal from "../../../components/common/shared/CustomModal";
import LogoutModal from "../../../components/common/shared/logoutModal";

const UserMyProfile = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [profile, setProfile] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState([]);
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  // getting user profile details
  useEffect(() => {
    let params = {
      userid: userId,
    };
    dispatch(
      getUserProfileDetails({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setProfile(res.data.data);
            setProfilePhoto(res.data.data.userInfo.profilePhoto);
          }
        },
      })
    );
  }, []);

  //closeModal
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };

  // open moadl
  const handleOpenModal = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  return (
    <>
      <div className="userprofilesection profilesection">
        <div className="row">
          <div className="col-lg-5 col-md-12">
            {/* left section  */}
            <div className="profileleft">
              <img
                src={profilePhoto ? profilePhoto : Images.dummyProfile}
                alt="chefSideProfile"
                className="chefprofileimg img-fluid"
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
            <Link
              to="/user-editprofile"
              className="d-flex justify-content-end myprofileLink"
            >
              <img src={Images.edit} alt="editimage" className="img-fluid" />
              <p className="editheading">Edit profile</p>
            </Link>
            <div className="profileright">
              {/* chefdata  */}
              <div className="profileinfosection">
                <div className="nameprofile">
                  <div className="firstname">
                    <h4 className="dummyText p-0">First Name</h4>
                    <h2 className="nameheading">
                      {profile?.userInfo?.firstName}
                    </h2>
                  </div>
                  <div className="lastname">
                    <h4 className="dummyText p-0">Last Name</h4>
                    <h2 className="nameheading">
                      {profile?.userInfo?.lastName}
                    </h2>
                  </div>
                </div>
                <div className="emailheading">
                  <h4 className="dummyText p-0">Email</h4>
                  <h2 className="nameheading">{profile?.email}</h2>
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
          modalDetail.flag === "logOutModal" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "logOutModal" ? "logout" : ""}
        child={
          modalDetail.flag === "logOutModal" ? (
            <LogoutModal close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default UserMyProfile;
