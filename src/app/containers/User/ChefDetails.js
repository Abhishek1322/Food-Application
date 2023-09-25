import React from 'react'
import * as Images from "../../../utilities/images";


const ChefDetails = () => {
    return (
        <>
            <div className='chefdetailsection'>
                <div className='sarahchef'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-lg-5 col-md-12'>
                                <div className='sarahinfo'>
                                    <div className='sarahimg'>
                                        <img src={Images.UserICon} alt='sarahimage' className='img-fluid' />
                                    </div>
                                    <div className='saraheading'>
                                        <p className='johnExplorer'>Sarah Bergstrom</p>
                                        <div className='sarahrestro'>
                                            <div className='restroinfo'>
                                                <img src={Images.sarahcap} alt='sarahcapimage' className='img-fluid' />
                                                <div className='johnchatdetail'>
                                                    <p className='chatDates'>Restaurant</p>
                                                </div>
                                            </div>
                                            <img src={Images.chefType} alt='cheftypeimage' className='infoimg' />
                                            <div className='sarahinformation'>
                                                <p className='chatSearchere_ '>The chef will prepare exquisite dishes at
                                                    the restaurant and deliver them to the
                                                    customer's location.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-7 col-md-12 d-flex justify-content-end'>

                                <button className='sarahavailablebtn'>
                                    <div className='availableimg'>  <img src={Images.TimeSquare} alt='timesquareimage' className='img-fluid' />
                                    </div>
                                    <p className='availableheading'>Availability</p>
                                </button>
                                <button className='sarahcallbtn'>
                                    <div className='availableimg'>  <img src={Images.CallImg} alt='timesquareimage' className='img-fluid' />
                                    </div>
                                    <p className='availableheading'>Call</p>
                                </button>
                                <button className='sarahmessagebtn'>
                                    <div className='availableimg'>  <img src={Images.ChefChat} alt='timesquareimage' className='img-fluid' />
                                    </div>
                                    <p className='availableheading'>Chat</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sarahdata'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-lg-3 col-md-6 col-sm-12 d-flex justify-content-start'>
                                <p className='chatSearchere_'> <span className='sarahtime'>£45</span>/hour</p>
                            </div>
                            <div className='col-lg-3 col-md-6 col-sm-12'>
                                <p className='.chefName'>Experience</p>
                                <p className='chatSearchere_ mt-2'>15 + Years Exp.</p>
                            </div>
                            <div className='col-lg-3 col-md-6 col-sm-12'>
                                <p className='.chefName'>Rating</p>
                                <div className='chefrating mt-2'>
                                    <i class="las la-star startIcon"></i>
                                    <p className='ratingheading'>4.5 (845 Reviews)</p>
                                </div>

                            </div>
                            <div className='col-lg-3 col-md-6 col-sm-12'>
                                <p className='.chefName'>Address</p>
                                <p className='chatSearchere_ mt-2'>46 Abingdon Road, Brandeston, United Kingdom
                                    IP13 4PB</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sarahbioexpert'>

                    <div className='sarahbio'>
                        <p className='innerDummyHeading '>Bio</p>
                        <p className='dummyText'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using to using 'Content here, content here', making it look like English.</p>
                    </div>
                    <div className='sarahexpert'>
                    <p className='innerDummyHeading '>Expertise</p>
                        </div>
                </div>
            </div>
        </>
    )
}

export default ChefDetails