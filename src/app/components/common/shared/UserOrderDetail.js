import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { useDispatch } from "react-redux";
import { getSingleOrder, onErrorStopLoad } from "../../../../redux/slices/user";

const UserOrderDetail = (props) => {
  const { foodOrderId,setOrderDetail } = props;
  const dispatch = useDispatch();
  const [foodDetail, setFoodDetail] = useState([]);
  console.log("foodDetailfoodDetail", foodDetail);

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // get order details
  useEffect(() => {
    let params = {
      id: foodOrderId,
    };

    dispatch(
      getSingleOrder({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setFoodDetail(res?.data?.data);
            setOrderDetail(res?.data?.data)
          }
        },
      })
    );
  }, []);

  return (
    <>
      <div className="Userordersection">
        <div className="modalDetail usermodaldetail">
          <div className="usercartDetail">
            <img src={Images.FoodIcon} className="userprofile" alt="cartImg" />
            <div className="insideModal">
              <p className="foodtext">Food Category</p>
              <p className="foodItem">Chicken Salad</p>
              <p className="foodPrice">£22.00</p>
            </div>
          </div>
          <p className="fooodquantity_">2X</p>
        </div>
        <div className="modalDetail usermodaldetail ">
          <div className="usercartDetail">
            <img src={Images.FoodIcon} className="userprofile" alt="cartImg" />
            <div className="insideModal">
              <p className="foodtext">Food Category</p>
              <p className="foodItem">Chicken Salad</p>
              <p className="foodPrice">£22.00</p>
            </div>
          </div>
          <p className="fooodquantity_">2X</p>
        </div>
        <div className="modalfooterbtn">
          <div className="addfoodbtn">
            <button className="foodmodalbtn modalfooddelivery" type="button">
              <p className="orderfooterbtn">Total Paid</p>
              <p className="orderfooterprice">£{foodDetail?.amount}.00</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrderDetail;
