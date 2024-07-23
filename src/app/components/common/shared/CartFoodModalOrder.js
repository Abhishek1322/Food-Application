import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { Link, useLocation } from "react-router-dom";
import CustomModal from "./CustomModal";
import { singleMenu, onErrorStopLoad } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import UserCartModal from "./UserCartModal";
import { addToCart } from "../../../../redux/slices/user";
import { useUserSelector } from "../../../../redux/selector/user";
import MenuRating from "./MenuRating";
import ChefRating from "./ChefRating";
import BookNowModal from "./BookNowModal";
import { FadeLoader } from "react-spinners";

const CartFoodModalOrder = ({ menuId, close }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const userData = useUserSelector();
  const [foodDetails, setFoodDetails] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [key, setKey] = useState(Math.random());
  const [showLoading, setShowLoading] = useState(true);
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

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
  const handleOpenModal = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  // close loader after page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // get single menu item
  useEffect(() => {
    handleGetMenuDetails();
  }, []);

  // get menu details
  const handleGetMenuDetails = () => {
    let params = {
      id: menuId,
    };
    dispatch(
      singleMenu({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setShowLoading(false);
            setFoodDetails(res?.data?.data);
            setQuantity(res?.data?.data?.item?.quantity);
          }
        },
      })
    );
  };

  // handle quantity
  const handleQuantity = (flag) => {
    if (flag === "increase") {
      setQuantity((pre) => Number(pre) + 1);
    } else if (flag === "decrease" && quantity > 1) {
      setQuantity((pre) => Number(pre) - 1);
    }
  };

  // add menu item in cart
  const handleAddCart = (type) => {
    setIsLoading(type);
    let params = {
      menuItemId: menuId,
      type: "order",
      quantity: quantity === "0" ? "1" : Number(quantity) + 1 + "",
    };
    dispatch(
      addToCart({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            handleOpenModal("allCart");
          }
        },
      })
    );
  };

  return (
    <>
      {showLoading ? (
        <div className="good-loader">
          <FadeLoader
            color={"#E65C00"}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="cartfoodsectionorder">
          <div className="scroll-food-detail">
            <div className="foodmodal">
              <img
                src={
                  foodDetails?.item?.image
                    ? foodDetails?.item?.image
                    : Images.CartFood
                }
                alt="saladimage"
                className="foodModalimg"
              />
              <h2 className="foodmodalheading mt-2">
                {foodDetails?.item?.name}
              </h2>
              <div className="restroinfo">
                <img
                  src={Images.sarahcap}
                  alt="sarahcapimage"
                  className="img-fluid"
                />

                <div className="johnchatdetail">
                  <h6 className="chatDates text-capitalize">{foodDetails?.item?.category}</h6>
                </div>
              </div>
            </div>
            <div className="deliverytimesheet">
              <div className="modalfooddelivery">
                <div className="foodeliverytime">
                  <h6 className="chefName">Delivery Time</h6>
                  <h6 className="chatSearchere_  mt-1">
                    {foodDetails?.item?.deliveryTime} mins
                  </h6>
                </div>
                <div className="foodrating">
                  <h6 className="chatSearchere_  mt-1">
                    <h6 className="chefName">Price Per Item</h6>£{" "}
                    {foodDetails?.item?.price}
                  </h6>
                </div>
              </div>
              <div className="deliverfrom mt-2">
                <h6 className="chefName">Deliver From</h6>
                <p className="chatSearchere_  mt-1">{foodDetails?.address}</p>
              </div>
              <div className="deliverfrom mt-2">
                <h6 className="chefName">Description</h6>
                <p className="chatSearchere_  mt-1">
                  {foodDetails?.item?.description}
                </p>
              </div>
              <div className="foodrating mt-2">
                <h6 className="chefName">Rating</h6>
                <div
                  onClick={() => {
                    handleOpenModal("ratingmenu");
                  }}
                  className="chefrating mt-1"
                >
                  <i className="las la-star startIcon"></i>
                  <p className="ratingheading">
                    {foodDetails?.item?.averageRating} (
                    {foodDetails?.item?.menuReview} Reviews)
                  </p>
                </div>
              </div>
            </div>
            {pathname === "/chef-details" ? (
              ""
            ) : (
              <div className="chef-details-modal">
                <div className="chef-detail-wrapper">
                  <div className="chef-detail-wrappper">
                    <img
                      className="chef-detail-bg"
                      alt="chef-bg"
                      src={Images.sidebarLight}
                    />
                    <img
                      className="chef-detail-image"
                      alt="chef-bg"
                      src={
                        foodDetails?.item?.userId?.userInfo?.profilePhoto
                          ? foodDetails?.item?.userId?.userInfo?.profilePhoto
                          : Images.dummyProfile
                      }
                    />
                  </div>
                  <div className="chef-detail-modal-name">
                    <h1 className="chef-detail-name">
                      {foodDetails?.item?.userId?.userInfo?.firstName}{" "}
                      {foodDetails?.item?.userId?.userInfo?.lastName}
                    </h1>
                    <span className="detail-exp-tag">
                      {foodDetails?.item?.userId?.chefInfo?.experience}+ Year
                      Exp.
                    </span>
                  </div>
                </div>
                <div className="rating-review-detail">
                  <div
                    onClick={() => {
                      handleOpenModal("ratingchef");
                    }}
                    className="chefrating mt-1"
                  >
                    <i className="las la-star startIcon"></i>
                    <p className="ratingheading">
                      {foodDetails?.item?.userId?.averageRating}
                    </p>
                  </div>
                  <p className="detail-review-count">
                    {foodDetails?.item?.userId?.chefReview} reviews
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* <div className="orderamount">
          <h6 className="foodamountmodal">
              £{foodDetails?.item?.price * Number(quantity)}.00
            </h6>
            <div className="quantitymodal">
              <h6 className="notificationText ">Quantity:</h6>
              <div className="quantity">
                <div
                  onClick={() => handleQuantity("decrease")}
                  className="Quantiycheck"
                >
                  <img
                    src={Images.minusModal}
                    className="calQuantity"
                    alt="minusModal"
                  />
                </div>
                <span className="number">{quantity}</span>
                <div
                  onClick={() => handleQuantity("increase")}
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
          </div> */}

          <div className="modalfooterbtnAddToCart">
            {/* {cartFlag === "addToCart" ? ( */}
            <div className="addToCartBtn">
              <div className="addfoodbtn">
                <button
                  disabled={userData?.loading}
                  onClick={() => handleAddCart("order")}
                  className="addcartitem"
                  type="button"
                >
                  Order Now
                  {userData?.loading && isLoading === "order" && (
                    <span className="spinner-border spinner-border-sm ms-1"></span>
                  )}
                </button>
                {foodDetails?.item?.userId?.chefInfo?.isAvailable && (
                  <button
                    disabled={userData?.loading}
                    onClick={() => handleOpenModal("bookchef")}
                    className="mt-2 hire-chef-btn"
                    type="button"
                  >
                    Hire Chef at £ {foodDetails?.item?.bookingPriceForItem}
                    {/* {userData?.loading && (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                )} */}
                  </button>
                )}
              </div>
            </div>
            {/* ) : (
            <div className="orderNow">
              <div className="totalPrice">
                <p className="price">£{foodDetails?.item?.price}.00</p>
              </div>
              <button
                disabled={userData?.loading}
                className="orderbutton p-0"
                type="button"
                onClick={() => {
                  handleAddCart();
                }}
              >
                {userData?.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                CheckOut
              </button>
            </div>
          )} */}
          </div>
        </div>
      )}
      <CustomModal
        key={key}
        show={modalDetail.show}
        // backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "CartModal" ? "commonWidth customContent" : ""
        }
        ids={
          modalDetail.flag === "allCart"
            ? "CartModal"
            : modalDetail.flag === "ratingmenu"
            ? "availablebtnModal"
            : modalDetail.flag === "ratingchef"
            ? "ratingusermodal"
            : modalDetail.flag === "bookchef"
            ? "bookchefmodal"
            : ""
        }
        child={
          modalDetail.flag === "allCart" ? (
            <UserCartModal
              close={() => {
                handleOnCloseModal();
                close();
              }}
            />
          ) : modalDetail.flag === "ratingmenu" ? (
            <MenuRating
              handleGetChefDetails={handleGetMenuDetails}
              menuId={menuId}
              close={() => {
                handleOnCloseModal();
                close();
              }}
            />
          ) : modalDetail.flag === "ratingchef" ? (
            <ChefRating
              handleGetChefDetails={handleGetMenuDetails}
              chefId={foodDetails?.item?.userId?._id}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "bookchef" ? (
            <BookNowModal
            quantity={quantity}
              menuId={menuId}
              chefId={foodDetails?.item?.userId?._id}
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
          modalDetail.flag === "allCart" ? (
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
          ) : modalDetail.flag === "ratingmenu" ||
            modalDetail.flag === "ratingchef" ? (
            <>
              <h2 className="modal_Heading">Rating & Reviews</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </>
          ) : modalDetail.flag === "bookchef" ? (
            <>
              <div className="edithead">
                <h2 className="modal_Heading">Hire Chef</h2>
                <p className="chatUser">Enter your venue details below.</p>
              </div>
              <p onClick={handleOnCloseModal} className="modal_cancel">
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

export default CartFoodModalOrder;
