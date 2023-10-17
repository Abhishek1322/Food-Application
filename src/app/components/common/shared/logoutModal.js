import React from 'react'
import * as Images from "../../../../utilities/images";
const LogoutModal = () => {
    return (
        <>
          <div className="DeleteMenuModal">
        <img
          src={Images.logoutImg}
          alt="accountdeletedimg"
          className="img-fluid logoutImg"
        />
        <p className="accountDeleted mt-3">Logout</p>
        <p className="accountdeletetxt mt-2 ">
          Are you sure, you want to Logout ?
        </p>
        <div className="Logoutfooterbtn mb-4">
          <div className="orderItems_ flexBox justify_content-center ">
            <button className="cancelOrder_ me-4">
              Cancel
            </button>
            <button className="submitOrder_">
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
            
        </>
    )
}

export default LogoutModal