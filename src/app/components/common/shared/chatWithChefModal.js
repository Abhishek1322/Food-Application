import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal'
import OrderReadyForDeliverModal from './orderReadyForDeliverModal.js'

const ChatWithChefModal = () => {

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

            <div className='modalfooterbtn  borderWith_'>
            <div className='chatSearchHere_ '>
                <input className='chatSearchere_' type='text' placeholder='Type Something...' />
                <img src={Images.chatgalleryImg} alt="logo" className="gallerImg" data-tooltip title="Click to go [crazy]" />
                <img src={Images.chatSendImg} alt="logo" className="sendImg" onClick={() => {
                                        handleUserProfile("orderReadyForDelivery")
                                    }} />

            </div>
            </div>

            <CustomModal
                key={key}
                show={modalDetail.show}
                backdrop="static"
                showCloseBtn={false}
                isRightSideModal={true}
                mediumWidth={false}
                className={modalDetail.flag === "orderReadyForDelivery" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "orderReadyForDelivery" ? "readyWithOrder": ""}
                child={
                    modalDetail.flag === "orderReadyForDelivery" ? (
                        <OrderReadyForDeliverModal
                            close={() => handleOnCloseModal()}
                            
                        />
                    ) :
                            ""
                }
                header=

                {modalDetail.flag === "orderReadyForDelivery" ?
                    <>
                     <div className='Common_header'>
                     <img
                                src={Images.backArrowpassword}
                                alt="logo"
                                className="img-fluid  arrowCommon_"
                            />
                            <div className='headerProfile ps-2'>
                            <p className='modal_Heading'>Order #12548</p>
                            <p className='innerhead_ ps-3'>In-Progress</p>
                            </div>
                     </div>
                        {/* <p onClick={handleOnCloseModal} className='modal_cancel'>
                            <img src={Images.modalCancel} className='ModalCancel' />
                        </p> */}
                    </>
                    :
                    modalDetail.flag === "CartFood" ?
                        <>
                            {/* <h2 className="modal_Heading">
                                Cart
                            </h2> */}
                            <p onClick={handleOnCloseModal} className='modal_cancel'>
                                <img src={Images.modalCancel} className='ModalCancel' />
                            </p>
                        </>
                        :
                        ''
                }
                onCloseModal={() => handleOnCloseModal()}
            />

        </>
    )
}

export default ChatWithChefModal