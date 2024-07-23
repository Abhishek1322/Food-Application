import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PayNowModal from "./PayNowModal";
import AddCardDetails from "./AddCardDetails";

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
  handleOpenModalCardDetails
}) => {
  const options = {
    clientSecret: client,
  };

  return (
    <Elements stripe={stripePromise}>
      {/* <PayNowModal
        cartId={cartId}
        selectedAddress={selectedAddress}
        orderPrice={orderPrice}
        orderType={orderType}
        orderNumber={orderNumber}
        orderId={orderId}
      /> */}
      <AddCardDetails handleOpenModalCardDetails={handleOpenModalCardDetails}/>
    </Elements>
  );
};

export default CheckOutForm;
