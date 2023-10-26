import React from "react";
import * as Images from "../../../../utilities/images";

const OrderDetails = () => {
  return (
    <>
      <div className="mainchef_">
        <div className="orderDeatils">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <div className="orderIdDetail">
                  <p className="orderId_">Order #12548</p>
                  <p className="recentOrder">Recent Order</p>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="chefJohn">
                  <div className="chatWithChef">
                    <div className="chefjohnDetail">
                      <img
                        src={Images.homeProfile}
                        alt="logo"
                        className="chefJohnImg"
                      />
                      <div className="chefinfo">
                        <h2 className="johnExplorer">John Smith</h2>
                        <div className="johnChatTime">
                          <div className="chefInfo">
                            <img
                              src={Images.chefCalender}
                              alt="logo"
                              className="chefInfo_"
                            />
                          </div>
                          <div className="johnchatdetail">
                            <p className="chatDates">Order From</p>
                          </div>
                        </div>
                        <p className="itemsQuantity">2 Items</p>
                        <p className="ordertimeaddress">
                          Order placed on 12:24 pm
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="chefChat">
                    <div className="chatwithjohn">
                      <div className="chatImg">
                        <i class="fas fa-comment-dots chatImage"></i>
                      </div>
                      <div className="chatText">
                        <p className="chat">chat</p>
                      </div>
                    </div>
                    <div className="deliveryAddress">
                      <p className="deliveryinfo">Delivery Address</p>
                      <p className="orderAddress">
                        46 Abingdon Road, Brandeston, United <br /> Kingdom IP13
                        4PB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <h3 className="orderId_">Ordered Items</h3>
              </div>
            </div>
            <div className="Container-fluid">
              <div className="row align-items-center">
                <div className="col-lg-10">
                  <div className="orderedFoodItems">
                    <div className="foodCategory flexBox m-0">
                      <img
                        src={Images.foodItems}
                        alt="logo"
                        className="foodItemImg"
                      />
                      <div className="categoryinfo">
                        <h4 className="foodcategory_ m-0">Food Category</h4>
                        <h5 className="innerfood m-0">Chicken Salad</h5>
                        <p className="innePrice m-0">£22.00</p>
                      </div>
                    </div>
                    <div className="quantityDetail ">
                      {/* <p className='innePrice m-0'>£22.00</p> */}
                      <p className="fooodquantity_ m-0">2X</p>
                    </div>
                  </div>
                  <div className="orderedFoodItems">
                    <div className="foodCategory flexBox">
                      <img
                        src={Images.foodItems}
                        alt="logo"
                        className="foodItemImg"
                      />
                      <div className="categoryinfo">
                        <h4 className="foodcategory_ m-0">Food Category</h4>
                        <h5 className="innerfood m-0">Chicken Salad</h5>
                        <p className="innePrice m-0">£22.00</p>
                      </div>
                    </div>
                    <div className="quantityDetail ">
                      {/* <p className='innePrice m-0'>£22.00</p> */}
                      <p className="fooodquantity_ m-0">2X</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2">
                  <div className="paidAmmount">
                    <p className="totalPaid">Total paid</p>
                    <p className="foodBill"> £66.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
