import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal';
import CartModalCheckout from './CartModalCheckout';



const CartModal = () => {
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
        {/* <div className='orderDelivery_'>
            <img src={Images.orderDelivery} className='orderDeliveryimg_' alt='modalImg_'/>
            <p className='Headingsmall m-0'>Verify Order Delivery</p>
            <p className='subtext_ m-0'>Enter the OTP that we sent on  customer’s email.</p>
            <p className='resendText_ m-0'> Customer not received the OTP? 
            <span className='innersendtxt_'> Resend</span></p>
            <div className='orderItems_'>
              <button className='cancelOrder_'>Cancel</button>
              <button className='submitOrder_'>Submit</button>
            </div>
       </div> */}
        <div className='modalscroll'>
          <div className='searchbar '>
            <input type='text' placeholder='Search Chef near you...' className='searchtext' />
            <img src={Images.searchbar} className='searchbarImg' alt='searchbar' />
            <section class="content-header">
              <div class="row">
                <div class="Maincontentbox">
                  <div class="infopages">
                    <ul class="nav nav-pills mb-3 insidetabs_" id="pills-tab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <button class="nav-link innertext_ active" id="terms" data-id="1" data-bs-toggle="pill" data-bs-target="#pills-home">Recent Orders</button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button class="nav-link innertext_" id="privacy" data-id="2" data-bs-toggle="pill" data-bs-target="#pills-profile">In-Progress</button>
                      </li>
                      <li class="nav-item" role="presentation">
                        <button class="nav-link innertext_" id="privacy" data-id="2" data-bs-toggle="pill" data-bs-target="#pills-profile">Delivered</button>
                      </li>
                    </ul>

                    <div class="tab-content" id="pills-tabContent">
                      <div class="tab-pane fade active show" id="pills-home">
                        <div className='ordermodalBox'>
                          <div className='myorders_'>
                            <p className='orderId'>#12548</p>
                          </div>
                          <div className='userOrderInfo'>
                            <div className='orderRequest'>
                              <div className='profileInfo'>
                                <img src={Images.homeProfile} alt="logo" className="homeprofile" />
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
                        <div className='ordermodalBox'>
                          <div className='myorders_'>
                            <p className='orderId'>#12548</p>
                          </div>
                          <div className='userOrderInfo'>
                            <div className='orderRequest'>
                              <div className='profileInfo'>
                                <img src={Images.homeProfile} alt="logo" className="homeprofile" />
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

                      <div class="tab-pane fade" id="pills-profile">
                        <div class="tabinnercontent">
                          <form method="POST" action="https://soulmate.itechnolabs.tech/page" autocomplete="off">
                            <h1>Hii</h1>
                          </form>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="pills-contact">
                        <div class="tabinnercontent">
                          <form method="POST" action="https://soulmate.itechnolabs.tech/page" autocomplete="off">

                            <p class="phead">Text Here</p>
                            <div class="col-md-12 col-12">
                              <div class="mb-1">
                                <label class="form-label" for="description">description </label>


                              </div>
                            </div>
                            <div class="col-12">
                              <button type="Submit" class="btn btn-primary me-1 waves-effect waves-float waves-light">Submit</button>
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



        {/* <div className='modalDetail '>
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
        <div className='outeraddItem'>
          <button className='addItems'>+ Add More Items</button>
        </div>
        <div className='orderNow'>
          <div className='totalPrice'>
            <p className='totaltxt'>Total</p>
            <p className='price'>£44.00</p>
          </div>
          <button className='orderbutton' onClick={() => {
            handleUserProfile("cartcheckout")
          }}>CheckOut</button>

        </div> */}
        {/* </div> */}
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={modalDetail.flag === "cartcheckout" ? "commonWidth customContent" : ""}
        ids={modalDetail.flag === "cartcheckout" ? "cartcheckoutModal" : ""}
        child={
          modalDetail.flag === "cartcheckout" ? (
            <CartModalCheckout
              close={() => handleOnCloseModal()}
            />
          ) :
            ""
        }
        header=

        {modalDetail.flag === "cartcheckout" ?
          <>
            {<h2 className="modal_Heading">
              Cart
            </h2>}
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

export default CartModal