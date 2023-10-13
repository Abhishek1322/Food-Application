import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal';
import OrderCancelModal from './OrderCancelModal';

const YourOrderModal = () => {
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
            <div className='yourordersection paymentdonesection'>
                <img src={Images.OrderPlace} alt='accountdeletedimg' className='img-fluid' />
                <h1 className='accountDeleted mt-3'> Are You Sure You Want to Cancel Your Order.</h1>
                <p className='accountdeletetxt mt-2 '>Cancellation charges apply.</p>
                <div className='modalfooterbtn'>
                    <div className='addfoodbtn'>
                        <button className='settingBoxtxt' type='button'>
                            No, don’t                            </button>
                        <button className='foodmodalbtn' type='button' onClick={() => {
                            handleUserProfile("ordercancel")
                        }}>
                            Yes, Cancel
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
                className={modalDetail.flag === "ordercancel" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "ordercancel" ? "ordermodalcancel" : ""}
                child={
                    modalDetail.flag === "ordercancel" ? (
                        <OrderCancelModal
                            close={() => handleOnCloseModal()}
                        />
                    ) :
                        ""
                }
                header=

                {modalDetail.flag === "ordercancel" ?
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

export default YourOrderModal