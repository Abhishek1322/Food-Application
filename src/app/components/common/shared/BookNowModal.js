import React, { useEffect, useState, useRef } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import ChefBookModal from "./ChefBookModal";
import { getSlotDay, onErrorStopLoad } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { toast } from "react-toastify";
import UserCartModal from "./UserCartModal";
import { addToCart } from "../../../../redux/slices/user";

// let currentDay = moment(new Date()).format("ddd").toLowerCase();
const BookNowModal = ({ menuId, chefId, close }) => {
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const [key, setKey] = useState(Math.random());
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
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
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

  // hire cheff
  const handleAddCart = () => {
    if (selectedTimeSlotes.length === 0) {
      showToast("Please select atlest one time slot");
      return;
    } else if (!description) {
      showToast("Please add description");
      return;
    }
    let params = {
      menuItemId: menuId,
      type: "booking",
      quantity: "1",
      description: description,
      date: moment(date).format("DD-MM-YYYY"),
      slots: selectedTimeSlotes,
    };
    dispatch(
      addToCart({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleOpenModal("allCart");
          }
        },
      })
    );
  };

  return (
    <>
      <div className="booknowsection booknow-modal-outer">
        <div className="row"></div>
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
          {timeSlotes?.slots && timeSlotes?.slots.length > 0 ? (
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
              handleAddCart();
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
        ids={
          modalDetail.flag === "chefbook"
            ? "chefbookmodal"
            : modalDetail.flag === "allCart"
            ? "CartModal"
            : ""
        }
        child={
          modalDetail.flag === "chefbook" ? (
            <ChefBookModal
              chefId={chefId}
              selectedTimeSlotes={selectedTimeSlotes}
              description={description}
              date={date}
              close={() => {
                handleOnCloseModal();
                close();
              }}
            />
          ) : modalDetail.flag === "allCart" ? (
            <UserCartModal
              close={() => {
                handleOnCloseModal();
                close();
              }}
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
          ) : modalDetail.flag === "allCart" ? (
            <>
              <h2 className="modal_Heading">CheckOut</h2>
              <p
                onClick={() => {
                  handleOnCloseModal();
                }}
                className="modal_cancel"
              >
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
