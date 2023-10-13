import React, { useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import PayNowModal from "./PayNowModal";

const EditAddressModal = () => {
  const [key, setKey] = useState(Math.random());
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
  return (
    <>
      <div className="editadressection tabsection">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Office
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Other
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="tabbodysection">
              <div className="tabslocation">
                <img
                  src={Images.Target}
                  alt="locationtargetimg"
                  className="img-fluid"
                />
                <span className="modalclearAll">User Current Location</span>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="city"
                      className="border-input"
                      placeholder="New York"
                    />
                    <label className="border-label">City</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="input-container mt-4">
                    <select className="cateSelectbox border-input" required="">
                      <option value="">State</option>
                      <option>Category1</option>
                      <option>Category2</option>
                    </select>
                    <label className="border-label">Select</label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="Zip Code"
                      className="border-input"
                      placeholder="123"
                    />
                    <label className="border-label">Zip Code</label>
                    <img
                      src={Images.ZipCode}
                      alt="InfoIcon"
                      className="InputIcon"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="city"
                      className="border-input"
                      placeholder="Enter Address "
                    />
                    <label className="border-label">Street Address</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="city"
                      className="border-input"
                      placeholder="Enter Plot / Building Number"
                    />
                    <label className="border-label">
                      Plot / Building Number
                    </label>
                  </div>
                </div>
              </div>
              <div className="modalfooterbtn">
                <div className="addfoodbtn">
                  <button className="foodmodalbtn" type="submit">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="tabbodysection">
              <div className="tabslocation">
                <img
                  src={Images.Target}
                  alt="locationtargetimg"
                  className="img-fluid"
                />
                <span className="modalclearAll">User Current Location</span>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="city"
                      className="border-input"
                      placeholder="New York"
                    />
                    <label className="border-label">City</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="input-container mt-4">
                    <select className="cateSelectbox border-input" required="">
                      <option value="">State</option>
                      <option>Category1</option>
                      <option>Category2</option>
                    </select>
                    <label className="border-label">Select</label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="Zip Code"
                      className="border-input"
                      placeholder="123"
                    />
                    <label className="border-label">Zip Code</label>
                    <img
                      src={Images.ZipCode}
                      alt="InfoIcon"
                      className="InputIcon"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="city"
                      className="border-input"
                      placeholder="Enter Address "
                    />
                    <label className="border-label">Street Address</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="city"
                      className="border-input"
                      placeholder="Enter Plot / Building Number"
                    />
                    <label className="border-label">
                      Plot / Building Number
                    </label>
                  </div>
                </div>
              </div>
              <div className="modalfooterbtn">
                <div className="addfoodbtn">
                  <button className="foodmodalbtn" type="submit">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="tabbodysection">
              <div className="tabslocation">
                <img
                  src={Images.Target}
                  alt="locationtargetimg"
                  className="img-fluid"
                />
                <span className="modalclearAll">User Current Location</span>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="city"
                      className="border-input"
                      placeholder="New York"
                    />
                    <label className="border-label">City</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="input-container mt-4">
                    <select className="cateSelectbox border-input" required="">
                      <option value="">State</option>
                      <option>Category1</option>
                      <option>Category2</option>
                    </select>
                    <label className="border-label">Select</label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="Zip Code"
                      className="border-input"
                      placeholder="123"
                    />
                    <label className="border-label">Zip Code</label>
                    <img
                      src={Images.ZipCode}
                      alt="InfoIcon"
                      className="InputIcon"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="city"
                      className="border-input"
                      placeholder="Enter Address "
                    />
                    <label className="border-label">Street Address</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="city"
                      className="border-input"
                      placeholder="Enter Plot / Building Number"
                    />
                    <label className="border-label">
                      Plot / Building Number
                    </label>
                  </div>
                </div>
              </div>
              <div className="modalfooterbtn">
                <div className="addfoodbtn">
                  <button
                    className="foodmodalbtn"
                    type="submit"
                    onClick={() => {
                      handleUserProfile("paynow");
                    }}
                  >
                    Update & Save
                  </button>
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
          modalDetail.flag === "paynow" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "paynow" ? "paynowmodal" : ""}
        child={
          modalDetail.flag === "paynow" ? (
            <PayNowModal close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "paynow" ? (
            <>
              <div className="editadressheading">
                <img
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Pay Now</h2>
                  <p className="chatUser">Debit/Credit cards acceptable</p>
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

export default EditAddressModal;
