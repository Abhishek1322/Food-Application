import React, { useEffect, useRef, useState } from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCard, onErrorStopLoad } from "../../../../redux/slices/user";
import { useUserSelector } from "../../../../redux/selector/user";

const AddCardDetails = ({ handleOpenModalCardDetails }) => {
  const toastId = useRef(null);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const userSelector = useUserSelector();
  const { loading } = userSelector;
  const [isLoading, setIsLoading] = useState(false);

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // submit card
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const cardNumberElement = elements.getElement(CardNumberElement);
    const { token, error } = await stripe.createToken(cardNumberElement);
    if (error) {
      setIsLoading(false);
      showToast(error.message);
    } else if (token) {
      setIsLoading(false);
      handleCreateCard(token?.id);
      console.log("token", token);
    }
  };

  // create card
  const handleCreateCard = (token) => {
    let params = {
      token,
    };
    dispatch(
      createCard({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            handleOpenModalCardDetails("commonCheckoutForm");
          }
        },
      })
    );
  };

  // style card elements
  const elementOptions = {
    invalid: {
      iconColor: "#e65c00",
      color: "#FFC7EE",
    },
    showIcon: true,
  };

  // stop loader on error
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="add-card-details-outer">
        <form className="card-input-button" onSubmit={handleSubmit}>
          <div>
            <div className="mt-4">
              <CardNumberElement
                options={elementOptions}
                className="border-input"
              />
            </div>
            <div className="mt-4">
              <CardExpiryElement
                options={elementOptions}
                className="border-input"
              />
            </div>
            <div className="mt-4">
              <CardCvcElement
                options={elementOptions}
                className="border-input"
              />
            </div>
          </div>

          <button disabled={isLoading || loading} className="pay-with-card">
            Add{" "}
            {isLoading ||
              (loading && (
                <span className="spinner-border spinner-border-sm ms-2"></span>
              ))}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCardDetails;
