import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSingleOrder, onErrorStopLoad } from "../../../../redux/slices/user";
import { useUserSelector } from "../../../../redux/selector/user";
import { FadeLoader } from "react-spinners";

const UserOrderDetail = (props) => {
  const { foodOrderId, setOrderDetail } = props;
  const dispatch = useDispatch();
  const userSelector = useUserSelector();
  const [foodDetail, setFoodDetail] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");

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
            setOrderDetail(res?.data?.data);
            setTotalAmount(res?.data?.data);
          }
        },
      })
    );
  }, []);

  return (
    <>
      {userSelector?.loading ? (
        <div className="good-loader">
          <FadeLoader
            color={"#E65C00"}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="Userordersection">
          {foodDetail?.items?.map((item, index) => (
            <div key={index} className="modalDetail usermodaldetail">
              <div className="usercartDetail">
                <img src={item?.image} className="userprofile" alt="cartImg" />
                <div className="insideModal">
                  <p className="foodtext text-capitalize">{item?.category}</p>
                  <p className="foodItem">{item?.name}</p>
                  <p className="foodPrice">£{item?.netPrice}.00</p>
                </div>
              </div>
              <p className="fooodquantity_">{item?.quantity}X</p>
            </div>
          ))}

          <div className="modalfooterbtn">
            <div className="addfoodbtn">
              <button
                className={
                  foodDetail?.status === "delivered"
                    ? "foodmodalbtn foodmodalbtnDeliver modalfooddelivery"
                    : "foodmodalbtn modalfooddelivery"
                }
                type="button"
              >
                <p className="orderfooterbtn">Total Paid</p>
                <p className="orderfooterprice">£{totalAmount?.total}.00</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrderDetail;
