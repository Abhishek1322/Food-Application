import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import YourOrderModal from "./YourOrderModal";
import { Line } from "rc-progress";
import { useNavigate } from "react-router-dom";

const OrderPlaceModal = ({ close, orderId, orderType }) => {
  const navigate = useNavigate();
  const [key, setKey] = useState(Math.random());
  const [countDown, setCountDown] = useState(60);
  const [barPercentage, setBarPercentage] = useState();
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
  };

  // run timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((pre) => pre - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // close existing modal
  useEffect(() => {
    if (countDown === 0) {
      if (orderType === "order" || orderType === "booking") {
        close();
        navigate("/user-order-home", {
          state: orderType,
        });
      }
    }
  }, [countDown]);

  // set percentage
  useEffect(() => {
    const getPercent = (countDown / 60) * 100;
    const getTotalPercent = 100 - getPercent;
    setBarPercentage(getTotalPercent);
  }, [countDown]);

  // redirect to detail page
  const handleRedirect = () => {
    if (orderType === "order" || orderType === "booking") {
      close();
      navigate("/user-order-home", {
        state: orderType,
      });
    } else {
      close();
    }
  };

  return (
    <>
      <div className="orderplacesection paymentdonesection">
        <img
          src={Images.accountDeleted}
          alt="accountdeletedimg"
          className="img-fluid"
        />
        <h1 className="accountDeleted mt-3">
          {orderType === "order" ? "Order Placed" : "Booking Done"}
        </h1>
        <p className="accountdeletetxt mt-2 ">
          {orderType === "order"
            ? "Your order has been successfully placed."
            : "Your Booking has been done successfully ."}
        </p>
        <div className="modalfooterbtn">
          <div className="addfoodbtn">
            <button
              className="foodmodalbtn"
              type="button"
              onClick={() => {
                handleRedirect();
              }}
            >
              Okay
            </button>
          </div>
          <Line
            className="cancelProgressBar mt-3"
            percent={barPercentage}
            strokeWidth={3}
            trailWidth={3}
            strokeColor="#E65C00"
            trailColor="#F8D5BE"
          />

          <p className="progressheading">{countDown} Sec</p>
          <button
            onClick={() => handleOpenModal("wantCancelOrder")}
            className="itemsQuantity"
            type="button"
          >
            {orderType === "order" ? "Cancel Order" : "Cancel Booking"}
          </button>
        </div>
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        // backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "wantCancelOrder"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "wantCancelOrder" ? "yourordermodalplace" : ""
        }
        child={
          modalDetail.flag === "wantCancelOrder" ? (
            <YourOrderModal
              orderType={orderType}
              orderId={orderId}
              close={() => {
                close();
              }}
              closeModal={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default OrderPlaceModal;
