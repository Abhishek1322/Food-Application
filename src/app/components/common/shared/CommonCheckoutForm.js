import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCards } from "../../../../redux/slices/user";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import CheckOutForm from "./CheckOutForm";

const CommonCheckoutForm = ({ handleOpenModalCardDetails }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState(Math.random());
  const [allCards, setAllCards] = useState([]);
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });
  console.log("allCards", allCards);
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

  useEffect(() => {
    dispatch(
      getAllCards({
        cb(res) {
          if (res?.status === 200) {
            setAllCards(res?.data?.data?.data);
          }
        },
      })
    );
  }, []);
  return (
    <>
      {/* <div className="no-card-found">
        <div className="noData">
          <img className="w-100" alt="no data found" src={Images.nocheffound} />
          <p className="no-chef-found-near">No Card Found</p>
        </div>
      </div> */}
      <div className="all-cards">
        {allCards?.map((item, index) => (
          <>
          <div key={index} className="cardOuter active">
            <div className="cardInner">
              <div className="d-flex justify-content-between align-items-center pb-4">
                <div>
                  <img src={Images.cardSign} alt="" />
                </div>
                <div>
                  <img
                    src={Images.whitebin}
                    alt=""
                    // onClick={() => handleDelCard(data?.id)}
                  />
                  <img className="checkIcon" src={Images.checked} alt="" />
                </div>
              </div>
              <p className="bigText mb-0 pb-4">
                <img src={Images.starswhite} alt="" />
                <span>{"4444"}</span>
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="text_ mb-0 medText">{"John Smith"}</p>
                <p className="subtext mb-0 medText">
                  {"02"}/{"2022"}
                </p>
              </div>
            </div>
          </div>
          </>
          
        ))}
      </div>

      <div className="add-card">
        <div className="add-card-buttons">
          <button
            onClick={() => handleOpenModal("cardDetails")}
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
        ids={modalDetail.flag === "cardDetails" ? "ordereditaddress" : ""}
        child={
          modalDetail.flag === "cardDetails" ? (
            <CheckOutForm
              close={() => handleOnCloseModal()}
              handleOpenModalCardDetails={handleOpenModalCardDetails}
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
