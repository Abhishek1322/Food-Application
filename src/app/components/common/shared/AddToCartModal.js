import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { singleMenu, onErrorStopLoad } from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, getAllCart } from "../../../../redux/slices/user";

const AddToCartModal = (props) => {
  const { menuId, close } = props;
  const [foodDetails, setFoodDetails] = useState([]);
  const [deliverFrom, setDeliverFrom] = useState("");
  const dispatch = useDispatch();

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

  // add menu item in cart
  const handleAddCart = () => {
    let params = {
      menuItemId: menuId,
      quantity: 1,
    };
    dispatch(
      addToCart({
        ...params,
        cb(res) {
          if (res.status === 200) {
            close();
            getLatestCart();
          }
        },
      })
    );
  };

  // get latest cart count
  const getLatestCart = () => {
    dispatch(
      getAllCart({
        cb(res) {},
      })
    );
  };

  return (
    <>
      <div className="cartfoodsection addCartModal">
        <div className="foodmodal">
          <img
            src={foodDetails?.image ? foodDetails?.image : Images.CartFood}
            alt="saladimage"
            className="foodModalimg"
          />
          <h2 className="foodmodalheading mt-2">{foodDetails?.name}</h2>
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
                <h6 className="chatDates">{foodDetails?.category}</h6>
              </Link>
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
              <div className="chefrating mt-1">
                <i className="las la-star startIcon"></i>
                <p className="ratingheading">4.5 (845 Reviews)</p>
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
              onClick={() => handleAddCart()}
              className="foodmodalbtn"
              type="button"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCartModal;
