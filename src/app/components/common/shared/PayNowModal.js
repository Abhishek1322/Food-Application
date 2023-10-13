import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal';
import PaymentDoneModal from './PaymentDoneModal';

const PayNowModal = () => {
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
            <div className='paymodalsection'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className="input-container mt-4">
                            <input
                                type="text"
                                name="city"
                                className="border-input"
                                placeholder='Card Holder’s Name'
                            />
                            <label className="border-label">Card Holder’s Name</label>
                        </div>
                    </div>
                </div>
                <div className='paynowinputs'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className="input-container mt-4">
                                <input
                                    type="text"
                                    name="Zip Code"
                                    className="border-input"
                                    placeholder='5485 2658 2154 2210'
                                />
                                <label className="border-label">Card No</label>
                                <img src={Images.ZipCode} alt="InfoIcon" className='InputIcon' />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className="input-container mt-4">
                                <input
                                    type="text"
                                    name="Zip Code"
                                    className="border-input"
                                    placeholder='MM/YY'
                                />
                                <label className="border-label">Expires On</label>
                                <img src={Images.Calendar} alt="InfoIcon" className='InputIcon' />
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className="input-container mt-4">
                                <input
                                    type="text"
                                    name="Zip Code"
                                    className="border-input"
                                    placeholder='123'
                                />
                                <label className="border-label">Card No</label>
                                <img src={Images.ZipCode} alt="InfoIcon" className='InputIcon' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='modalfooterbtn'>
                    <div className='addfoodbtn'>
                        <button className='foodmodalbtn' type='submit' onClick={() => {
                            handleUserProfile("paydone")
                        }}>
                            Pay £44.00
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
                className={modalDetail.flag === "paydone" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "paydone" ? "paydonemodal" : ""}
                child={
                    modalDetail.flag === "paydone" ? (
                        <PaymentDoneModal
                            close={() => handleOnCloseModal()}
                        />
                    ) :
                        ""
                }
                header=

                {modalDetail.flag === "paydone" ?
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

export default PayNowModal