import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import FadeLoader from "react-spinners/FadeLoader";

import {
  getAllCart,
  deleteCartItem,
  updateCartItem,
} from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import CustomModal from "./CustomModal";
import { useNavigate } from "react-router-dom";
import UserCartModal from "./UserCartModal";
import { useUserSelector } from "../../../../redux/selector/user";

const CartModal = ({ close, updateCartCount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSelector = useUserSelector();
  const [allCartItems, setAllCartItems] = useState([]);
  const [cartId, setCartId] = useState("");
  const [chefId, setChefId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [key, setKey] = useState(Math.random());
  const [totalPrice, setTotalPrice] = useState("");
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  //  get all cart data
  useEffect(() => {
    handleGetAllCart();
  }, []);

  //  get all cart data
  const handleGetAllCart = () => {
    setShowLoading(true);
    dispatch(
      getAllCart({
        cb(res) {
          if (res.status === 200) {
            setShowLoading(false);
            setIsLoading(false);
            setAllCartItems(res?.data?.data?.data?.cartItems);
            setCartId(res?.data?.data?.data?._id);
            setChefId(res?.data?.data?.data?.chefId);
            setTotalPrice(res?.data?.data?.data?.subTotal);
          }
        },
      })
    );
  };

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
            updateCartCount();
          }
        },
      })
    );
  };

  // manage cart data e.g. quantity and price
  const handleCartData = (type, menuId, qty) => {
    setIsLoading(false);
    if (type === "decrease" && qty === "1") {
      return;
    }
    let quantity = Number(qty);
    quantity =
      type === "increase"
        ? quantity + 1
        : type === "decrease" && quantity > 1
        ? quantity - 1
        : 1;
    let params = {
      cartId: cartId,
      menuItemId: menuId,
      quantity: quantity.toString(),
    };
    dispatch(
      updateCartItem({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleGetAllCart();
          }
        },
      })
    );
  };

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
  const handleOpenModal = (flag, id) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  // add more items
  const handleAddMoreItem = () => {
    close();
    navigate(`/chef-details?id=${chefId}`);
  };

  return (
    <>
      <div className="usercartcheck usercartcheck-outer">
        {userSelector?.loading && showLoading && isLoading ? (
          <div className="good-loader">
            <FadeLoader
              color={"#E65C00"}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
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
                        <h6 className="foodtext text-capitalize">
                          {item?.menuItemId?.category}
                        </h6>
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
                        onClick={() =>
                          handleDeleteCartItem(item?.menuItemId?._id)
                        }
                        src={Images.cartDelete}
                        className="cartDelete_"
                        alt="cartcancel"
                      />
                    </div>
                  </div>
                ))}

                <div className="modalfooterbtn">
                  <div className="outeraddItem-resp">
                    <button
                      onClick={() => handleAddMoreItem()}
                      className="addItems"
                      type="button"
                    >
                      + Add More Items
                    </button>

                    <div className="order-now-pay-total">
                      <div className="total-price-order">
                        <h6 className="totaltxt">Total</h6>
                        <p className="price">£{totalPrice}.00</p>
                      </div>
                      <button
                        onClick={() => handleOpenModal("checkOutModal")}
                        className="orderbutton"
                        type="button"
                      >
                        CheckOut
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="noDataFoundImageCart">
                <div>
                  <img
                    className="w-100"
                    alt="no data found"
                    src={Images.nodataFound}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <CustomModal
        key={key}
        show={modalDetail.show}
        // backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "checkOutModal"
            ? "commonWidth customContent"
            : ""
        }
        ids={modalDetail.flag === "checkOutModal" ? "ordereditaddress" : ""}
        child={
          modalDetail.flag === "checkOutModal" ? (
            <UserCartModal
              close={() => {
                handleOnCloseModal();
                close();
              }}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "checkOutModal" ? (
            <>
              <h2 className="modal_Heading">CheckOut</h2>
              <p
                onClick={() => {
                  handleOnCloseModal();
                  close();
                }}
                className="modal_cancel"
              >
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </>
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default CartModal;
