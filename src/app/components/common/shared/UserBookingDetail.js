import React from "react";

const UserBookingDetail = ({ bookingDetail }) => {
  return (
    <>
      <div className="Userordersection">
        {bookingDetail?.items?.map((item, index) => (
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
                bookingDetail?.status === "completed"
                  ? "foodmodalbtn foodmodalbtnDeliver modalfooddelivery"
                  : "foodmodalbtn modalfooddelivery"
              }
              type="button"
            >
              <p className="orderfooterbtn">Total Paid</p>
              <p className="orderfooterprice">
                £{Number(bookingDetail?.totalPrice)?.toFixed(2)}
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBookingDetail;
