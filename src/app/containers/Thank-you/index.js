import React, { useEffect, useState } from "react";
import * as Images from "../../../utilities/images";
import CustomModal from "../../components/common/shared/CustomModal";
import OrderPlaceModal from "../../components/common/shared/OrderPlaceModal";
import { useSearchParams } from "react-router-dom";
import OrderAlertModal from "../../components/common/shared/OrderAlertModal";

const PaymentDoneModal = () => {
  const [searchParams] = useSearchParams();
  const cartId = searchParams.get("cartId");
  const addressId = searchParams.get("addressId");
  const orderType = searchParams.get("orderType");
  const orderNumber = searchParams.get("orderNumber");
  const orderId = searchParams.get("orderId");
  const [key, setKey] = useState(Math.random());
  const [showAlert, setShowAlert] = useState(false);
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
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
  const handleOpneModal = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  useEffect(() => {
    setTimeout(() => {
      handleOpneModal("orderplace");
    }, 2500);
  }, []);


  return (
    <>
      <div className="paymentdonesection">
        <img
          src={Images.accountDeleted}
          alt="accountdeletedimg"
          className="img-fluid"
        />
        <h1 className="accountDeleted mt-3"> Payment Done</h1>
        <p className="accountdeletetxt mt-2 ">
          Your payment has been successfully done for{" "}
          {orderType === "order" ? "order" : "booking"} no. #{orderNumber}
        </p>
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "orderplace" ? "commonWidth customContent" : ""
        }
        ids={
          modalDetail.flag === "orderplace"
            ? "ordermodalplace"
            : modalDetail.flag === "orderalert"
            ? "logout"
            : ""
        }
        child={
          modalDetail.flag === "orderplace" ? (
            <OrderPlaceModal
              orderId={orderId}
              orderType={orderType}
              addressId={addressId}
              cartId={cartId}

              close={() => {
                handleOnCloseModal();
              }}
            />
          ) : modalDetail.flag === "orderalert" ? (
            <OrderAlertModal orderType={orderType} setShowAlert={setShowAlert} />
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default PaymentDoneModal;
