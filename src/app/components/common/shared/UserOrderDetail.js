import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSingleOrder, onErrorStopLoad } from "../../../../redux/slices/user";
import { useUserSelector } from "../../../../redux/selector/user";
import { FadeLoader } from "react-spinners";

const UserOrderDetail = ({ orderDetail }) => {
  const dispatch = useDispatch();
  const userSelector = useUserSelector();

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="Userordersection">
        {orderDetail?.items?.map((item, index) => (
          <div key={index} className="modalDetail usermodaldetail">
            <div className="usercartDetail">
              <img src={item?.image} className="userprofile" alt="cartImg" />
              <div className="insideModal">
                <p className="foodtext text-capitalize">{item?.category}</p>
                <p className="foodItem">{item?.name}</p>
                <p className="foodPrice">
                  £{Number(item?.netPrice)?.toFixed(2)}
                </p>
              </div>
            </div>
            <p className="fooodquantity_">{item?.quantity}X</p>
          </div>
        ))}

        <div className="modalfooterbtn">
          <div className="addfoodbtn">
            <button
              className={
                orderDetail?.status === "delivered"
                  ? "foodmodalbtn foodmodalbtnDeliver modalfooddelivery"
                  : "foodmodalbtn modalfooddelivery"
              }
              type="button"
            >
              <p className="orderfooterbtn">Total Paid</p>
              <p className="orderfooterprice">
                £{Number(orderDetail?.total)?.toFixed(2)}
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrderDetail;
