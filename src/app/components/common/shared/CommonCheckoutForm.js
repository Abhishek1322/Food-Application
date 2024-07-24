import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createOrder,
  getAllCards,
  onErrorStopLoad,
} from "../../../../redux/slices/user";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import CheckOutForm from "./CheckOutForm";
import { FadeLoader } from "react-spinners";
import DeleteCardModal from "./DeleteCardModal";
import { toast } from "react-toastify";
import { useUserSelector } from "../../../../redux/selector/user";
import PaymentDoneModal from "./PaymentDoneModal";
// import { useStripe } from "@stripe/react-stripe-js";

const CommonCheckoutForm = ({
  cartId,
  selectedAddress,
  totalPrice,
  orderType,
  handleOpenModalCardDetails,
}) => {
  // const stripe = useStripe();
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const userSelector = useUserSelector();
  const { loading } = userSelector;
  const [key, setKey] = useState(Math.random());
  const [allCards, setAllCards] = useState([]);
  const [cardId, setCartId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFlag, setLoadingFlag] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderId, setOrderId] = useState("");
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
    cardId: "",
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
  const handleOpenModal = (flag, deleteCardId) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
      cardId: deleteCardId,
    });
    setKey(Math.random());
  };

  // get All cards
  useEffect(() => {
    hadleGetAllCards();
  }, []);

  // get all card
  const hadleGetAllCards = () => {
    dispatch(
      getAllCards({
        cb(res) {
          if (res?.status === 200) {
            setAllCards(res?.data?.data?.data);
            setIsLoading(false);
          }
        },
      })
    );
  };

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // create payment details
  const handlePayOrder = (flag) => {
    if (!cardId) {
      showToast("Please select a card for payment");
      return;
    }
    setLoadingFlag(flag);
    let params = {
      cartId: cartId,
      addressId: selectedAddress,
      cardId: cardId,
    };
    dispatch(
      createOrder({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            setOrderNumber(
              res?.data?.data?.orderId
                ? res?.data?.data?.orderId
                : res?.data?.data?.bookingId
            );
            setOrderId(res?.data?.data?._id);
            // handleConfirmCardPayment(res?.data?.data?.client_secret);
            handleOpenModal("paymentDoneModal");
          }
        },
      })
    );
  };

  //Confirm Card payment
  // const handleConfirmCardPayment = async (clientSecret) => {
  //   try {
  //     const { paymentIntent, error } = await stripe.confirmCardPayment(
  //       clientSecret
  //     );
  //     console.log("paymentIntent", paymentIntent);
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //   }
  // };

  // stop loader on error
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="good-loader">
          <FadeLoader
            color={"#E65C00"}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="all-cards">
          {console.log("allCardsallCards", allCards)}
          {allCards && allCards?.length > 0 ? (
            <>
              {allCards?.map((item, index) => (
                <>
                  <div
                    key={index}
                    className={
                      cardId === item?.id ? "cardOuter active" : "cardOuter"
                    }
                  >
                    <div
                      onClick={() => setCartId(item?.id)}
                      className="cardInner"
                    >
                      <div className="d-flex justify-content-between align-items-center pb-4">
                        <div>
                          <img src={Images.cardSign} alt="" />
                        </div>
                        <div>
                          <img
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal("deleteCard", item?.id);
                            }}
                            src={Images.whitebin}
                            alt=""
                          />
                          {/* <img className="checkIcon" src={Images.checked} alt="" /> */}
                        </div>
                      </div>
                      <p className="bigText mb-0 pb-4">
                        <img src={Images.starswhite} alt="" />{" "}
                        <span> {item?.card?.last4}</span>
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="text_ mb-0 medText">
                          {item?.card?.brand}
                        </p>
                        <p className="subtext mb-0 medText">
                          {item?.card?.exp_month}/{item?.card?.exp_year}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <div className="no-card-found">
              <div className="noData">
                <img
                  className="w-100"
                  alt="no data found"
                  src={Images.nocheffound}
                />
                <p className="no-chef-found-near">No Card Found</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="add-card">
        <div className="add-card-buttons">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenModal("cardDetails");
            }}
            className="add-card-new"
          >
            Add Card
          </button>
          <button
            onClick={() => handlePayOrder("pay")}
            className="pay-with-card"
          >
            Pay £{totalPrice.toFixed(2)}
            {loading && loadingFlag === "pay" && (
              <span className="spinner-border spinner-border-sm ms-2"></span>
            )}
          </button>
        </div>
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        // backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "cardDetails" ? "commonWidth customContent" : ""
        }
        ids={
          modalDetail.flag === "cardDetails" ||
          modalDetail.flag === "deleteCard" ||
          modalDetail.flag === "paymentDoneModal"
            ? "ordereditaddress"
            : ""
        }
        child={
          modalDetail.flag === "cardDetails" ? (
            <CheckOutForm
              close={() => handleOnCloseModal()}
              handleOpenModalCardDetails={handleOpenModalCardDetails}
            />
          ) : modalDetail.flag === "deleteCard" ? (
            <DeleteCardModal
              close={() => handleOnCloseModal()}
              hadleGetAllCards={hadleGetAllCards}
              cardId={modalDetail?.cardId}
            />
          ) : modalDetail.flag === "paymentDoneModal" ? (
            <PaymentDoneModal
              orderId={orderId}
              orderNumber={orderNumber}
              orderType={orderType}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "cardDetails" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid arrowCommon_"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Add Card Details</h2>
                </div>
              </div>
            </>
          ) : modalDetail.flag === "deleteCard" ? (
            <>
              <div className="editadressheading">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="backarrowimage"
                  className="img-fluid arrowCommon_"
                />
                <div className="edithead">
                  <h2 className="modal_Heading">Delete Card Details</h2>
                </div>
              </div>
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

export default CommonCheckoutForm;
