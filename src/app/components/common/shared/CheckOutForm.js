import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PayNowModal from "./PayNowModal";

//STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(process.env.REACT_APP_SRTIPE_PUBLISHABLE_KEY);
const CheckOutForm = ({
  cartId,
  selectedAddress,
  orderPrice,
  orderType,
  orderNumber,
  orderId,
  client,
}) => {
  const options = {
    clientSecret: client,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PayNowModal
        cartId={cartId}
        selectedAddress={selectedAddress}
        orderPrice={orderPrice}
        orderType={orderType}
        orderNumber={orderNumber}
        orderId={orderId}
      />
    </Elements>
  );
};

export default CheckOutForm;
