import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCard, onErrorStopLoad } from "../../../../redux/slices/user";
import * as Images from "../../../../utilities/images";

const DeleteCardModal = ({ close, cardId, hadleGetAllCards }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // delete card
  const handleDeleteCard = () => {
    setIsLoading(true);
    let params = {
      id: cardId,
    };
    dispatch(
      deleteCard({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            setIsLoading(false);
            hadleGetAllCards();
            close();
          } else {
            setIsLoading(false);
          }
        },
      })
    );
  };

  // close loader after page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="DeleteMenuModal paymentdonesection userDelete">
        <img
          src={Images.deleteMenuImg}
          alt="accountdeletedimg"
          className="img-fluid"
        />
        <p className="accountDeleted mt-3">Delete Card</p>
        <p className="accountdeletetxt mt-2 ">
          Are you sure, you want to delete this card?
        </p>
        <div className="modalfooterbtn mb-4">
          <div className="orderItems_ flexBox ">
            <button onClick={close} className="cancelOrder_ me-4">
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={handleDeleteCard}
              className="submitOrder_"
            >
              Yes
              {isLoading && (
                <span className="spinner-border spinner-border-sm ms-2"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCardModal;
