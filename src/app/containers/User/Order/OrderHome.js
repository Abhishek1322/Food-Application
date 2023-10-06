import React, { useState } from 'react'
import * as Images from "../../../../utilities/images";
import CustomModal from '../../../components/common/shared/CustomModal';
import UserOrderDetail from '../../../components/common/shared/UserOrderDetail';


const UserOrderHome = () => {
    const slides = Array(4).join().split(',').map(function (a) { return this.i++ }, { i: 1 });
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
            <div className='userordersection'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='orderprocess active mb-3' onClick={() => {
                                handleUserProfile("orderdetail")
                            }}>
                                <article className='flexBox justify-content-between'>
                                    <h6 className='fooodquantity_'>#12548</h6>
                                    <h6 className='chatTime_'>In-Progress</h6>
                                </article>
                                <div className='orderchefinfo'>
                                    <div className='row'>
                                        <div className='col-lg-6 col-md-12'>
                                            <div className='flexBox'>
                                                <img src={Images.OrderChef} alt='chefimg' className='img-fluid' />
                                                <div className='orderchefname'>
                                                    <h6 className='chefName '>Sarah Bergstrom</h6>
                                                    <h6 className='orderFrom'>Order From</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-12'>
                                            <div className='orderstatus'>
                                                <h6 className='Items'>4 Items</h6>
                                                <h6 className='timeOrder_'>Order placed on 12:24 pm</h6>
                                                <div className='userorderprice'>
                                                    <h5 className='orderPrice '>£22.00</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {slides && slides.map((val, i) => {
                            return (
                                <div className='col-lg-12'>
                                    <div className='orderprocess  mb-3' onClick={() => {
                                        handleUserProfile("orderdetail")
                                    }}>
                                        <article className='flexBox justify-content-between'>
                                            <h6 className='fooodquantity_'>#12548</h6>
                                            <h6 className='chatTime_'>Delivered</h6>
                                        </article>
                                        <div className='orderchefinfo'>
                                            <div className='row'>
                                                <div className='col-lg-6 col-md-12'>
                                                    <div className='flexBox'>
                                                        <img src={Images.OrderChef} alt='chefimg' className='img-fluid' />
                                                        <div className='orderchefname'>
                                                            <h6 className='chefName '>Sarah Bergstrom</h6>
                                                            <h6 className='orderFrom'>Order From</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-6 col-md-12'>
                                                    <div className='orderstatus'>
                                                        <h6 className='Items'>4 Items</h6>
                                                        <h6 className='timeOrder_'>Order placed on 12:24 pm</h6>
                                                        <div className='userorderprice'>
                                                            <h5 className='orderPrice '>£22.00</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
            </div>
            <CustomModal
                key={key}
                show={modalDetail.show}
                backdrop="static"
                showCloseBtn={false}
                isRightSideModal={true}
                mediumWidth={false}
                className={modalDetail.flag === "orderdetail" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "orderdetail" ? "userorderdetail" : ""}
                child={
                    modalDetail.flag === "orderdetail" ? (
                        <UserOrderDetail
                            close={() => handleOnCloseModal()}
                        />
                    ) :
                        ""
                }
                header=

                {modalDetail.flag === "orderdetail" ?
                    <>
                        <div className='Common_header'>
                            <div className='headerProfile'>
                                <p className='headerTxt_'>Order #12548</p>
                                <p className='headerInner_'>In-Progress</p>
                            </div>
                        </div>
                        <div onClick={handleOnCloseModal} className='modal_cancel'>
                            <img src={Images.modalCancel} className='ModalCancel' />
                        </div>
                    </>
                    :
                    ''
                }
                onCloseModal={() => handleOnCloseModal()}
            />
        </>
    )
}

export default UserOrderHome