import React, { useState } from 'react'
import * as Images from "../../../../utilities/images";
import CustomModal from '../../../components/common/shared/CustomModal';
import UserOrderDetail from '../../../components/common/shared/UserOrderDetail';


const UserOrderHome = () => {
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
                <div className='container-fluid'>
                    <div className='row'>
                         <div className='col-lg-12'>
                            <div className='ordermain' onClick={() => {
                                        handleUserProfile("orderdetail")
                                    }}>
                                <div className='orderprocess active'>
                                    <p className='fooodquantity_'>#12548</p>
                                    <p className='chatTime_'>In-Progress</p>
                                </div>
                                <div className='orderchefinfo'>
                                    <div className='col-lg-6 col-md-12'>
                                        <div className='flexBox'>
                                            <img src={Images.OrderChef} alt='chefimg' className='img-fluid' />
                                            <div className='orderchefname'>
                                                <p className='chefName '>Sarah Bergstrom</p>
                                                <p className='orderFrom'>Order From</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-6 col-md-12'>
                                        <div className='orderstatus'>
                                            <p className='Items'>4 Items</p>
                                            <p className='timeOrder_'>Order placed on 12:24 pm</p>
                                            <div className='userorderprice'>
                                                <p className='orderPrice '>£22.00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div className='col-lg-12'>
                            <div className='ordermain'>
                                <div className='orderprocess'>
                                    <p className='fooodquantity_'>#12548</p>
                                    <p className='chatTime_'>Delivered</p>
                                </div>
                                <div className='orderchefinfo'>
                                    <div className='col-lg-6'>
                                        <div className='flexBox'>
                                            <img src={Images.OrderChef} alt='chefimg' className='img-fluid' />
                                            <div className='orderchefname'>
                                                <p className='chefName '>Sarah Bergstrom</p>
                                                <p className='orderFrom'>Order From</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='orderstatus'>
                                            <p className='Items'>4 Items</p>
                                            <p className='timeOrder_'>Order placed on 12:24 pm</p>
                                            <div className='userorderprice'>
                                                <p className='orderPrice '>£22.00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className='ordermain'>
                                <div className='orderprocess'>
                                    <p className='fooodquantity_'>#12548</p>
                                    <p className='chatTime_'>Delivered</p>
                                </div>
                                <div className='orderchefinfo'>
                                    <div className='col-lg-6'>
                                        <div className='flexBox'>
                                            <img src={Images.OrderChef} alt='chefimg' className='img-fluid' />
                                            <div className='orderchefname'>
                                                <p className='chefName '>Sarah Bergstrom</p>
                                                <p className='orderFrom'>Order From</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='orderstatus'>
                                            <p className='Items'>4 Items</p>
                                            <p className='timeOrder_'>Order placed on 12:24 pm</p>
                                            <div className='userorderprice'>
                                                <p className='orderPrice '>£22.00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className='ordermain'>
                                <div className='orderprocess'>
                                    <p className='fooodquantity_'>#12548</p>
                                    <p className='chatTime_'>Delivered</p>
                                </div>
                                <div className='orderchefinfo'>
                                    <div className='col-lg-6'>
                                        <div className='flexBox'>
                                            <img src={Images.OrderChef} alt='chefimg' className='img-fluid' />
                                            <div className='orderchefname'>
                                                <p className='chefName '>Sarah Bergstrom</p>
                                                <p className='orderFrom'>Order From</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='orderstatus'>
                                            <p className='Items'>4 Items</p>
                                            <p className='timeOrder_'>Order placed on 12:24 pm</p>
                                            <div className='userorderprice'>
                                                <p className='orderPrice '>£22.00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className='ordermain'>
                                <div className='orderprocess'>
                                    <p className='fooodquantity_'>#12548</p>
                                    <p className='chatTime_'>Delivered</p>
                                </div>
                                <div className='orderchefinfo'>
                                    <div className='col-lg-6'>
                                        <div className='flexBox'>
                                            <img src={Images.OrderChef} alt='chefimg' className='img-fluid' />
                                            <div className='orderchefname'>
                                                <p className='chefName '>Sarah Bergstrom</p>
                                                <p className='orderFrom'>Order From</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='orderstatus'>
                                            <p className='Items'>4 Items</p>
                                            <p className='timeOrder_'>Order placed on 12:24 pm</p>
                                            <div className='userorderprice'>
                                                <p className='orderPrice '>£22.00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className='ordermain'>
                                <div className='orderprocess'>
                                    <p className='fooodquantity_'>#12548</p>
                                    <p className='chatTime_'>Delivered</p>
                                </div>
                                <div className='orderchefinfo'>
                                    <div className='col-lg-6'>
                                        <div className='flexBox'>
                                            <img src={Images.OrderChef} alt='chefimg' className='img-fluid' />
                                            <div className='orderchefname'>
                                                <p className='chefName '>Sarah Bergstrom</p>
                                                <p className='orderFrom'>Order From</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='orderstatus'>
                                            <p className='Items'>4 Items</p>
                                            <p className='timeOrder_'>Order placed on 12:24 pm</p>
                                            <div className='userorderprice'>
                                                <p className='orderPrice '>£22.00</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                className={modalDetail.flag === "orderdetail" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "orderdetail" ? "userorderdetail" :  ""}
                child={
                    modalDetail.flag === "orderdetail" ? (
                        <UserOrderDetail
                            close={() => handleOnCloseModal()}
                        />
                    ) :
                        ""
                }
                header=

                { modalDetail.flag === "orderdetail" ?
                        <>
                            <div className='Common_header'>
                                <div className='headerProfile'>
                                    <p className='headerTxt_'>Order #12548</p>
                                    <p className='ordersubheader'>In-Progress</p>
                                </div>
                            </div>
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

export default UserOrderHome