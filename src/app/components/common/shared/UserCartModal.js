import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import {
  getAllCart,
  onErrorStopLoad,
  deleteCartItem,
} from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";

const UserCartModal = () => {
  const dispatch = useDispatch();
  const [allCartItems, setAllCartItems] = useState([]);
  const [cartId, setCartId] = useState("");
  const [totalPrice, setTotalPrice] = useState([]);

  //  get all cart data
  useEffect(() => {
    handleGetAllCart();
  }, []);

  //  get all cart data
  const handleGetAllCart = () => {
    dispatch(
      getAllCart({
        cb(res) {
          if (res.status === 200) {
            setAllCartItems(res?.data?.data?.cartItems);
            setCartId(res?.data?.data?._id);
            const totalCartPrice = res?.data?.data?.cartItems?.reduce(
              (previousValue, currentValue, index) =>
                previousValue + currentValue.itemTotalPrice,
              0
            );
            setTotalPrice(totalCartPrice);
          }
        },
      })
    );
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // delete cart items
  const handleDeleteCartItem = (menuId) => {
    let params = {
      cartId: cartId,
      menuItemId: menuId,
    };
    dispatch(
      deleteCartItem({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleGetAllCart();
          }
        },
      })
    );
  };

  // manage cart data e.g. quantity and price
  const handleCartData = (type, menuId, quantity) => {
    if (type === "increase") {
      const updateCart = allCartItems?.map((item, index) => {
        if (menuId === item?.menuItemId?._id) {
          return {
            ...item,
            quantity: item?.quantity + 1,
            itemTotalPrice: item?.itemTotalPrice + item?.netPrice,
          };
        }
        return item;
      });
      const totalCartPrice = updateCart.reduce(
        (previousValue, currentValue, index) =>
          previousValue + currentValue.itemTotalPrice,
        0
      );
      setTotalPrice(totalCartPrice);
      setAllCartItems(updateCart);
    } else if (type === "decrease" && quantity > 1) {
      const updateCart = allCartItems?.map((item, index) => {
        if (menuId === item?.menuItemId?._id) {
          return {
            ...item,
            quantity: item?.quantity - 1,
            itemTotalPrice: item?.itemTotalPrice - item?.netPrice,
          };
        }
        return item;
      });
      const totalCartPrice = updateCart.reduce(
        (previousValue, currentValue, index) =>
          previousValue + currentValue.itemTotalPrice,
        0
      );
      setTotalPrice(totalCartPrice);
      setAllCartItems(updateCart);
    }
  };

  return (
    <>
      <div className="usercartcheck">
        {allCartItems && allCartItems?.length > 0 ? (
          <>
            {allCartItems?.map((item, index) => (
              <div key={index} className="modalDetail usermodaldetail">
                <div className="usercartDetail">
                  <img
                    src={
                      item?.menuItemId?.image
                        ? item?.menuItemId?.image
                        : Images.FoodIcon
                    }
                    className="userprofile"
                    alt="cartImg"
                  />
                  <div className="insideModal">
                    <h6 className="foodtext">{item?.menuItemId?.category}</h6>
                    <h5 className="foodItem">{item?.menuItemId?.name}</h5>
                    <h6 className="foodPrice">£{item?.netPrice}.00</h6>
                    <div className="quantity">
                      <div
                        onClick={() =>
                          handleCartData(
                            "decrease",
                            item?.menuItemId?._id,
                            item?.quantity
                          )
                        }
                        className="Quantiycheck"
                      >
                        <img
                          src={Images.minusModal}
                          className="calQuantity"
                          alt="minusModal"
                        />
                      </div>
                      <span className="number">{item?.quantity}</span>
                      <div
                        onClick={() =>
                          handleCartData(
                            "increase",
                            item?.menuItemId?._id,
                            item?.quantity
                          )
                        }
                        className="Quantiycheck"
                      >
                        <img
                          src={Images.plusModal}
                          className="calQuantity"
                          alt="minusModal"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modalDelete_">
                  <img
                    onClick={() => handleDeleteCartItem(item?.menuItemId?._id)}
                    src={Images.cartDelete}
                    className="cartDelete_"
                    alt="cartcancel"
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="d-flex align-items-center justify-content-center mt-2">
            No data found
          </p>
        )}
        <div className="modalfooterbtn">
          <div className="outeraddItem">
            <button className="addItems" type="button">
              + Add More Items
            </button>
            <div className="orderNow">
              <div className="totalPrice">
                <h6 className="totaltxt">Total</h6>
                <p className="price">£{totalPrice}.00</p>
              </div>
              <button className="orderbutton" type="button">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCartModal;
