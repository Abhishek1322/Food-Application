import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CommonCheckoutForm from "./CommonCheckoutForm";

//STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(process.env.REACT_APP_SRTIPE_PUBLISHABLE_KEY);
const ConfirmCardWrapper = ({
  totalPrice,
  cartId,
  selectedAddress,
  orderType,
  handleOpenModalCardDetails,
}) => {
  return (
    <Elements stripe={stripePromise}>
      <CommonCheckoutForm
        totalPrice={totalPrice}
        cartId={cartId}
        selectedAddress={selectedAddress}
        orderType={orderType}
        handleOpenModalCardDetails={handleOpenModalCardDetails}
      />
    </Elements>
  );
};

export default ConfirmCardWrapper;
