import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import PaymentDoneModal from "./PaymentDoneModal";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const PayNowModal = ({
  close,
  cartId,
  selectedAddress,
  orderPrice,
  orderType,
  bookingData,
  bookingAddress,
}) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(Math.random());
  const [orderId, setOrderId] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });
  console.log(process.env.REACT_APP_THANK_YOU_PAGE, "location");
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

  // submit payment
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_THANK_YOU_PAGE}?cartId=${cartId}&addressId=${selectedAddress}&orderType=${orderType}`,
      },
    });

    setLoading(true);
    if (result.error) {
      toast.error(result.error.message);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="paymodalsection">
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <div className="modalfooterbtn">
            <div className="addfoodbtn">
              <button
                className="foodmodalbtn"
                type="submit"
                disabled={!stripe || loading}
              >
                Pay £{orderPrice}.00
                {loading && (
                  <span className="spinner-border spinner-border-sm ms-1"></span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        // backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "paydone" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "paydone" ? "paydonemodal" : ""}
        child={
          modalDetail.flag === "paydone" ? (
            <PaymentDoneModal
              close={() => {
                close();
                handleOnCloseModal();
              }}
              orderNumber={orderNumber}
              orderId={orderId}
              orderType={orderType}
            />
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default PayNowModal;
