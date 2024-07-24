import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AddCardDetails from "./AddCardDetails";

//STRIPE_PUBLISHABLE_KEY
const stripePromise = loadStripe(process.env.REACT_APP_SRTIPE_PUBLISHABLE_KEY);
const CheckOutForm = ({ handleOpenModalCardDetails }) => {
  return (
    <Elements stripe={stripePromise}>
      <AddCardDetails handleOpenModalCardDetails={handleOpenModalCardDetails} />
    </Elements>
  );
};

export default CheckOutForm;
