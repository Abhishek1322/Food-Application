import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/common/shared/CustomModal";
import AddAddressModal from "../../../components/common/shared/AddAddressModal";
import { getUserAddress, onErrorStopLoad } from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import EditAddressModal from "../../../components/common/shared/EditAddressModal";

const UserManageAddress = () => {
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
  const [address, setAddress] = useState([]);
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
  const handleUserProfile = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // getting user address
  useEffect(() => {
    handleGetUserAddress();
  }, []);

  const handleGetUserAddress = () => {
    dispatch(
      getUserAddress({
        cb(res) {
          if (res.status === 200) {
            setAddress(res.data.data);
          }
        },
      })
    );
  };

  return (
    <>
      <div className="settingmanagesection contactUs">
        <div className="commonInnerHeader d-flex align-items-center mt-4 ms-3">
          <Link to="/setting">
            <img
              src={Images.backArrowpassword}
              alt="arrowImg"
              className="img-fluid  innerHeaderArrow"
            />
          </Link>
          <h1 className="settingMainHeading text-align-center ">
            Manage Address
          </h1>
        </div>
        <div className="changepassword">
          <div className="logRight mt-5">
            <div className="changepasswordForm">
              <div className="changepasswordImg d-flex justify-content-center">
                <img
                  src={Images.ManageLocation}
                  alt="logo"
                  className="img-fluid  contactusImg"
                />
              </div>
              <h6 className="settingMainText mb-3 d-flex  justify-content-center mt-3">
                Add New and Edit your Saved Addresses
              </h6>
              {address && address.length > 0 ? (
                <>
                  {address?.map((item, index) => (
                    <div key={index} className="managehome mt-5 mb-3">
                      {console.log("itemmmmmmmmm", item)}
                      <img
                        src={
                          item.type === "home"
                            ? Images.ManageHome
                            : item.type === "office"
                            ? Images.ManageOffice
                            : item.type === "other"
                            ? Images.chatsDots
                            : ""
                        }
                        alt="Homeimg"
                        className="img-fluid"
                      />
                      <div className="managetext">
                        <h6 className="notificationText">{item?.type}</h6>
                        <p className="cheftext pt-1">{item?.streetAddress}</p>
                        <div class="dropdown  dropstart managedrop">
                          <img
                            src={Images.chatsDots}
                            className="dropdown-toggle manageimg"
                            alt="cartcancel"
                            data-bs-toggle="dropdown"
                          />
                          <ul class="dropdown-menu">
                            <li>
                              <a class="dropdown-item" href="#">
                                <img
                                  src={Images.EditImg}
                                  alt="editimage"
                                  className="img-fluid"
                                />{" "}
                                <span
                                  onClick={() => {
                                    handleUserProfile("editaddress");
                                  }}
                                  className="editdrop"
                                >
                                  Edit{" "}
                                </span>
                              </a>
                            </li>
                            <li>
                              <a class="dropdown-item " href="#">
                                <img
                                  src={Images.cartDelete}
                                  alt="editimage"
                                  className="img-fluid"
                                />{" "}
                                <span className="editdrop">Delete</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link to="#">
                    <h6
                      className="cancelOrder"
                      onClick={() => {
                        handleUserProfile("ordereditmodal");
                      }}
                    >
                      + Add New Address
                    </h6>
                  </Link>
                </>
              ) : (
                <div className="buttonBox mt-5 d-flex  justify-content-center">
                  <button
                    onClick={() => {
                      handleUserProfile("ordereditmodal");
                    }}
                    type="submit"
                    role="button"
                    className="smallBtn"
                  >
                    Add New Address
                  </button>
                </div>
              )}
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
          modalDetail.flag === "ordereditmodal"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "ordereditmodal"
            ? "ordereditaddress"
            : modalDetail.flag === "editaddress"
            ? "ordereditaddress"
            : ""
        }
        child={
          modalDetail.flag === "ordereditmodal" ? (
            <AddAddressModal
              handleGetUserAddress={handleGetUserAddress}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "editaddress" ? (
            <EditAddressModal
              handleGetUserAddress={handleGetUserAddress}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "ordereditmodal" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Add New Address</h2>
                  <p className="chatUser">Add Address below</p>
                </div>
              </div>
            </>
          ) : modalDetail.flag === "editaddress" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Edit Address</h2>
                  <p className="chatUser">Edit Address below</p>
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

export default UserManageAddress;
