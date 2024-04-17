import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

const PayNowModal = ({
  cartId,
  selectedAddress,
  orderPrice,
  orderType,
  orderNumber,
  orderId,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

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
        return_url: `${process.env.REACT_APP_THANK_YOU_PAGE}?cartId=${cartId}&addressId=${selectedAddress}&orderType=${orderType}&orderNumber=${orderNumber}&orderId=${orderId}`,
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
        <form className="p-3" onSubmit={handleSubmit}>
          <PaymentElement />
          <div className="modalfooterbtn">
            <div className="addfoodbtn">
              <button
                className="foodmodalbtn"
                type="submit"
                disabled={!stripe || loading}
              >
                Pay £{orderPrice?.toFixed(2)}
                {loading && (
                  <span className="spinner-border spinner-border-sm ms-1"></span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default PayNowModal;
