import React, { useCallback, useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as Images from "../../../utilities/images";
import MultiStepProgressBar from "./component/multiStepProgressBar";
import "react-phone-input-2/lib/style.css";
import { useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import CustomModal from "../../components/common/shared/CustomModal";
import AddExpertise from "../../components/common/shared/AddExpertise";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import DatePicker from "react-datepicker";
import { chefSetupProfile } from "../../../redux/slices/auth";

const SetupProfile = () => {
  const [activeTab, setActiveTab] = useState("restaurant");
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  const [page, setPage] = useState("pageone");
  const [pageNumber, setPageNumber] = useState(2);
  const [key, setKey] = useState(Math.random());
  const [startDate, setStartDate] = useState(new Date());
  const [experticeValue, setExperticeValue] = useState([]);
  const [formData, setFormData] = useState({
    experience: "",
    address: "",
    bio: "",
  });

  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  //onchange input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  //onDrop
  const onDrop = useCallback((acceptedFiles) => {
    const imageFile = acceptedFiles[0];
    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
      toast.error("Please select a valid image.");
      return false;
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
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

  //next page
  const nextPage = (page) => {
    setPage(page);
  };

  //form login
  const handleSubmit = (e, flag) => {
    e.preventDefault();
    if (flag == 1) {
      const updateExperticeValues = experticeValue.filter((value) => {
        return value != "";
      });
      let params = {
        step: "1",
        type: activeTab,
        experience: formData.experience,
        address: formData.address,
        bio: formData.bio,
        expertise: updateExperticeValues,
        
      };

      dispatch(
        chefSetupProfile({
          ...params,
          cb(res) {
            if (res.status === 200) {
              setPageNumber(2);
              nextPage("pagetwo");
            }
          },
        })
      );
    } else if (flag == 2) {
      setPageNumber(3);
      nextPage("pagethree");
    }
  };

  const handleBack = (e, flag) => {
    e.preventDefault();
    if (flag == "pageoneback") {
      nextPage("pageone");
    }
    if (flag == "pagetwoback") {
      nextPage("pagetwo");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Sign-Up";
  }, []);

  return (
    <>
      <section className="outerBoxmain">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <figure>
                <img
                  src={Images.Logo}
                  alt="logo"
                  className="img-fluid logoMain"
                />
              </figure>
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="login_details">
                    <h1 className="setUpHeading">Setup Profile</h1>
                    <div className="stepProgress mt-4">
                      <div className="progressBox">
                        <div className="row">
                          <div className="col-lg-6">
                            <MultiStepProgressBar page={page} />
                          </div>
                          <div className="col-lg-6 text-end">
                            <button className="PersonalDetails" type="button">
                              Personal Details
                            </button>
                          </div>
                        </div>
                      </div>
                      {
                        {
                          pageone: (
                            <>
                              <div className="row">
                                <h6 className="Headingsmall">
                                  Add Personal Details
                                </h6>
                                <div className="col-lg-6">
                                  <div className="input-container mt-3">
                                    <label className="border-label">
                                      Chef Type
                                    </label>
                                    <ul className="border-input cheftypeBox">
                                      <li
                                        className={`chefType ${
                                          activeTab === "restaurant"
                                            ? "active"
                                            : path == "/restaurant"
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          setActiveTab("restaurant")
                                        }
                                      >
                                        Restaurant
                                        <img
                                          src={Images.chefType}
                                          alt="InfoIcon"
                                          className="InfoIcon"
                                          id="Restaurant"
                                        />
                                        <img
                                          src={Images.chefTypeActive}
                                          alt="InfoIcon"
                                          className="InfoIconActive img-fluid d-none"
                                        />
                                      </li>
                                      <li
                                        className={`chefType ${
                                          activeTab === "home"
                                            ? "active"
                                            : path == "/home"
                                            ? "active"
                                            : ""
                                        }`}
                                        onClick={() => setActiveTab("home")}
                                      >
                                        Home
                                        <img
                                          src={Images.chefType}
                                          alt="InfoIcon"
                                          className="InfoIcon"
                                          id="Home"
                                        />
                                        <img
                                          src={Images.chefTypeActive}
                                          alt="InfoIcon"
                                          className="InfoIconActive img-fluid d-none"
                                        />
                                      </li>
                                    </ul>
                                    <Tooltip
                                      anchorSelect="#Restaurant"
                                      content="The chef will prepare exquisite dishes at the restaurant and deliver them to the customer's location."
                                    />
                                    <Tooltip
                                      anchorSelect="#Home"
                                      content="The chef will prepare and deliver delectable dishes from either their own kitchen or the customer's kitchen."
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="input-container mt-3">
                                    <input
                                      onChange={(e) => handleChange(e)}
                                      type="text"
                                      name="experience"
                                      className="border-input"
                                      placeholder="Add experience"
                                    />
                                    <img
                                      src={Images.Experience}
                                      alt="InfoIcon"
                                      className="InputIcon"
                                    />
                                    <label className="border-label">
                                      Experience (In Years)
                                    </label>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="input-container mt-5">
                                    <input
                                      onChange={(e) => handleChange(e)}
                                      type="text"
                                      name="address"
                                      className="border-input"
                                      placeholder="Add address"
                                    />
                                    <label className="border-label">
                                      Address
                                    </label>
                                    <img
                                      src={Images.Location}
                                      alt="InfoIcon"
                                      className="InputIcon"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="input-container mt-5">
                                    <textarea
                                      onChange={(e) => handleChange(e)}
                                      name="bio"
                                      className="border-input"
                                      placeholder="Add your bio"
                                    ></textarea>
                                    <label className="border-label">Bio</label>
                                  </div>
                                </div>
                                <div className="flexBox justify-content-between mt-5">
                                  <h6 className="Headingsmall m-0">
                                    Add Expertise
                                  </h6>
                                  <button
                                    type="button"
                                    className="addButton"
                                    onClick={() => {
                                      setModalDetail({
                                        show: true,
                                        flag: "AddExpertise",
                                      });
                                      setKey(Math.random());
                                    }}
                                  >
                                    <i class="las la-plus"></i>Add
                                  </button>
                                </div>
                                <div className="expertiseAdded mt-3 d-none">
                                  <ul>
                                    <li className="expertiseList">
                                      North Indian
                                    </li>
                                    <li className="expertiseList">Chicken</li>
                                    <li className="expertiseList">Soups</li>
                                    <li className="expertiseList">
                                      North Indian
                                    </li>
                                    <li className="expertiseList">Chicken</li>
                                    <li className="expertiseList">Soups</li>
                                    <li className="expertiseList">
                                      North Indian
                                    </li>
                                    <li className="expertiseList">Chicken</li>
                                    <li className="expertiseList">Soups</li>
                                    <li className="expertiseList">
                                      North Indian
                                    </li>
                                    <li className="expertiseList">Chicken</li>
                                    <li className="expertiseList">Soups</li>
                                  </ul>
                                </div>
                              </div>
                              <button
                                className="submit_btn w-100 mt-5"
                                onClick={(e) => handleSubmit(e, "1")}
                                type="submit"
                              >
                                <span className="smallBtn">Next</span>
                              </button>
                            </>
                          ),
                          pagetwo: (
                            <>
                              <h6 class="Headingsmall">Upload Documents</h6>
                              <p className="subHeadingSmall mb-4">
                                Upload your passport or certificate for the
                                verifications.
                              </p>
                              <div className="form-group col-md-12 mb-3">
                                <div className="uploadImgebox">
                                  <div
                                    {...getRootProps({ className: "dropzone" })}
                                  >
                                    <input
                                      type="file"
                                      accept="image/png, image/jpeg"
                                      {...getInputProps()}
                                    />
                                    <img
                                      src={Images.Uploadicon}
                                      alt="Uploadicon"
                                      className="Uploadicon"
                                    />
                                    <p className="uploadbtnn">Choose File</p>

                                    <p className="HeadingSmall">
                                      Drag and drop or Upload File Here
                                    </p>
                                    <p className="uploadText mt-2">
                                      5 mb max file size
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flexBox justify-content-center mt-3">
                                <button
                                  onClick={(e) => handleBack(e, "pageoneback")}
                                  className="submit_btn"
                                  type="submit"
                                >
                                  <span className="addMore me-3">
                                    <i class="las la-angle-left"></i> Back
                                  </span>
                                </button>
                                <button
                                  onClick={(e) => handleSubmit(e, "2")}
                                  className="submit_btn"
                                  type="submit"
                                >
                                  <span className="smallBtn disable">Next</span>
                                </button>
                              </div>
                            </>
                          ),
                          pagethree: (
                            <>
                              <h6 class="Headingsmall">Set Availability</h6>
                              <p className="subHeadingSmall mb-4">
                                Add your available time slots.
                              </p>
                              <div className="availability mt-3 mb-5">
                                <ul className="weekBox">
                                  <li
                                    className={`weekDays ${
                                      activeTab === "Mon"
                                        ? "active"
                                        : path == "/mon"
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() => setActiveTab("Mon")}
                                  >
                                    Mon
                                  </li>
                                  <li
                                    className={`weekDays ${
                                      activeTab === "Tue"
                                        ? "active"
                                        : path == "/Tue"
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() => setActiveTab("Tue")}
                                  >
                                    Tue
                                  </li>
                                  <li
                                    className={`weekDays ${
                                      activeTab === "Wed"
                                        ? "active"
                                        : path == "/Wed"
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() => setActiveTab("Wed")}
                                  >
                                    Wed
                                  </li>
                                  <li
                                    className={`weekDays ${
                                      activeTab === "Thu"
                                        ? "active"
                                        : path == "/Thu"
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() => setActiveTab("Thu")}
                                  >
                                    Thu
                                  </li>
                                  <li
                                    className={`weekDays ${
                                      activeTab === "Fri"
                                        ? "active"
                                        : path == "/Fri"
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() => setActiveTab("Fri")}
                                  >
                                    Fri
                                  </li>
                                  <li
                                    className={`weekDays ${
                                      activeTab === "Sat"
                                        ? "active"
                                        : path == "/Sat"
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() => setActiveTab("Sat")}
                                  >
                                    Sat
                                  </li>
                                  <li
                                    className={`weekDays ${
                                      activeTab === "Sun"
                                        ? "active"
                                        : path == "/Sun"
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() => setActiveTab("Sun")}
                                  >
                                    Sun
                                  </li>
                                </ul>
                                <div className="timeSlotBox pb-5">
                                  <h6 class="HeadingsmallText">Time Slots</h6>
                                  <hr className="borderBottom"></hr>
                                  <div className="row">
                                    <div className="col-lg-5">
                                      <div className="input-container mt-2">
                                        <p className="border-input">From</p>
                                        <div className="dateBox">
                                          <DatePicker
                                            selected={startDate}
                                            onChange={(date) =>
                                              setStartDate(date)
                                            }
                                          />
                                          <img
                                            src={Images.ClockIcon}
                                            alt="ClockIcon"
                                            className="ClockIcon"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-5">
                                      <div className="input-container mt-2">
                                        <p className="border-input">To</p>
                                        <div className="dateBox">
                                          <DatePicker
                                            selected={startDate}
                                            onChange={(date) =>
                                              setStartDate(date)
                                            }
                                          />
                                          <img
                                            src={Images.ClockIcon}
                                            alt="ClockIcon"
                                            className="ClockIcon"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-lg-2 text-center">
                                      <div className="deleteBox">
                                        <img
                                          src={Images.DeleteIcon}
                                          alt="ClockIcon"
                                          className="DeleteIcon"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flexBox mt-2">
                                    <button type="button" className="addButton">
                                      <i class="las la-plus"></i>Add Time Slot{" "}
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="flexBox justify-content-center">
                                <button
                                  onClick={(e) => handleBack(e, "pagetwoback")}
                                  className="submit_btn"
                                  type="submit"
                                >
                                  <span className="addMore me-3">
                                    <i class="las la-angle-left"></i> Back
                                  </span>
                                </button>
                                <button className="submit_btn" type="submit">
                                  <span className="smallBtn">Continue</span>
                                </button>
                              </div>
                            </>
                          ),
                        }[page]
                      }
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
          modalDetail.flag === "AddExpertise" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "AddExpertise" ? "AddExpertise" : ""}
        child={
          modalDetail.flag === "AddExpertise" ? (
            <AddExpertise
              setExperticeValue={setExperticeValue}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "AddExpertise" ? (
            <>
              <h2 className="modal_Heading">Add Expertise</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img src={Images.modalCancel} className="ModalCancel" />
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

export default SetupProfile;
