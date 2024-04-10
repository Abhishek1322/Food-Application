import React from "react";
import * as Images from "../../../../utilities/images";
import { Link } from "react-router-dom";

const CheckBankAccount = ({ close }) => {
  return (
    <div className="DeleteMenuModal">
      <img src={Images.noBank} alt="accountdeletedimg" className="img-fluid" />
      <p className="nobankgeading">
        Firstly, please set up your bank account, then you can proceed.
      </p>

      <div className="Logoutfooterbtn mb-4">
        <div className="orderItems_ flexBox justify_content-center">
          <button onClick={close} className="cancelOrder_ me-4">
            Cancel
          </button>
          <Link to="/bank-details">
            <button className="submitOrder_">Okay</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckBankAccount;
