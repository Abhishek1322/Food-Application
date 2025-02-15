import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { singleMenu, onErrorStopLoad } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "./CustomModal";
import CartFoodModalOrder from "./CartFoodModalOrder";
import MenuRating from "./MenuRating";

const CartFoodModal = (props) => {
  const { menuId, close } = props;
  const [foodDetails, setFoodDetails] = useState([]);
  const [deliverFrom, setDeliverFrom] = useState("");
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
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
          if (res.status === 200) {
            setFoodDetails(res.data.data.item);
            setDeliverFrom(res.data.data.address);
          }
        },
      })
    );
  }, []);

  return (
    <>
      <div className="cartfoodsection">
        <div className="foodmodal">
          <img
            src={foodDetails?.image ? foodDetails?.image : Images.CartFood}
            alt="saladimage"
            className="foodModalimg"
          />
          <h2 className="foodmodalheading mt-2">{foodDetails?.name}</h2>
          <div className="restroinfo">
            <img
              src={Images.sarahcap}
              alt="sarahcapimage"
              className="img-fluid"
            />

            <div className="johnchatdetail">
              <h6 className="chatDates">{foodDetails?.category}</h6>
            </div>
          </div>
        </div>
        <div className="deliverytimesheet">
          <div className="modalfooddelivery">
            <div className="foodeliverytime">
              <h6 className="chefName">Delivery Time</h6>
              <h6 className="chatSearchere_  mt-1">
                {foodDetails?.deliveryTime} mins
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
                  {foodDetails?.averageRating} ({foodDetails?.totalReview}{" "}
                  Reviews)
                </p>
              </div>
            </div>
          </div>
          <div className="deliverfrom mt-2">
            <h6 className="chefName">Deliver From</h6>
            <p className="chatSearchere_  mt-1">{deliverFrom}</p>
          </div>
          <div className="deliverfrom mt-2">
            <h6 className="chefName">Description</h6>
            <p className="chatSearchere_  mt-1 ">{foodDetails?.description}</p>
          </div>
        </div>
        <h4 className="foodamountmodal">£ {foodDetails?.price}.00</h4>

        <div className="modalfooterbtn">
          <div className="addfoodbtn">
            <button
              className="foodmodalbtn"
              type="button"
              onClick={() => {
                handleOpenModal("CartFoodOrder");
              }}
            >
              Buy Now
            </button>
          </div>
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
          modalDetail.flag === "CartFoodOrder"
            ? "commonWidth customContent"
            : modalDetail.flag === "ratingmenu"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "CartFoodOrder"
            ? "CartFoodOrderModal"
            : "ratingmenu"
            ? "availablebtnModal"
            : ""
        }
        child={
          modalDetail.flag === "CartFoodOrder" ? (
            <CartFoodModalOrder
              menuId={menuId}
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
          modalDetail.flag === "CartFoodOrder" ? (
            <>
              <p
                onClick={() => {
                  close();
                  handleOnCloseModal();
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

export default CartFoodModal;
