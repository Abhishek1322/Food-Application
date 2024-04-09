import React from "react";
import * as Images from "../../../../utilities/images";
import { useNavigate } from "react-router-dom";

const OrderAlertModal = ({ setShowAlert, orderType }) => {
  const navigate = useNavigate();

  const handleConfirmRefresh = () => {
    setShowAlert(false);
    if (orderType === "order") {
      navigate("/user-order-home");
    } else if (orderType === "booking") {
      navigate("/home-user");
    }
  };

  const handleCancelRefresh = () => {
    setShowAlert(false);
  };

  return (
    <div className="DeleteMenuModal">
      <img
        src={Images.logoutImg}
        alt="accountdeletedimg"
        className="img-fluid logoutImg"
      />
      <p className="accountDeleted mt-3">Are you sure</p>
      <p className="accountdeletetxt mt-2 ">
        You don't want to proceed with canceling your order?
      </p>
      <div className="Logoutfooterbtn mb-4">
        <div className="orderItems_ flexBox justify_content-center ">
          <button onClick={handleCancelRefresh} className="cancelOrder_ me-4">
            Cancel
          </button>
          <button onClick={handleConfirmRefresh} className="submitOrder_">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderAlertModal;
