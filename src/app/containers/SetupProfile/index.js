import React, { useCallback, useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as Images from "../../../utilities/images";
import MultiStepProgressBar from "./component/multiStepProgressBar";
import "react-phone-input-2/lib/style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import CustomModal from "../../components/common/shared/CustomModal";
import AddExpertise from "../../components/common/shared/AddExpertise";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import auth, {
  chefSetupProfile,
  onErrorStopLoad,
  chefProfileDocument,
} from "../../../redux/slices/auth";
import Loading from "../Settings/Loading";
import { useAuthSelector } from "../../../redux/selector/auth";
import { getChefProfileDetails } from "../../../redux/slices/web";

const SetupProfile = () => {
  const [activeTab, setActiveTab] = useState("restaurant");
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useAuthSelector();
  const userId = localStorage.getItem("userId");
  const [page, setPage] = useState("pageone");
  const [pageNumber, setPageNumber] = useState(2);
  const [key, setKey] = useState(Math.random());
  const [experticeValue, setExperticeValue] = useState([]);
  const [pdfFiles, setPdfFiles] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [activeWeekDay, setActiveWeekDay] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [showTimeSlot, setShowTimeSlot] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [documentUrl, setDocumentUrl] = useState("");
  const [formData, setFormData] = useState({
    experience: "",
    bio: "",
    rateperhour: "",
  });
  console.log("availability", availability);
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  //onchange input
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // remove document
  const handleRemoveDocument = (name) => {
    if (pdfFiles.name === name) {
      setPdfFiles("");
      setDocumentUrl("");
    }
  };

  // getting document URL
  useEffect(() => {
    if (pdfFiles) {
      let params = {
        file: pdfFiles,
      };
      dispatch(
        chefProfileDocument({
          ...params,
          cb(res) {
            if (res.status === 200) {
              setDocumentUrl(res.data.data.fileUrl);
            }
          },
        })
      );
    }
  }, [pdfFiles]);

  //onDrop
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (
      rejectedFiles.length > 0 &&
      rejectedFiles[0]?.file?.type !== "application.pdf"
    ) {
      toast.error("Please upload PDF files only");
      return;
    }

    if (acceptedFiles[0].size > "5242880") {
      toast.error("Please upload file within 5 Mb");
      return;
    }
    setPdfFiles(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
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
      if (!formData.experience) {
        toast.error("Please add your experience");
        return;
      } else if (!address) {
        toast.error("Please add your address");
        return;
      } else if (!formData.bio) {
        toast.error("Please add your bio");
        return;
      } else if (!formData.rateperhour) {
        toast.error("Please add your rate per hour");
        return;
      }
      const updateExperticeValues = experticeValue?.filter((value) => {
        return value != "";
      });
      let params = {
        step: "1",
        type: activeTab,
        experience: formData.experience,
        address: address,
        bio: formData.bio,
        expertise: updateExperticeValues,
        ratePerHour: formData.rateperhour,
        coordinates: [latitude, longitude],
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
      const updateValue = availability
        .filter(
          (value) =>
            value.day !== "" &&
            value.timeSlots.from &&
            value.timeSlots.to !== undefined
        )
        .map((item, index) => {
          const { _id, ...rest } = item;
          return rest;
        });

      let params = {
        step: "2",
        availability: updateValue,
      };
      dispatch(
        chefSetupProfile({
          ...params,
          cb(res) {
            if (res.status === 200) {
              setPageNumber(3);
              nextPage("pagethree");
            }
          },
        })
      );
    } else if (flag == 3) {
      if (!documentUrl) {
        toast.error("Please upload your document");
        return;
      }
      let params = {
        step: "3",
        verificationDocument: documentUrl,
      };
      dispatch(
        chefSetupProfile({
          ...params,
          cb(res) {
            if (res.status === 200) {
              navigate("/request");
            }
          },
        })
      );
    }
  };

  // go one step back
  const handleBack = (e, flag) => {
    e.preventDefault();
    if (flag == "pageoneback") {
      nextPage("pageone");
    }
    if (flag == "pagetwoback") {
      nextPage("pagetwo");
    }
  };

  // stop loader onm page refresh
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // handle change address
  const autoCompleteHandleChange = (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => {
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
      })
      .catch((error) => { });
  };

  // select address
  const autoCompleteHandleSelect = (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => {
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
      })
      .catch((error) => { });
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

  const handleWeekDay = (e, day) => {
    setActiveWeekDay(day);
    const getPreviousFromTime = availability?.find((item, index) => {
      return item?.day === day;
    });
    setStartTime(getPreviousFromTime?.timeSlots?.from);
    const getPreviousToTime = availability?.find((item, index) => {
      return item?.day === day;
    });
    setEndTime(getPreviousToTime?.timeSlots?.to);
    if (availability && availability.length < 0) {
      setShowTimeSlot(true);
    }
  };

  // close time slot
  const handleCloseTimeSlot = () => {
    setShowTimeSlot(false);
    setActiveWeekDay("");
    const deleteAvailability = availability.filter((item, index) => {
      return item.day !== activeWeekDay;
    });
    setAvailability(deleteAvailability);
  };

  // show time slot
  const handleShowSlot = () => {
    if (!activeWeekDay) {
      toast.error("Please select slot day first");
      return;
    }
    setShowTimeSlot(true);
  };

  useEffect(() => {
    setAvailability((prevAvailability) => {
      const dayIndex = prevAvailability.findIndex(
        (item) => item.day === activeWeekDay
      );

      if (dayIndex !== -1) {
        return prevAvailability.map((item, index) => {
          if (index === dayIndex) {
            return {
              ...item,
              timeSlots: {
                from: startTime,
                to: endTime,
              },
            };
          }
          return item;
        });
      } else {
        return [
          ...prevAvailability,
          {
            day: activeWeekDay,
            timeSlots: {
              from: startTime,
              to: endTime,
            },
          },
        ];
      }
    });
  }, [startTime, endTime, activeWeekDay]);
  // getting startTime slot
  const handleStartTime = (value) => {
    setStartTime(value);
  };

  // getting EndTime slot
  const handleEndTime = (value) => {
    setEndTime(value);
  };

  // getting chef profile information
  useEffect(() => {
    chefProfileDetails();
  }, []);

  const chefProfileDetails = () => {
    let params = {
      userid: userId,
    };
    dispatch(
      getChefProfileDetails({
        ...params,
        cb(res) {
          console.log("setLoggggg", res);
          if (res.status === 200) {
            setActiveTab(res.data.data.chefInfo.type);
            setExperticeValue(res?.data?.data?.chefInfo?.expertise);
            setFormData({
              experience: res.data.data.chefInfo.experience,
              bio: res.data.data.chefInfo.bio,
              rateperhour: res.data.data.chefInfo.ratePerHour,
            });
            setAddress(res.data.data.chefInfo.address);
            setLatitude(res.data.data.chefInfo.coordinates[0]);
            setLongitude(res.data.data.chefInfo.coordinates[1]);
            const removeId = res.data.data.chefInfo.availability?.map(
              (item, index) => {
                const { _id, ...rest } = item;
                return item;
              }
            );
            setAvailability(removeId);
            if (res.data.data.chefInfo.step === "1") {
              setPage("pagetwo");
            }
            if (res.data.data.chefInfo.step === "2") {
              setPage("pagethree");
            }
          }
        },
      })
    );
  };

  return (
    <>
      {authData.loading && <Loading />}
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
                                        className={`chefType ${activeTab === "restaurant"
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
                                        className={`chefType ${activeTab === "home"
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
                                      type="number"
                                      name="experience"
                                      className="border-input"
                                      placeholder="Add experience"
                                      value={formData.experience}
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
                                  <div className="input-container locationData mt-5">
                                    <PlacesAutocomplete
                                      className=""
                                      autoComplete="off"
                                      value={address}
                                      onChange={autoCompleteHandleChange}
                                      onSelect={autoCompleteHandleSelect}
                                      searchOptions={{
                                        componentRestrictions: {
                                          country: ["Ind"],
                                        },
                                      }}
                                    >
                                      {({
                                        getInputProps,
                                        suggestions,
                                        getSuggestionItemProps,
                                        loading,
                                      }) => (
                                        <div>
                                          <input
                                            {...getInputProps({
                                              placeholder: "Street Address",
                                              className:
                                                "location-search-input customform-control border-input",
                                            })}
                                          />
                                          <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(
                                              (suggestion, index) => {
                                                const className =
                                                  suggestion.active
                                                    ? "suggestion-item--active"
                                                    : "suggestion-item";
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                  ? {
                                                    backgroundColor:
                                                      "#41b6e6",
                                                    cursor: "pointer",
                                                  }
                                                  : {
                                                    backgroundColor:
                                                      "#ffffff",
                                                    cursor: "pointer",
                                                  };
                                                return (
                                                  <div
                                                    {...getSuggestionItemProps(
                                                      suggestion,
                                                      {
                                                        className,
                                                        style,
                                                      }
                                                    )}
                                                    key={index}
                                                  >
                                                    <span>
                                                      {suggestion.description}
                                                    </span>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                          <img
                                            src={Images.Location}
                                            alt="InfoIcon"
                                            className="InputIcon"
                                          />
                                        </div>
                                      )}
                                    </PlacesAutocomplete>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="input-container mt-5">
                                    <textarea
                                      onChange={(e) => handleChange(e)}
                                      name="bio"
                                      className="border-input"
                                      placeholder="Add your bio"
                                      value={formData.bio}
                                    ></textarea>
                                    <label className="border-label">Bio</label>
                                  </div>
                                </div>

                                <div className="col-lg-12">
                                  <div className="input-container mt-5">
                                    <input
                                      onChange={(e) => handleChange(e)}
                                      type="text"
                                      name="rateperhour"
                                      className="border-input"
                                      placeholder="Rate per hour"
                                      value={formData.rateperhour}
                                    />
                                    <label className="border-label">
                                      Rate Per Hour
                                    </label>
                                    <img
                                      src={Images.ratePerHourImg}
                                      alt="InfoIcon"
                                      className="InputIcon"
                                    />
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
                                <div className="expertiseAdded mt-3">
                                  <ul>
                                    {experticeValue
                                      ?.filter((value) => value !== "")
                                      ?.map((value, index) => (
                                        <li className="expertiseList">
                                          {value}
                                        </li>
                                      ))}
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
                              <h6 className="Headingsmall">Set Availability</h6>
                              <p className="subHeadingSmall mb-4">
                                Add your available time slots.
                              </p>
                              <div className="availability mt-3 mb-5">
                                <ul className="weekBox">
                                  {week.map((day, index) => (
                                    <>
                                      <li
                                        onClick={(e) =>
                                          handleWeekDay(e, day.day)
                                        }
                                        className={
                                          activeWeekDay === day.day
                                            ? "weekDays active text-capitalize"
                                            : "weekDays text-capitalize"
                                        }
                                      >
                                        {day.day}
                                      </li>
                                    </>
                                  ))}
                                </ul>
                                <div className="timeSlotBox pb-5">
                                  <h6 className="HeadingsmallText">
                                    Availability{" "}
                                  </h6>
                                  <hr className="borderBottom"></hr>

                                  {showTimeSlot && (
                                    <>
                                      <div className="row">
                                        <div className="col-lg-5">
                                          <div className="input-container mt-2">
                                            {/* <p className="border-input">From</p> */}
                                            {/* <div className="dateBox">
                                            <TimePicker
                                              onChange={handleStartTime}
                                              value={startTime}
                                              format="h:mm a"
                                              showLeadingZeros={false}
                                              amPmAriaLabel="Select AM/PM"
                                              className="custom-time-picker customPicker"
                                            />
                                            <img
                                              src={Images.ClockIcon}
                                              alt="ClockIcon"
                                              className="ClockIcon"
                                            />
                                          </div> */}
                                            <div className="myavailability mt-4">
                                              <div className="availability_Box ">
                                                <p className="innerBoxText">
                                                  From
                                                </p>
                                                <div className="availableTime flexBox ">
                                                  <img
                                                    src={
                                                      Images.availabilityClock
                                                    }
                                                    className="clockImg pe-1"
                                                    alt="clockImg"
                                                  />
                                                  <TimePicker
                                                    disableClock
                                                    clearIcon=""
                                                    onChange={handleStartTime}
                                                    value={startTime}
                                                    format="h:mm a"
                                                    showLeadingZeros={false}
                                                    amPmAriaLabel="Select AM/PM"
                                                    className="custom-time-picker customPicker"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-5">
                                          <div className="input-container mt-2">
                                            {/* <div className="dateBox">
                                            <TimePicker
                                              onChange={handleEndTime}
                                              value={endTime}
                                            />
                                            <img
                                              src={Images.ClockIcon}
                                              alt="ClockIcon"
                                              className="ClockIcon"
                                            />
                                          </div> */}
                                            {/* <p className="border-input">
                                                From
                                              </p>

                                              <img
                                                src={Images.availabilityClock}
                                                className="clockImg pe-1"
                                              />
                                              <TimePicker
                                                disableClock
                                                clearIcon=""
                                                onChange={handleEndTime}
                                                value={endTime}
                                                format="h:mm a"
                                                showLeadingZeros={false}
                                                amPmAriaLabel="Select AM/PM"
                                                className="custom-time-picker customPicker"
                                              /> */}
                                            <div className="myavailability mt-4 ">
                                              <div className="availability_Box  ms-3">
                                                <p className="innerBoxText">
                                                  To
                                                </p>
                                                <div className="availableTime flexBox ">
                                                  <img
                                                    src={
                                                      Images.availabilityClock
                                                    }
                                                    className="clockImg pe-1"
                                                    alt="clockImg"
                                                  />
                                                  <TimePicker
                                                    disableClock
                                                    clearIcon=""
                                                    onChange={handleEndTime}
                                                    value={endTime}
                                                    format="h:mm a"
                                                    showLeadingZeros={false}
                                                    amPmAriaLabel="Select AM/PM"
                                                    className="custom-time-picker customPicker"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-2 text-center">
                                          <div className="deleteBox">
                                            <img
                                              onClick={() =>
                                                handleCloseTimeSlot()
                                              }
                                              src={Images.DeleteIcon}
                                              alt="ClockIcon"
                                              className="DeleteIcon"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      {/* <button onClick={addTimeSlot}>
                                      Add this slot
                                    </button> */}
                                    </>
                                  )}
                                  {!showTimeSlot && (
                                    <div className="flexBox mt-2">
                                      <button
                                        onClick={() => handleShowSlot()}
                                        type="button"
                                        className="addButton"
                                      >
                                        <i className="las la-plus"></i>Add Time Slot{" "}
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flexBox justify-content-center">
                                <button
                                  onClick={(e) => handleBack(e, "pageoneback")}
                                  className="submit_btn"
                                >
                                  <span className="addMore me-3">
                                    <i className="las la-angle-left"></i> Back
                                  </span>
                                </button>
                                <button
                                  onClick={(e) => handleSubmit(e, "2")}
                                  className="submit_btn"
                                >
                                  <span className="smallBtn">Continue</span>
                                </button>
                              </div>
                            </>
                          ),
                          pagethree: (
                            <>
                              <h6 className="Headingsmall">Upload Documents</h6>
                              <p className="subHeadingSmall mb-4">
                                Upload your passport or certificate for the
                                verifications.
                              </p>
                              <div className="form-group col-md-12 mb-3">
                                <div className="uploadImgebox">
                                  {pdfFiles ? (
                                    <div className="innerUploadImgBox">
                                     <div className="flexBox ms-4">
                                   <div>
                                   <img src={Images.uploadFileImg} className="uploadFileIcon" alt="uploadFileIcon" />
                                   </div>
                                      <div className="fileDetail">
                                      <p className="uploadFileDetail ms-3 mb-0" placeholder="File Name. pdf">{pdfFiles.name}</p>
                                      <span className="timeOrder_ mb-0">373 kb</span>
                                      </div>
                                     </div>
                                      <p 
                                        className=" cancelUploadFile me-3"
                                        onClick={() =>
                                          handleRemoveDocument(pdfFiles.name)
                                        }
                                      >
                                      <i className="fas fa-times uploadcancelIcon "></i>
                                      </p>
                                    </div>
                                  ) : (
                                    <div
                                      {...getRootProps({
                                        className: "dropzone",
                                      })}
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
                                  )}
                                </div>
                              </div>
                              <div className="flexBox justify-content-center uploadFileButton ">
                                <button
                                  onClick={(e) => handleBack(e, "pagetwoback")}
                                  className="submit_btn"
                                  type="submit"
                                >
                                  <span className="addMore me-4">
                                    <i className="las la-angle-left"></i> Back
                                  </span>
                                </button>
                                <button
                                  onClick={(e) => handleSubmit(e, "3")}
                                  className="submit_btn"
                                  type="submit"
                                >
                                  <span className="smallBtn">Save</span>
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
              experticeValue={experticeValue}
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
                <img src={Images.modalCancel} className="ModalCancel" alt="modalcancel" />
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
