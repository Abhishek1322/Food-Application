import React from "react";
import * as Images from "../../../../utilities/images";
import { useNavigate } from "react-router-dom";

const OrderCancelModal = ({ close, orderType }) => {
  const navigate = useNavigate();

  // navigate previous order page
  const handleGoBack = () => {
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
      <div className="ordercancelsection paymentdonesection">
        <img
          src={Images.OrderPlace}
          alt="accountdeletedimg"
          className="img-fluid"
        />
        <h1 className="accountDeleted mt-3">
          {`${orderType === "order"}` ? "Order" : "Booking"} Canceled
        </h1>
        <p className="accountdeletetxt mt-2 ">
          Your amount will be refund Within 1 hour.
        </p>
        <div className="modalfooterbtn">
          <div className="addfoodbtn">
            <button
              onClick={handleGoBack}
              className="foodmodalbtn"
              type="button"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCancelModal;
