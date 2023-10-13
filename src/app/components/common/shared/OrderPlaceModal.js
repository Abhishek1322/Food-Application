import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal';
import YourOrderModal from './YourOrderModal';

const OrderPlaceModal = () => {
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
            <div className='orderplacesection paymentdonesection'>
                    <img src={Images.accountDeleted} alt='accountdeletedimg' className='img-fluid' />
                    <h1 className='accountDeleted mt-3'> Order Placed</h1>
                    <p className='accountdeletetxt mt-2 '>Your order has been
                        successfully placed.</p>
                    <div className='modalfooterbtn'>
                        <div className='addfoodbtn'>
                            <button className='foodmodalbtn' type='button' onClick={() => {
                                            handleUserProfile("yourorderplace")
                                        }}>
                            Okay
                            </button>
                        </div>
                        <div class="progress orderbar">
                            <div class="progress-bar orderprogress" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p className='progressheading'>59 Sec</p>
                        <button className='itemsQuantity' type='button'>Cancel Order</button>
                    </div>
            </div>
            <CustomModal
                key={key}
                show={modalDetail.show}
                backdrop="static"
                showCloseBtn={false}
                isRightSideModal={true}
                mediumWidth={false}
                className={modalDetail.flag === "yourorderplace" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "yourorderplace" ? "yourordermodalplace" : ""}
                child={
                    modalDetail.flag === "yourorderplace" ? (
                        <YourOrderModal
                            close={() => handleOnCloseModal()}
                        />
                    ) :
                        ""
                }
                header=

                {modalDetail.flag === "yourorderplace" ?
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

export default OrderPlaceModal