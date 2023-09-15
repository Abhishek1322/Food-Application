import React from 'react';
import * as Images from "../../../../utilities/images";

const AnotherOrderdetail = () => {
    return (
        <>

            <div className='mainchef_'>
                <div className='orderDeatils'>
                    <div className='container-fluid'>
                        <div className='row align-items-center'>
                            <div className='col-lg-12'>
                                <div className='orderIdDetail'>
                                    <p className='orderId_'>Order #12548</p>
                                    <p className='recentOrder deliver'>Delivered</p>
                                </div>
                                <div className='chefJohn'>
                                    <div className='chatWithChef'>
                                        <div className='chefjohnDetail'>
                                            <img src={Images.homeProfile} alt="logo" className="chefJohnImg" />
                                            <div className='chefinfo'>
                                                <p className='johnExplorer'>John Smith</p>
                                                <div className='johnChatTime'>
                                                    <img src={Images.homeProfile} alt="logo" className="homeprofile" />
                                                    <div className='johnchatdetail'>
                                                        <p className='chatDates'>Jul 20, 2023</p>
                                                    </div>
                                                </div>
                                                <p className='itemsQuantity'>2 Items</p>
                                                <p className='ordertimeaddress'>Order placed on 12:24 pm</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='chefChat'>
                                        <div className='chatwithjohn johnchat'>
                                            <div className='chatImg chaticon'>
                                                <i class="fas fa-comment-dots chatImage chatbg"></i>
                                            </div>
                                            <div className='chatText'>
                                                <p className='chat'>chat</p>
                                            </div>
                                        </div>
                                        <div className='deliveryAddress'>
                                            <p className='deliveryinfo'>Delivery Address</p>
                                            <p className='orderAddress'>46 Abingdon Road, Brandeston, United <br /> Kingdom
                                                IP13 4PB</p>
                                        </div>
                                    </div>
                                </div>
                                <p className='orderId_'>Ordered Items</p>
                                <div className='row align-items-center'>
                                    <div className='col-lg-9'>
                                        <div className='orderedFoodItems'>
                                            <div className='foodCategory'>
                                                <img src={Images.foodItems} alt="logo" className="foodItemImg" />
                                                <div className='categoryinfo'>
                                                    <p className='foodcategory_'>Food Category</p>
                                                    <p className='innerfood'>Chicken Salad</p>
                                                    <p className='innePrice'>£22.00</p>
                                                </div>
                                            </div>
                                            <p className='fooodquantity_'>2X</p>
                                        </div>
                                        <div className='orderedFoodItems'>
                                            <div className='foodCategory'>
                                                <img src={Images.foodItems} alt="logo" className="foodItemImg" />
                                                <div className='categoryinfo'>
                                                    <p className='foodcategory_'>Food Category</p>
                                                    <p className='innerfood'>Chicken Salad</p>
                                                    <p className='innePrice'>£22.00</p>
                                                </div>
                                            </div>
                                            <p className='fooodquantity_'>2X</p>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className='paidAmmount totalAmmount'>
                                            <p className='totalPaid'>Total paid</p>
                                            <p className='foodBill'> £66.00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnotherOrderdetail