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
                    <img src={Images.SaladImg} alt='saladimage' className='img-fluid' />
                    <p className='foodmodalheading'>Chicken Salad</p>
                    <div className='restroinfo'>
                        <Link to="#"><img src={Images.sarahcap} alt='sarahcapimage' className='img-fluid' /></Link>
                        <div className='johnchatdetail'>
                            <Link to="#"><p className='chatDates'>Category</p></Link>
                        </div>
                    </div>
                </div>
                <div className='deliverytimesheet'>
                    <div className='modalfooddelivery'>
                        <div className='foodeliverytime'>
                            <p className='chefName'>Delivery Time</p>
                            <p className='chatSearchere_  mt-1'>45 mins</p>
                        </div>
                        <div className='foodrating'>
                            <p className='chefName'>Rating</p>
                            <div className='chefrating mt-1'>
                                <i class="las la-star startIcon"></i>
                                <p className='ratingheading'>4.5 (845 Reviews)</p>
                            </div>
                        </div>
                    </div>
                    <div className='deliverfrom mt-2'>
                        <p className='chefName'>Deliver From</p>
                        <p className='chatSearchere_  mt-1'>46 Abingdon Road, Brandeston, United Kingdom
                            IP13 4PB</p>
                    </div>
                    <div className='deliverfrom mt-2'>
                        <p className='chefName'>Description</p>
                        <p className='chatSearchere_  mt-1 '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content.</p>
                    </div>
                </div>
                <p className='foodamountmodal'>
                    £22.00
                </p>
                <div className='addfoodbtn'>
                    <button className='foodmodalbtn' onClick={() => {
                        handleUserProfile("CartFoodOrder")
                    }}>
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Start Order now
            <div className='cartfoodsectionorder'>
                <div className='foodmodal'>
                    <img src={Images.SaladImg} alt='saladimage' className='img-fluid' />
                    <p className='foodmodalheading'>Chicken Salad</p>
                    <div className='restroinfo'>
                        <Link to="#"><img src={Images.sarahcap} alt='sarahcapimage' className='img-fluid' /></Link>
                        <div className='johnchatdetail'>
                            <Link to="#"><p className='chatDates'>Category</p></Link>
                        </div>
                    </div>
                </div>
                <div className='deliverytimesheet'>
                    <div className='modalfooddelivery'>
                        <div className='foodeliverytime'>
                            <p className='chefName'>Delivery Time</p>
                            <p className='chatSearchere_  mt-1'>45 mins</p>
                        </div>
                        <div className='foodrating'>
                            <p className='chefName'>Rating</p>
                            <div className='chefrating mt-1'>
                                <i class="las la-star startIcon"></i>
                                <p className='ratingheading'>4.5 (845 Reviews)</p>
                            </div>
                        </div>
                    </div>
                    <div className='deliverfrom mt-2'>
                        <p className='chefName'>Deliver From</p>
                        <p className='chatSearchere_  mt-1'>46 Abingdon Road, Brandeston, United Kingdom
                            IP13 4PB</p>
                    </div>
                    <div className='deliverfrom mt-2'>
                        <p className='chefName'>Description</p>
                        <p className='chatSearchere_  mt-1 '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content.</p>
                    </div>
                </div>
                <div className='orderamount'>
                    <p className='foodamountmodal'>
                        £22.00
                    </p>
                    <div className='quantitymodal'>
                    <p className='notificationText '>Quantity:</p>
                    <div className='quantity'>
                        <div className='Quantiycheck'>
                            <img src={Images.minusModal} className='calQuantity' alt='minusModal' />
                        </div>
                        <span className='number' >02</span>
                        <div className='Quantiycheck'>
                            <img src={Images.plusModal} className='calQuantity' alt='minusModal' />
                        </div>
                    </div>
                    </div>
                    </div>
                    <div className='orderNow'>
                        <div className='totalPrice'>
                            <p className='price'>£44.00</p>
                        </div>
                        <button className='orderbutton'>Order Now</button>

                    </div>
                </div> */}
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

export default CartFoodModal
