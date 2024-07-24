import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCards } from "../../../../redux/slices/user";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import CheckOutForm from "./CheckOutForm";
import { FadeLoader } from "react-spinners";
import DeleteCardModal from "./DeleteCardModal";

const CommonCheckoutForm = ({ handleOpenModalCardDetails }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
  const [allCards, setAllCards] = useState([]);
  const [cardId, setCartId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
  const handleOpenModal = (event, flag, deleteCardId) => {
    event.stopPropagation();
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
                            onClick={(e) =>
                              handleOpenModal(e, "deleteCard", item?.id)
                            }
                            src={Images.whitebin}
                            alt=""
                          />
                          {/* <img className="checkIcon" src={Images.checked} alt="" /> */}
                        </div>
                      </div>
                      <p className="bigText mb-0 pb-4">
                        <img src={Images.starswhite} alt="" />
                        <span>{item?.card?.last4}</span>
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
            onClick={(e) => handleOpenModal(e, "cardDetails")}
            className="add-card-new"
          >
            Add Card
          </button>
          <button className="pay-with-card">Pay</button>
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
          modalDetail.flag === "deleteCard"
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
