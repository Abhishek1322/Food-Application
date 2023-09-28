import React from 'react'
import * as Images from "../../../../utilities/images";


const NewBooking = () => {
  return (
    <>
      <div className='mainchef_'>
        <div className='Newbooking_'>
          <section class="content-header">
            <div class="row">
              <div class="Maincontentbox">
                <div class="infopages">
                  <ul class="nav nav-pills mb-2" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button class="nav-link innertext_ active" id="terms" data-id="1" data-bs-toggle="pill" data-bs-target="#pills-home">New Bookings </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button class="nav-link innertext_" id="privacy" data-id="2" data-bs-toggle="pill" data-bs-target="#pills-profile">Accepted</button>
                    </li>
                  </ul>

                  <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade active show" id="pills-home">
                      <div className='container-fluid'>
                        <div className='row'>
                          <div className='col-lg-12'>
                            <div className='profileDetail'>
                              <div className='homeProfileBox'>
                                <div className='profileInfo'>
                                  <img src={Images.homeProfile} alt="logo" className="homeprofile" />
                                  <div className='detailInfo'>
                                    <p className='userProfile'>John Smith</p>
                                    <p className='userInfo'>Jul 20, 2023</p>
                                  </div>
                                </div>
                                <p className='userInfoTxt'>It is a long established fact that a reader will be distracted by the readable content of a page whenlooking at its layout. distracted by the readable content of a page when looking at its layout. Thepoint of using
                                  <span className='more'> more...</span>
                                </p>

                              </div>
                              <div className='homeProfileBox'>
                                <div className='profileInfo'>
                                  <img src={Images.homeProfile} alt="logo" className="homeprofile" />
                                  <div className='detailInfo'>
                                    <p className='userProfile'>John Smith</p>
                                    <p className='userInfo'>Jul 20, 2023</p>
                                  </div>
                                </div>
                                <p className='userInfoTxt'>It is a long established fact that a reader will be distracted by the readable content of a page whenlooking at its layout. distracted by the readable content of a page when looking at its layout. Thepoint of using
                                  <span className='more'> more...</span>
                                </p>

                              </div>
                              <div className='homeProfileBox'>
                                <div className='profileInfo'>
                                  <img src={Images.homeProfile} alt="logo" className="homeprofile" />
                                  <div className='detailInfo'>
                                    <p className='userProfile'>John Smith</p>
                                    <p className='userInfo'>Jul 20, 2023</p>
                                  </div>
                                </div>
                                <p className='userInfoTxt'>It is a long established fact that a reader will be distracted by the readable content of a page whenlooking at its layout. distracted by the readable content of a page when looking at its layout. Thepoint of using
                                  <span className='more'> more...</span>
                                </p>

                              </div>
                              <div className='homeProfileBox'>
                                <div className='profileInfo'>
                                  <img src={Images.homeProfile} alt="logo" className="homeprofile" />
                                  <div className='detailInfo'>
                                    <p className='userProfile'>John Smith</p>
                                    <p className='userInfo'>Jul 20, 2023</p>
                                  </div>
                                </div>
                                <p className='userInfoTxt'>It is a long established fact that a reader will be distracted by the readable content of a page whenlooking at its layout. distracted by the readable content of a page when looking at its layout. Thepoint of using
                                  <span className='more'> more...</span>
                                </p>

                              </div>
                              <div className='homeProfileBox'>
                                <div className='profileInfo'>
                                  <img src={Images.homeProfile} alt="logo" className="homeprofile" />
                                  <div className='detailInfo'>
                                    <p className='userProfile'>John Smith</p>
                                    <p className='userInfo'>Jul 20, 2023</p>
                                  </div>
                                </div>
                                <p className='userInfoTxt'>It is a long established fact that a reader will be distracted by the readable content of a page whenlooking at its layout. distracted by the readable content of a page when looking at its layout. Thepoint of using
                                  <span className='more'> more...</span>
                                </p>
                              </div>
                            </div>

                          </div>

                        </div>

                      </div>
                    </div>
                    <div class="tab-pane fade" id="pills-profile">
                      <div class="tabinnercontent">
                        <form method="POST" action="https://soulmate.itechnolabs.tech/page" autocomplete="off">


                          <h3>Privacy Policy</h3>
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


    </>
  )
}

export default NewBooking