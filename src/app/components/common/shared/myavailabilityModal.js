import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import TimePicker from "react-time-picker";
import { updateChefProfile } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useWebSelector } from "../../../../redux/selector/web";

const MyavailabilityModal = ({
  availabilityData,
  close,
  chefProfileDetails,
  handleSelectAvailabilityByDay,
}) => {
  const dispatch = useDispatch();
  const webSelector = useWebSelector();
  const { loading } = webSelector;
  const [activeWeekDay, setActiveWeekDay] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [availability, setAvailability] = useState(availabilityData);
  const [showTimeSlot, setShowTimeSlot] = useState(true);

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

  // select availability by day
  useEffect(() => {
    const weekDay = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const todayDate = new Date();
    let day = weekDay[todayDate.getDay()];
    handleWeekDay(day);

    return () => {
      handleSelectAvailabilityByDay();
    };
  }, []);

  const handleWeekDay = (day) => {
    setActiveWeekDay(day);
    const getPreviousFromTime = availability?.find((item, index) => {
      return item?.day === day;
    });
    setStartTime(
      getPreviousFromTime?.startTime ? getPreviousFromTime?.startTime : null
    );
    const getPreviousToTime = availability?.find((item, index) => {
      return item?.day === day;
    });
    setEndTime(getPreviousToTime?.endTime ? getPreviousToTime?.endTime : null);
    setShowTimeSlot(true);
  };

  // getting startTime slot
  const handleStartTime = (value) => {
    setStartTime(value);
  };

  // getting EndTime slot
  const handleEndTime = (value) => {
    setEndTime(value);
  };

  // getting availability
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
              startTime: startTime,
              endTime: endTime,
            };
          }
          return item;
        });
      } else {
        return [
          ...prevAvailability,
          {
            day: activeWeekDay,
            startTime: startTime,
            endTime: endTime,
          },
        ];
      }
    });
  }, [startTime, endTime, activeWeekDay]);

  // save availability
  const handleSaveAvailability = () => {
    const checkEmptyAvailability = availability?.some(
      (item) =>
        item?.day != "" && item?.startTime != null && item?.endTime != null
    );
    if (!checkEmptyAvailability) {
      toast.error("Please add atleast one availability");
      return;
    }
    const updateValue = availability
      .filter(
        (value) =>
          value.day !== "" && value.startTime && value.endTime !== undefined
      )
      .map((item, index) => {
        const { _id, timeSlots, ...rest } = item;
        return rest;
      });

    let params = {
      step: "3",
      availability: updateValue,
    };
    dispatch(
      updateChefProfile({
        ...params,
        cb(res) {
          if (res.status === 200) {
            close();
            chefProfileDetails();
            handleSelectAvailabilityByDay();
          }
        },
      })
    );
  };

  // close time slot
  const handleCloseTimeSlot = () => {
    const deleteAvailability = availability.filter((item, index) => {
      return item.day !== activeWeekDay;
    });
    setAvailability(deleteAvailability);
    setShowTimeSlot(false);
  };

  return (
    <>
      <div className="ProfilePageModal">
        <div className="availabilityModal">
          <ul className="myAvailability_">
            {week.map((day, index) => (
              <>
                <li
                  onClick={() => handleWeekDay(day.day)}
                  className={
                    activeWeekDay === day.day
                      ? "availabilityDays active text-capitalize"
                      : "availabilityDays text-capitalize"
                  }
                >
                  <p
                    className={
                      activeWeekDay === day.day
                        ? "notificationText text-capitalize text-white"
                        : "notificationText text-capitalize"
                    }
                  >
                    {" "}
                    {day.day}
                  </p>
                </li>
              </>
            ))}
          </ul>

          {activeWeekDay && showTimeSlot && (
            <div className="flexBox ">
              <div className="myavailability mt-4">
                <div className="availabilityBox_  p-0">
                  <p className="innerBoxText">From</p>
                  <div className="availableTime flexBox ">
                    <img
                      src={Images.availabilityClock}
                      className="clockImg pe-1"
                      alt="availabilityclockImg"
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
              <div className="myavailability mt-4 ">
                <div className="availabilityBox_ me-4 p-0">
                  <p className="innerBoxText">To</p>
                  <div className="availableTime flexBox">
                    <img
                      src={Images.availabilityClock}
                      className="clockImg pe-1"
                      alt="availabilityclockImg"
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
              <div className="deleteImg_ mt-3">
                <img
                  onClick={handleCloseTimeSlot}
                  src={Images.editprofileDelete}
                  className="deleteAvailable"
                  alt="deleteprofileImg"
                />
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleSaveAvailability}
          className="foodmodalbtn  modalfooterbtn"
        >
          Update
          {loading && (
            <span className="spinner-border spinner-border-sm ms-1"></span>
          )}
        </button>
      </div>
    </>
  );
};

export default MyavailabilityModal;
