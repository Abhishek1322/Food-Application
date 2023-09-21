import React from 'react'
import * as Images from "../../../../utilities/images";
import { Link } from 'react-router-dom';

const myprofile = () => {
    return (
        <>
            <section className='profilesection'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-5 col-md-12'>
                            {/* left section  */}
                            <div className='profileleft'>
                                <img src={Images.chefProfile} alt='chefProfileimg' className='chefprofileimg' />
                            </div>
                        </div>
                        <div className='col-lg-7 col-md-12'>
                            {/* right section  */}
                            <div className='profileright'>
                                <div className='reviewsection'>
                                    <div className='stars'>
                                        <img src={Images.star} alt='starimg' className='img-fluid' />
                                    </div>
                                    <div className='reviews'>
                                        <p className='cheftext p-0'>My Ratings & Reviews</p>
                                        <p className='chatheadtext'>4.5 (845 Reviews)</p>
                                    </div>
                                </div>
                                {/* chefdata  */}
                                <div className='chefdata'>
                                    <div className='editsection'>
                                        <img src={Images.edit} alt='editimage' className='img-fluid' />
                                        <p className='editheading'>Edit profile</p>
                                    </div>
                                    <div className='nameprofile'>
                                        <div className='firstname'>
                                            <p className='dummyText p-0'>First Name</p>
                                            <p className='nameheading'>Sarah </p>
                                        </div>
                                        <div className='lastname'>
                                            <p className='dummyText p-0'>Last Name</p>
                                            <p className='nameheading'>Bergstrom</p>
                                        </div>
                                    </div>
                                    <div className='emailheading'>
                                        <p className='dummyText p-0'>Email</p>
                                        <p className='nameheading'>bangura@serveitlocal.com</p>
                                    </div>
                                    <div className='experprofile'>
                                        <div className='chefname'>
                                            <p className='dummyText p-0'>Chef Type</p>
                                            <div className='restroinfo'>
                                                <p className='nameheading'>Restaurant</p>
                                                <img src={Images.chefType} alt='cheftypeimage' className='infoimg' />
                                                <div className='information'>
                                                <p className='chatSearchere_ '>The chef will prepare exquisite dishes at
                                                        the restaurant and deliver them to the
                                                        customer's location.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='chefexp'>
                                            <p className='dummyText p-0'>Experience</p>
                                            <p className='nameheading'>15 Years</p>
                                        </div>
                                    </div>
                                    <div className='adressection'>
                                        <div className='addressimg'>
                                            <img src={Images.Location} alt='locationimg' className='img-fluid' />
                                        </div>
                                        <div className='adressheading'>
                                            <p className='dummyText p-0'>Address</p>
                                            <p className='adresssub'>46 Abingdon Road, Brandeston, United
                                                Kingdom IP13 4PB</p>
                                        </div>
                                    </div>
                                    <div className='adressection'>
                                        <div className='addressimg'>
                                            <img src={Images.bio} alt='locationimg' className='img-fluid' />
                                        </div>
                                        <div className='adressheading'>
                                            <p className='dummyText p-0'>Bio</p>
                                            <p className='adresssub'>It is a long established fact that a reader will
                                                be distracted by the readable content of a
                                                page when looking at its layout.
                                                It is a long established fact that a reader will
                                                be distracted by the readable content of a
                                                page when looking at its layout.It is a long established fact that a reader will
                                                be distracted by the readable content of a
                                                page when looking at its layout.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* chef expertise  */}
                                <div className='expertise'>
                                    <div className='myexpertise'>
                                        <p className='nameheading'>My Expertise</p>
                                        <p className='modalclearAll'>+ Add</p>
                                    </div>
                                    <div className='chefexpertise'>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>North Indian</p>
                                        </div>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>Chicken</p>
                                        </div>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>Soups</p>
                                        </div>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>North Indian</p>
                                        </div>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>Chicken</p>
                                        </div>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>Soups</p>
                                        </div>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>North Indian</p>
                                        </div>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>Chicken</p>
                                        </div>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>Soups</p>
                                        </div>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>North Indian</p>
                                        </div>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>Chicken</p>
                                        </div>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>Soups</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='availability'>
                                    <div className='myexpertise'>
                                        <p className='nameheading'>My Availability</p>
                                        <p className='modalclearAll'>+ Add</p>
                                    </div>
                                    <ul className='myavailability'>
                                        <li className='dayavailability'>
                                        <Link to="#">
                                            <p className='notificationText '>Mon</p>
                                            </Link>
                                        </li>
                                        <li className='dayavailability'>
                                        <Link to="#">
                                            <p className='notificationText '>Tue</p>
                                            </Link>
                                        </li>
                                        <li className='dayavailability'>
                                        <Link to="#">
                                            <p className='notificationText '>Wed</p>
                                            </Link>
                                        </li>
                                        <li className='dayavailability'>
                                        <Link to="#">
                                            <p className='notificationText '>Thu</p>
                                            </Link>
                                        </li>
                                        <li className='dayavailability'>
                                        <Link to="#">
                                            <p className='notificationText '>Fri</p>
                                            </Link>
                                        </li>
                                        <li className='dayavailability'>
                                        <Link to="#">
                                            <p className='notificationText '>Sat</p>
                                            </Link>
                                        </li>
                                        <li className='dayavailability'>
                                        <Link to="#">
                                            <p className='notificationText '>Sun</p>
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className='cheftime'>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>09:00 am - 12:30 pm</p>
                                        </div>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>02:00 pm - 04:00 pm</p>
                                        </div>
                                        <div className='expertisevalue'>
                                            <p className='expertheading'>06:30 pm - 10:20 pm</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </section>


        </>
    )
}

export default myprofile

