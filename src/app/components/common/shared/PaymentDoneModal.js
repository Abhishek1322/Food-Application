import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal';
import OrderPlaceModal from './OrderPlaceModal';

const PaymentDoneModal = () => {
    const [key, setKey] = useState(Math.random());
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

    const handleUserProfile = (flag) => {

        setModalDetail({
            show: true,
            flag: flag,
            type: flag,
        });
        setKey(Math.random());
    };
    return (
        <>
            <div className='paymentdonesection'>
                <img src={Images.accountDeleted} alt='accountdeletedimg' className='img-fluid' />
                <p className='accountDeleted mt-3'> Payment Done</p>
                <p className='accountdeletetxt mt-2 '>Your payment has been successfully done
                    for order no. #12458</p>
                <div className='modalfooterbtn'>
                    <div className='addfoodbtn'>
                        <button className='foodmodalbtn' onClick={() => {
                                            handleUserProfile("orderplace")
                                        }}>
                            Order Placed
                        </button>
                    </div>
                </div>
            </div>
            <CustomModal
                key={key}
                show={modalDetail.show}
                backdrop="static"
                showCloseBtn={false}
                isRightSideModal={true}
                mediumWidth={false}
                className={modalDetail.flag === "orderplace" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "orderplace" ? "ordermodalplace" : ""}
                child={
                    modalDetail.flag === "orderplace" ? (
                        <OrderPlaceModal
                            close={() => handleOnCloseModal()}
                        />
                    ) :
                        ""
                }
                header=

                {modalDetail.flag === "orderplace" ?
                    <>
                        {/* <div className='editadressheading'>
                            <img src={Images.backArrowpassword} alt='backarrowimage' className='img-fluid' />
                            <div className='edithead'>
                                <h2 className="modal_Heading">
                                    Pay Now
                                </h2>
                                <p className='chatUser'>Debit/Credit cards acceptable</p>
                            </div>
                        </div>
                        <p onClick={handleOnCloseModal} className='modal_cancel'>
                            <img src={Images.modalCancel} className='ModalCancel' />
                        </p> */}
                    </>
                    :
                    ''
                }
                onCloseModal={() => handleOnCloseModal()}
            />
        </>
    )
}

export default PaymentDoneModal