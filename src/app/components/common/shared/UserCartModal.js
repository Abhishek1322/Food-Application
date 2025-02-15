import React, { useEffect, useState, useRef } from "react";
import * as Images from "../../../../utilities/images";
import {
  getAllCart,
  onErrorStopLoad,
  deleteCartItem,
  updateCartItem,
  getUserAddress,
  getSelectedAddress,
} from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import CustomModal from "./CustomModal";
import AddAddressModal from "./AddAddressModal";
import EditAddressModal from "./EditAddressModal";
import DeleteAddressModal from "./DeleteAddressModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserSelector } from "../../../../redux/selector/user";
import CommonCheckoutForm from "./CommonCheckoutForm";
import ConfirmCardWrapper from "./ConfirmCardWrapper";

const UserCartModal = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSelector = useUserSelector();
  const { loading, previousSelectedAddress } = userSelector;
  const [allCartItems, setAllCartItems] = useState([]);
  const [cartId, setCartId] = useState("");
  const toastId = useRef(null);
  const [chefId, setChefId] = useState("");
  const [key, setKey] = useState(Math.random());
  const [orderType, setOrderType] = useState("");
  const [totalPrice, setTotalPrice] = useState([]);
  const [address, setAddress] = useState([]);
  const [bookingAddress, setBookingAddress] = useState([]);
  const [bookingData, setBookingData] = useState([]);
  const latestAddress =
    address && address.length > 0 ? [...address].reverse() : [];
  const [addressId, setAddressId] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [serviceCharges, setServiceCharges] = useState("");
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
    dispatch(
      getAllCart({
        cb(res) {
          if (res.status === 200) {
            setBookingData(res?.data?.data?.data);
            setAllCartItems(res?.data?.data?.data?.cartItems);
            setCartId(res?.data?.data?.data?._id);
            setChefId(res?.data?.data?.data?.chefId);
            setOrderType(res?.data?.data?.data?.type);
            const serviceCharges =
              (Number(res?.data?.data?.additionalChargesInPercent) *
                Number(res?.data?.data?.data?.subTotal)) /
              100;
            setTotalPrice(
              Number(res?.data?.data?.data?.subTotal) + serviceCharges
            );
            setServiceCharges(serviceCharges);
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
  const handleCartData = (type, menuId, qty) => {
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

  // getting user address
  useEffect(() => {
    handleGetUserAddress();
  }, []);

  // get user address
  const handleGetUserAddress = () => {
    dispatch(
      getUserAddress({
        cb(res) {
          if (res.status === 200) {
            setAddress(res.data.data);
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

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };
  // open modal
  const handleOpenModal = (flag, id) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
    setAddressId(id);
  };

  // select address
  const handleSelectAddress = (id, book) => {
    setSelectedAddress(id);
    dispatch(getSelectedAddress(id));
    setBookingAddress(book);
  };

  // add more items
  const handleAddMoreItem = () => {
    close();
    navigate(`/chef-details?id=${chefId}`);
  };

  // get selected addresss
  useEffect(() => {
    if (previousSelectedAddress) {
      setSelectedAddress(previousSelectedAddress);
    }
  }, [previousSelectedAddress]);

  return (
    <>
      <div className="usercartcheck usercartcheck-outer userCheckOutModal">
        {allCartItems && allCartItems?.length > 0 ? (
          <>
            <div className="cartslists-outer">
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
            </div>
            {allCartItems && allCartItems?.length > 0 && (
              <div className="cartdelivery">
                <div className="checkoutdelivery">
                  <div className="checkoutaddress">
                    <h6 className="venuInfo">Delivery Address</h6>
                  </div>
                  <div className="checkoutnewaddress">
                    <h6
                      onClick={() => {
                        handleOpenModal("ordereditmodal");
                      }}
                      className="headerinnertxt m-0"
                    >
                      + Add New Address
                    </h6>
                  </div>
                </div>

                <div
                  className={
                    latestAddress && latestAddress?.length > 0
                      ? "checkouthomeoffice mt-3 all-address-checkout"
                      : ""
                  }
                >
                  {latestAddress && latestAddress?.length > 0 ? (
                    <>
                      {latestAddress?.slice(0, 3)?.map((item, index) => (
                        <div key={index} className="checkouthome">
                          <div className="homedropdown mt-2">
                            <h6 className="notificationText text-capitalize">
                              {item?.type}
                            </h6>
                            <div className="dropdown dropend">
                              <img
                                src={Images.chatsDots}
                                className="dropdown-toggle manageimg"
                                alt="cartcancel"
                                data-bs-toggle="dropdown"
                              />
                              <ul className="dropdown-menu dropdown-menu-address">
                                <li
                                  onClick={() => {
                                    handleOpenModal("editaddress", item?._id);
                                  }}
                                >
                                  <img
                                    src={Images.EditImg}
                                    alt="editimage"
                                    className="img-fluid"
                                  />{" "}
                                  <span className="editdrop">Edit </span>
                                </li>
                                <li
                                  onClick={() => {
                                    handleOpenModal("deleteaddress", item?._id);
                                  }}
                                >
                                  <img
                                    src={Images.cartDelete}
                                    alt="editimage"
                                    className="img-fluid"
                                  />{" "}
                                  <span className="editdrop">Delete</span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <p className="cheftext mt-2">{item?.streetAddress}</p>
                          <div className="round roundSelect">
                            <input
                              onClick={(e) =>
                                handleSelectAddress(item?._id, item)
                              }
                              id=""
                              name=""
                              type="checkbox"
                              value=""
                              className="checkbx"
                              checked={item?._id === selectedAddress}
                            />
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="noAddressFound">
                      <div>
                        <p className="no-data-found">No address found</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="modalfooterbtn">
              <div className="outeraddItem">
                <button
                  onClick={() => handleAddMoreItem()}
                  className="addItems"
                  type="button"
                >
                  + Add More Items
                </button>
                <div className="order-now-pay-total-outer">
                  <div className="order-now-pay-total-pay">
                    <div className="total-price-order">
                      <p className="service-charges">
                        Service Charges:&nbsp;&nbsp;{serviceCharges.toFixed(2)}
                      </p>
                      <h6 className="totaltxt">Total</h6>
                      <p className="price">£{totalPrice.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => {
                        !selectedAddress
                          ? showToast("Please select delivery address")
                          : handleOpenModal("confirmCardWrapper");
                      }}
                      className="orderbutton w-auto"
                      type="button"
                      disabled={loading}
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="noDataFoundImage noDataFoundImage-checkout">
            <img
              className="w-100 p-5"
              alt="no data found"
              src={Images.nodataFound}
            />
          </div>
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
          modalDetail.flag === "ordereditmodal"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "ordereditmodal"
            ? "ordereditaddress"
            : modalDetail.flag === "editaddress"
            ? "ordereditaddress"
            : modalDetail.flag === "deleteaddress"
            ? "ordereditaddress"
            : modalDetail.flag === "confirmCardWrapper"
            ? "ordereditaddress"
            : ""
        }
        child={
          modalDetail.flag === "ordereditmodal" ? (
            <AddAddressModal
              handleGetUserAddress={handleGetUserAddress}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "editaddress" ? (
            <EditAddressModal
              addressId={addressId}
              handleGetUserAddress={handleGetUserAddress}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "deleteaddress" ? (
            <DeleteAddressModal
              addressId={addressId}
              handleGetUserAddress={handleGetUserAddress}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "confirmCardWrapper" ? (
            <ConfirmCardWrapper
              close={() => {
                close();
                handleOnCloseModal();
              }}
              totalPrice={totalPrice}
              cartId={cartId}
              selectedAddress={selectedAddress}
              orderType={orderType}
              handleOpenModalCardDetails={handleOpenModal}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "ordereditmodal" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid arrowCommon_"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Add New Address</h2>
                  <p className="chatUser">Add Address below</p>
                </div>
              </div>
            </>
          ) : modalDetail.flag === "editaddress" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid arrowCommon_"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Edit Address</h2>
                  <p className="chatUser">Edit Address below</p>
                </div>
              </div>
            </>
          ) : modalDetail.flag === "deleteaddress" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid arrowCommon_"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Delete Address</h2>
                </div>
              </div>
            </>
          ) : modalDetail.flag === "confirmCardWrapper" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={() => {
                    close();
                    handleOnCloseModal();
                  }}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid arrowCommon_"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Pay Now</h2>
                  <p className="chatUser">Debit/Credit cards acceptable</p>
                </div>
              </div>
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

export default UserCartModal;
