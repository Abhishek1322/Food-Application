import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { Link } from "react-router-dom";
import CustomModal from "./CustomModal";
import { singleMenu, onErrorStopLoad } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import UserCartModal from "./UserCartModal";
import { addToCart } from "../../../../redux/slices/user";
import { useUserSelector } from "../../../../redux/selector/user";
import MenuRating from "./MenuRating";

const CartFoodModalOrder = (props) => {
  const { menuId, close, cartFlag } = props;
  console.log("cartFlagcartFlag", cartFlag);
  const userData = useUserSelector();
  const [foodDetails, setFoodDetails] = useState([]);
  const [deliverFrom, setDeliverFrom] = useState("");
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
  const [quantity, setQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
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
    let params = {
      id: menuId,
    };
    dispatch(
      singleMenu({
        ...params,
        cb(res) {
          console.log("chekckresp", res);
          if (res.status === 200) {
            setFoodDetails(res?.data?.data);
            setItemPrice(res?.data?.data?.item?.price);
            setTotalPrice(res?.data?.data?.item?.price);
            setDeliverFrom(res?.data?.data?.address);
          }
        },
      })
    );
  }, []);

  // increase item quantity
  const handleIcreaseQuantity = () => {
    setQuantity(quantity + 1);
    setTotalPrice((pre) => Number(pre) + Number(itemPrice));
  };

  // decrease item quantity
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotalPrice((pre) => Number(pre) - Number(itemPrice));
    }
  };

  // add menu item in cart
  const handleAddCart = () => {
    let params = {
      menuItemId: menuId,
      quantity: quantity.toString(),
    };
    dispatch(
      addToCart({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleOpenModal("allCart");
          }
        },
      })
    );
  };

  // manage cart data e.g. quantity and price
  //  const handleCartData = (type, menuId, qty) => {
  //   let quantity = Number(qty);
  //   quantity =
  //     type === "increase"
  //       ? quantity + 1
  //       : type === "decrease" && quantity > 1
  //       ? quantity - 1
  //       : 1;
  //   let params = {
  //     cartId: cartId,
  //     menuItemId: menuId,
  //     quantity: quantity.toString(),
  //   };
  //   dispatch(
  //     updateCartItem({
  //       ...params,
  //       cb(res) {
  //         if (res.status === 200) {
  //           handleGetAllCart();
  //         }
  //       },
  //     })
  //   );
  // };

  return (
    <>
      <div className="cartfoodsectionorder">
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
          <h2 className="foodmodalheading mt-2">{foodDetails?.item?.name}</h2>
          <div className="restroinfo">
            <Link to="#">
              <img
                src={Images.sarahcap}
                alt="sarahcapimage"
                className="img-fluid"
              />
            </Link>
            <div className="johnchatdetail">
              <Link to="#">
                <h6 className="chatDates">{foodDetails?.item?.category}</h6>
              </Link>
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
                  {foodDetails?.item?.totalReview} Reviews)
                </p>
              </div>
            </div>
          </div>
          <div className="deliverfrom mt-2">
            <h6 className="chefName">Deliver From</h6>
            <p className="chatSearchere_  mt-1">{foodDetails?.address}</p>
          </div>
          <div className="deliverfrom mt-2">
            <h6 className="chefName">Description</h6>
            <p className="chatSearchere_  mt-1 ">
              {foodDetails?.item?.description}
            </p>
          </div>
        </div>
        <div className="orderamount">
          <h6 className="foodamountmodal">£{totalPrice}.00</h6>
          <div className="quantitymodal">
            <h6 className="notificationText ">Quantity:</h6>
            <div className="quantity">
              <div
                onClick={() => handleDecreaseQuantity()}
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
                onClick={() => handleIcreaseQuantity()}
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
        <div className="modalfooterbtnAddToCart">
          {cartFlag === "addToCart" ? (
            <div className="addToCartBtn">
              <div className="addfoodbtn">
                <button
                  disabled={userData?.loading}
                  onClick={() => handleAddCart()}
                  className="addcartitem"
                  type="button"
                >
                  {userData?.loading && (
                    <span className="spinner-border spinner-border-sm me-1"></span>
                  )}
                  Add to Cart
                </button>
              </div>
            </div>
          ) : (
            <div className="orderNow">
              <div className="totalPrice">
                <p className="price">£{totalPrice}.00</p>
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
          )}
        </div>
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
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
              menuId={menuId}
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
          ) : modalDetail.flag === "ratingmenu" ? (
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
