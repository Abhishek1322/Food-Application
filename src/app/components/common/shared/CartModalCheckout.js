import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal'
import EditAddressModal from './EditAddressModal'

const CartModalCheckout = () => {
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
            <div className='cartcheckoutsection'>
                <div className='modalContent'>
                    <div className='modalDetail '>
                        <div className='usercartDetail'>
                            <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                            <div className='insideModal'>
                                <p className='foodtext'>Food Category</p>
                                <p className='foodItem'>Chicken Salad</p>
                                <p className='foodPrice'>£22.00</p>
                                <div className='quantity'>
                                    <div className='Quantiycheck'>
                                        <img src={Images.minusModal} className='calQuantity' alt='minusModal' />
                                    </div>
                                    <span className='number' >01</span>
                                    <div className='Quantiycheck'>
                                        <img src={Images.plusModal} className='calQuantity' alt='minusModal' />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='modalDelete_'>
                            <img src={Images.cartDelete} className='cartDelete_' alt='cartcancel' />
                        </div>

                    </div>
                    <div className='modalDetail '>
                        <div className='usercartDetail'>
                            <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                            <div className='insideModal'>
                                <p className='foodtext'>Food Category</p>
                                <p className='foodItem'>Chicken Salad</p>
                                <p className='foodPrice'>£22.00</p>
                                <div className='quantity'>
                                    <div className='Quantiycheck'>
                                        <img src={Images.minusModal} className='calQuantity' alt='minusModal' />
                                    </div>
                                    <span className='number' >01</span>
                                    <div className='Quantiycheck'>
                                        <img src={Images.plusModal} className='calQuantity' alt='minusModal' />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='modalDelete_'>
                            <img src={Images.cartDelete} className='cartDelete_' alt='cartcancel' />
                        </div>
                    </div>
                    <div className='checkoutdelivery'>
                        <div className='checkoutaddress'>
                            <p className='venuInfo'>Delivery Address</p>
                        </div>
                        <div className='checkoutnewaddress'>
                            <p className='headerinnertxt m-0'>+ Add New Address</p>
                        </div>
                    </div>

                    <div className='checkouthomeoffice mt-3'>
                        <div className='checkouthome'>
                            <div className='homedropdown mt-2'>
                                <p className='notificationText'>Home</p>
                                <div class="dropdown dropend">
                                    <i class="fas fa-ellipsis-v dropdownicon dropdown-toggle" data-bs-toggle="dropdown">
                                    </i>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#"><img src={Images.EditImg} alt='editimage' className='img-fluid' /> <span className='editdrop'>Edit </span></a></li>
                                        <li><a class="dropdown-item " href="#"><img src={Images.cartDelete} alt='editimage' className='img-fluid' /> <span className='editdrop'>Delete</span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <p className='cheftext mt-2'>New York, 10003, 2nd Street dorm</p>
                            <div class="round">
                                <input id="" name="" type="checkbox" value="" class="checkbx"/>
                            </div>
                        </div>
                        <div className='checkouthome'>
                            <div className='homedropdown mt-2'>
                                <p className='notificationText'>Office</p>
                                <div class="dropdown dropend">
                                    <i class="fas fa-ellipsis-v dropdownicon dropdown-toggle" data-bs-toggle="dropdown">
                                    </i>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#"><img src={Images.EditImg} alt='editimage' className='img-fluid' /> <span className='editdrop'>Edit </span></a></li>
                                        <li><a class="dropdown-item " href="#"><img src={Images.cartDelete} alt='editimage' className='img-fluid' /> <span className='editdrop'>Delete</span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <p className='cheftext mt-2'>New York, 10003, 2nd Street dorm</p>
                            <div class="round">
                                <input id="" name="" type="checkbox" value="" class="checkbx" />
                            </div>
                        </div>
                    </div>
                    <div className='modalfooterbtn'>
                    <div className='outeraddItem'>
                        <button className='addItems'>+ Add More Items</button>
                    </div>
                    <div className='orderNow'>
                        <div className='totalPrice'>
                            <p className='totaltxt'>Total</p>
                            <p className='price'>£44.00</p>
                        </div>
                        <button className='orderbutton' onClick={() => {
                            handleUserProfile("editmodal")
                        }}>Pay Now</button>

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
                className={modalDetail.flag === "editmodal" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "editmodal" ? "editaddress" : ""}
                child={
                    modalDetail.flag === "editmodal" ? (
                        <EditAddressModal
                            close={() => handleOnCloseModal()}
                        />
                    ) :
                        ""
                }
                header=

                {modalDetail.flag === "editmodal" ?
                    <>
                        <div className='editadressheading'>
                            <img src={Images.backArrowpassword} alt='backarrowimage' className='img-fluid' />
                            <div className='edithead'>
                                <h2 className="modal_Heading">
                                Edit Address
                                </h2>
                                <p className='chatUser'>Edit Address below</p>
                            </div>
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

export default CartModalCheckout
