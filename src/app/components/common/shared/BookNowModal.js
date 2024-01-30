import React, { useEffect, useState, useRef } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import ChefBookModal from "./ChefBookModal";
import { getSlotDay, onErrorStopLoad } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { toast } from "react-toastify";

// let currentDay = moment(new Date()).format("ddd").toLowerCase();
const BookNowModal = ({ chefId, initClose }) => {
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const [key, setKey] = useState(Math.random());
  const [chefData, setChefData] = useState([]);
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [timeSlotes, setTimeSlotes] = useState([]);
  const [date, setDate] = useState(new Date());
  const [activeSlot, setActiveSlot] = useState([]);
  const [selectedTimeSlotes, setSelectedTimeSlotes] = useState([]);
  const [description, setDescription] = useState("");
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  // get slote detail
  useEffect(() => {
    let params = {
      chefId: chefId,
      date: moment(date).format("DD-MM-YYYY"),
    };
    dispatch(
      getSlotDay({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            setTimeSlotes(res?.data?.data);
          }
        },
      })
    );
  }, [date]);

  // close loader after page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  //closeModal
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // open modal
  const handleOpenModal = (flag) => {
    if (!city) {
      showToast("Please select address");
      return;
    } else if (selectedTimeSlotes.length === 0) {
      showToast("Please select atlest one time slot");
      return;
    } else if (!description) {
      showToast("Please add description");
      return;
    }
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  // handle change city
  const autoCompleteHandleChange = (city) => {
    setCity(city);
    geocodeByAddress(city)
      .then((results) => {
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
      })
      .catch((error) => {});
  };

  // select city
  const autoCompleteHandleSelect = (city) => {
    setCity(city);
    geocodeByAddress(city)
      .then((results) => {
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
      })
      .catch((error) => {});
  };

  // get date
  const handleGetDay = (day) => {
    if (day === null || day === undefined) {
      return;
    }
    setDate(day);
  };

  // select time slots
  const handleSelectTimeSlots = (id, from, to) => {
    setActiveSlot((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
    const newTimeSlots = {
      from: from,
      to: to,
      id: id,
    };
    setSelectedTimeSlotes((prev) => {
      const timeSlotExists = prev.some((timeSlot) => timeSlot.id === id);
      if (!timeSlotExists) {
        return [...prev, newTimeSlots];
      } else {
        return prev.filter((timeSlot) => timeSlot.id !== id);
      }
    });
  };

  return (
    <>
      <div className="booknowsection booknow-modal-outer">
        <div className="row">
          <div className="col-lg-12">
            <div className="input-container mt-4">
              <PlacesAutocomplete
                className=""
                autoComplete="off"
                value={city}
                onChange={autoCompleteHandleChange}
                onSelect={autoCompleteHandleSelect}
                searchOptions={{}}
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
                          "location-search-input customform-control border-input address-border-input",
                      })}
                    />
                    <div
                      className={
                        suggestions && suggestions.length > 0
                          ? "suggestion-item-outer"
                          : "autocomplete-dropdown-container"
                      }
                    >
                      {/* {loading && <div>Loading...</div>} */}
                      {suggestions.map((suggestion, index) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                              backgroundColor: "#e65c00",
                              cursor: "pointer",
                              borderRadius: "4px",
                              padding: "6px",
                              color: "#fff",
                            }
                          : {
                              backgroundColor: "#ffffff",
                              cursor: "pointer",
                            };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                            key={index}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              <label className="border-label">Address</label>
              <img src={Images.Location} alt="InfoIcon" className="InputIcon" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="input-container date-picker-outer mt-4">
              <DatePicker
                showIcon
                value={date}
                minDate={new Date()}
                className="border-input date-picker-resp"
                selected={moment(date).toDate("YYYY-MM-DD")}
                onChange={(date) => handleGetDay(date)}
                placeholderText="DD/MM/YYYY"
                dateFormat="dd/MM/yyyy"
                toggleCalendarOnIconClick
                icon={
                  <img
                    src={Images.Calendar}
                    alt="InfoIcon"
                    className="InputIcon"
                  />
                }
              />

              <label className="border-label">Date</label>
            </div>
          </div>
        </div>
        <br />
        <p className="chefName mt-5">Book Time Slot</p>
        <div
          className={
            timeSlotes?.slots && timeSlotes?.slots.length > 0
              ? "bookslots mt-2 bookslots-outer"
              : "bookslots mt-2"
          }
        >
          {timeSlotes ? (
            <>
              {timeSlotes?.slots?.map((day, dayIndex) => (
                <div
                  onClick={() =>
                    handleSelectTimeSlots(day?._id, day?.from, day?.to)
                  }
                  key={`${dayIndex}`}
                  className={
                    activeSlot?.includes(day?._id)
                      ? "daytimes active"
                      : !day?.status
                      ? "disable-slot daytimes"
                      : "daytimes"
                  }
                >
                  <img
                    src={Images.ClockIcon}
                    alt="clockimage"
                    className="img-fluid lighttime"
                  />
                  <img
                    src={Images.ColorClock}
                    alt="clockimage"
                    className="img-fluid darktime"
                  />
                  <p className="daytimesheading">
                    {day?.from} - {day?.to}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <p className="no-slot-found">No slot found on this day</p>
          )}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="input-container mt-4">
              <textarea
                type="text"
                className="border-input"
                placeholder="Write here"
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
              <label className="border-label">Description</label>
            </div>
          </div>
        </div>
        <div className="modalfooterbtn">
          <button
            className="foodmodalbtn"
            type="submit"
            onClick={() => {
              handleOpenModal("chefbook");
            }}
          >
            Book Now
          </button>
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
          modalDetail.flag === "chefbook" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "chefbook" ? "chefbookmodal" : ""}
        child={
          modalDetail.flag === "chefbook" ? (
            <ChefBookModal
              chefId={chefId}
              latitude={latitude}
              longitude={longitude}
              city={city}
              selectedTimeSlotes={selectedTimeSlotes}
              description={description}
              date={date}
              close={() => handleOnCloseModal()}
              firstBookNow={() => initClose()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "chefbook" ? (
            <>
              <h2 className="modal_Heading">Check Out</h2>
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

export default BookNowModal;
