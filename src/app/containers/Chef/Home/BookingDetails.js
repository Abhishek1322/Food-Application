import React from 'react'
import * as Images from "../../../../utilities/images";

const BookingDetails = () => {
    return (
        <>
            <div className='mainchef_'>
                <div className='BookingDetails'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='chefJohn'>
                                    <div className='chatWithChef'>
                                        <div className='chefjohnDetail'>
                                            <img src={Images.homeProfile} alt="logo" className="chefJohnImg" />
                                            <div className='chefinfo'>
                                                <p className='johnExplorer'>John Smith Explorer</p>
                                                <div className='johnChatTime'>
                                                    <img src={Images.homeProfile} alt="logo" className="homeprofile" />
                                                    <div className='johnchatdetail'>
                                                        <p className='chatDates'>Jul 20, 2023</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='chefChat'>
                                        <div className='chatwithjohn'>
                                            <div className='chatImg'>
                                                <i class="fas fa-comment-dots chatImage"></i>
                                            </div>
                                            <div className='chatText'>
                                                <p className='chat'>chat</p>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className='venuDetail'>
                                    <div className='venuHere'>
                                        <p className='venuInfo'>Venue Date</p>
                                        <p className='venushedule'>Aug 12, 2023</p>

                                    </div>
                                    <div className='venuHere venuThere'>
                                        <p className='venuInfo'>Venue Time</p>
                                        <p className='venushedule'>12:00 am to 06:30 pm</p>

                                    </div>
                                    <div className='venuHere'>
                                        <p className='venuInfo'>Venue Address</p>
                                        <p className='venushedule'>46 Abingdon Road, Brandeston, United KingdomIP13 4PB</p>

                                    </div>
                                </div>
                           <div className='descriptionInfo'>
                            <p className='descriptionheading'>Description</p>
                            <p className='descriptiontxt'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <p className='descriptiontxt'>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum lorem Ipsum passages, and more recently with.</p>
                           </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default BookingDetails