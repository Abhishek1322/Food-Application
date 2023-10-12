import React, { useState } from 'react'
import * as Images from "../../../../utilities/images";
import { Link } from 'react-router-dom';
import CustomModal from './CustomModal';
import CartFoodModalOrder from './CartFoodModalOrder';

const CartFoodModal = () => {
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
            <div className='cartfoodsection'>
                <div className='foodmodal'>
                    <img src={Images.CartFood} alt='saladimage' className='img-fluid' />
                    <h2 className='foodmodalheading mt-2'>Chicken Salad</h2>
                    <div className='restroinfo'>
                        <Link to="#"><img src={Images.sarahcap} alt='sarahcapimage' className='img-fluid' /></Link>
                        <div className='johnchatdetail'>
                            <Link to="#"><h6 className='chatDates'>Category</h6></Link>
                        </div>
                    </div>
                </div>
                <div className='deliverytimesheet'>
                    <div className='modalfooddelivery'>
                        <div className='foodeliverytime'>
                            <h6 className='chefName'>Delivery Time</h6>
                            <h6 className='chatSearchere_  mt-1'>45 mins</h6>
                        </div>
                        <div className='foodrating'>
                            <h6 className='chefName'>Rating</h6>
                            <div className='chefrating mt-1'>
                                <i class="las la-star startIcon"></i>
                                <p className='ratingheading'>4.5 (845 Reviews)</p>
                            </div>
                        </div>
                    </div>
                    <div className='deliverfrom mt-2'>
                        <h6 className='chefName'>Deliver From</h6>
                        <p className='chatSearchere_  mt-1'>46 Abingdon Road, Brandeston, United Kingdom
                            IP13 4PB</p>
                    </div>
                    <div className='deliverfrom mt-2'>
                        <h6 className='chefName'>Description</h6>
                        <p className='chatSearchere_  mt-1 '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content.</p>
                    </div>
                </div>
                <h4 className='foodamountmodal'>
                    £22.00
                </h4>
                <div className='modalfooterbtn'>
                <div className='addfoodbtn'>
                    <button className='foodmodalbtn' onClick={() => {
                        handleUserProfile("CartFoodOrder")
                    }}>
                        Add to Cart
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
                className={modalDetail.flag === "CartFoodOrder" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "CartFoodOrder" ? "CartFoodOrderModal" :  ""}
                child={
                    modalDetail.flag === "CartFoodOrder" ? (
                        <CartFoodModalOrder
                            close={() => handleOnCloseModal()}
                        />
                    ) :
                        ""
                }
                header=

                { modalDetail.flag === "CartFoodOrder" ?
                        <>
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

export default CartFoodModal
