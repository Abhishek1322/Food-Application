import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal'
import MyRecentOrderModal from './myRecentOrderModal';

const Myorder = () => {

    const slides = Array(12).join().split(',').map(function (a) { return this.i++ }, { i: 1 });

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
            <div className='modalContent'>
                <div className='modalscroll'>
                    <div className='searchbar '>
                        <input type='search' placeholder='Search Chef near you...' className='searchtext' />
                        <img src={Images.searchbar} className='searchbarImg' alt='searchbar' />
                        <section className="content-header">
                            <div className="row">
                                <div className="Maincontentbox">
                                    <div className="infopages">
                                        <ul className="nav nav-pills mb-3 insidetabs_" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link innertext_ active" id="terms" data-id="1" data-bs-toggle="pill" data-bs-target="#pills-home">Recent Orders</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link innertext_" id="privacy" data-id="2" data-bs-toggle="pill" data-bs-target="#pills-profile">In-Progress</button>
                                            </li>
                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link innertext_" id="privacy" data-id="2" data-bs-toggle="pill" data-bs-target="#pills-delivered">Delivered</button>
                                            </li>
                                        </ul>

                                        <div class="tab-content" id="pills-tabContent">
                                            <div class="tab-pane fade active show" id="pills-home">
                                                <div className='Myorders_ '>
                                                    <div className='ordermodalBox'>
                                                        <div className='myorders_'>
                                                            <p className='orderId'>#12548</p>
                                                        </div>
                                                        <div className='userOrderInfo'>
                                                            <div className='orderRequest'>
                                                                <div className='profileInfo'>
                                                                    <img src={Images.homeProfile} alt="profile" className="homeprofile" />
                                                                    <div className='detailInfo'>
                                                                        <p className='userProfile'>Agatha Christie</p>
                                                                        <p className='orderFrom'>Order From</p>
                                                                    </div>
                                                                </div>
                                                                <div className='orderItems'>
                                                                    <div className='orderiem_'>
                                                                        <p className='Items'>4 Items</p>
                                                                        <p className='timeOrder_'>Order placed on 12:24 pm</p>
                                                                    </div>
                                                                    <div className='showOrder'>
                                                                        <p className='orderPrice'>£22.00</p>
                                                                    </div>
                                                                </div>
                                                                <div className='orderItems'>
                                                                    <button className='cancelOrder'>CANCEL</button>
                                                                    <button className='acceptOrder' onClick={() => {
                                                                        handleUserProfile("myRecentOrder")
                                                                    }}>ACCEPT</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='ordermodalBox'>
                                                        <div className='myorders_'>
                                                            <p className='orderId'>#12548</p>
                                                        </div>
                                                        <div className='userOrderInfo'>
                                                            <div className='orderRequest'>
                                                                <div className='profileInfo'>
                                                                    <img src={Images.homeProfile} alt="profile" className="homeprofile" />
                                                                    <div className='detailInfo'>
                                                                        <p className='userProfile'>Agatha Christie</p>
                                                                        <p className='orderFrom'>Order From</p>
                                                                    </div>
                                                                </div>
                                                                <div className='orderItems'>
                                                                    <div className='orderiem_'>
                                                                        <p className='Items'>4 Items</p>
                                                                        <p className='timeOrder_'>Order placed on 12:24 pm</p>
                                                                    </div>
                                                                    <div className='showOrder'>
                                                                        <p className='orderPrice'>£22.00</p>
                                                                    </div>
                                                                </div>
                                                                <div className='orderItems'>
                                                                    <button className='cancelOrder'>CANCEL</button>
                                                                    <button className='acceptOrder'>ACCEPT</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="tab-pane fade" id="pills-profile">
                                                <div class="tabinnercontent">
                                                    <form method="POST" action="https://soulmate.itechnolabs.tech/page" autocomplete="off">
                                                        <div className='Myorders_'>
                                                            <div className='ordermodalBox'>
                                                                <div className='myorders_'>
                                                                    <p className='orderId'>#12548</p>
                                                                </div>
                                                                <div className='userOrderInfo'>
                                                                    <div className='orderRequest'>
                                                                        <div className='profileInfo'>
                                                                            <img src={Images.homeProfile} alt="profile" className="homeprofile" />
                                                                            <div className='detailInfo'>
                                                                                <p className='userProfile'>Agatha Christie</p>
                                                                                <p className='orderFrom'>Order From</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='orderItems'>
                                                                            <div className='orderiem_'>
                                                                                <p className='Items'>4 Items</p>
                                                                                <p className='timeOrder_'>Order placed on 12:24 pm</p>
                                                                            </div>
                                                                            <div className='showOrder'>
                                                                                <p className='orderPrice'>£22.00</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='orderItems'>
                                                                            <button className='cancelOrder'>CANCEL</button>
                                                                            <button className='acceptOrder' onClick={() => {
                                                                                handleUserProfile("myRecentOrder")
                                                                            }}>ACCEPT</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='ordermodalBox'>
                                                                <div className='myorders_'>
                                                                    <p className='orderId'>#12548</p>
                                                                </div>
                                                                <div className='userOrderInfo'>
                                                                    <div className='orderRequest'>
                                                                        <div className='profileInfo'>
                                                                            <img src={Images.homeProfile} alt="profile" className="homeprofile" />
                                                                            <div className='detailInfo'>
                                                                                <p className='userProfile'>Agatha Christie</p>
                                                                                <p className='orderFrom'>Order From</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='orderItems'>
                                                                            <div className='orderiem_'>
                                                                                <p className='Items'>4 Items</p>
                                                                                <p className='timeOrder_'>Order placed on 12:24 pm</p>
                                                                            </div>
                                                                            <div className='showOrder'>
                                                                                <p className='orderPrice'>£22.00</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='orderItems'>
                                                                            <button className='cancelOrder'>CANCEL</button>
                                                                            <button className='acceptOrder'>ACCEPT</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="pills-delivered">
                                                <div class="tabinnercontent">
                                                    <form method="POST" action="https://soulmate.itechnolabs.tech/page" autocomplete="off">
                                                        <div className='Myorders_'>
                                                            <div className='ordermodalBox'>
                                                                <div className='myorders_'>
                                                                    <p className='orderId'>#12548</p>
                                                                </div>
                                                                <div className='userOrderInfo'>
                                                                    <div className='orderRequest'>
                                                                        <div className='profileInfo'>
                                                                            <img src={Images.homeProfile} alt="profile" className="homeprofile" />
                                                                            <div className='detailInfo'>
                                                                                <p className='userProfile'>Agatha Christie</p>
                                                                                <p className='orderFrom'>Order From</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='orderItems'>
                                                                            <div className='orderiem_'>
                                                                                <p className='Items'>4 Items</p>
                                                                                <p className='timeOrder_'>Order placed on 12:24 pm</p>
                                                                            </div>
                                                                            <div className='showOrder'>
                                                                                <p className='orderPrice'>£22.00</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='orderItems'>
                                                                            <button className='cancelOrder'>CANCEL</button>
                                                                            <button className='acceptOrder' onClick={() => {
                                                                                handleUserProfile("myRecentOrder")
                                                                            }}>ACCEPT</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='ordermodalBox'>
                                                                <div className='myorders_'>
                                                                    <p className='orderId'>#12548</p>
                                                                </div>
                                                                <div className='userOrderInfo'>
                                                                    <div className='orderRequest'>
                                                                        <div className='profileInfo'>
                                                                            <img src={Images.homeProfile} alt="profile" className="homeprofile" />
                                                                            <div className='detailInfo'>
                                                                                <p className='userProfile'>Agatha Christie</p>
                                                                                <p className='orderFrom'>Order From</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='orderItems'>
                                                                            <div className='orderiem_'>
                                                                                <p className='Items'>4 Items</p>
                                                                                <p className='timeOrder_'>Order placed on 12:24 pm</p>
                                                                            </div>
                                                                            <div className='showOrder'>
                                                                                <p className='orderPrice'>£22.00</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className='orderItems'>
                                                                            <button className='cancelOrder'>CANCEL</button>
                                                                            <button className='acceptOrder'>ACCEPT</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </form>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="faq">
                                                <div class="tabinnercontent">
                                                    <div class="d-flex justify-content-between">
                                                        <h3>FAQ</h3>
                                                        <button type="button" class="dt-button create-new btn btn-primary add_question waves-effect waves-float waves-light" data-bs-toggle="modal" data-bs-target="#addFaqModal" data-backdrop="static" data-keyboard="false"><i class="fas fa-plus"></i>&nbsp;&nbsp;Add Faq</button>
                                                    </div>
                                                    <div class="col-md-12 col-12">
                                                        helllo
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
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
                className={modalDetail.flag === "myRecentOrder" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "myRecentOrder" ? "recentOrder" : ""}
                child={
                    modalDetail.flag === "myRecentOrder" ? (
                        <MyRecentOrderModal
                            close={() => handleOnCloseModal()}

                        />
                    ) :
                        ""
                }
                header=

                {modalDetail.flag === "myRecentOrder" ?
                    <>
                        <div className='Common_header'>
                            <img
                                src={Images.backArrowpassword}
                                alt="logo"
                                className="img-fluid  arrowCommon_"
                            />
                            <div className='headerProfile ps-2'>
                                <p className='modal_Heading'>Order #12548</p>
                                <p className='innerhead_ ps-3'>Recent Order</p>
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
                                <img src={Images.modalCancel} className='ModalCancel' alt='modalCancel' />
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

export default Myorder