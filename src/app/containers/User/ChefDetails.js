import React, { useState } from 'react'
import * as Images from "../../../utilities/images";
import { Link } from 'react-router-dom';
import CustomModal from '../../components/common/shared/CustomModal';
import AvailableModal from '../../components/common/shared/availableModal';
import CartFoodModal from '../../components/common/shared/CartFoodModal';
import ChefRating from '../../components/common/shared/ChefRating';
import UserCartModal from '../../components/common/shared/UserCartModal';

const ChefDetails = () => {
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
            <div className='chefdetailsection'>
                <div className='sarahchef'>
                    {/* chef data section  */}
                    <div className='row'>
                        <div className='col-lg-5 col-md-12'>
                            <div className='sarahinfo'>
                                <div className='sarahimg'>
                                    <img src={Images.UserICon} alt='sarahimage' className='img-fluid' />
                                </div>
                                <div className='saraheading'>
                                    <h4 className='johnExplorer mb-1'>Sarah Bergstrom</h4>
                                    <div className='sarahrestro'>
                                        <div className='restroinfo'>
                                            <Link to="#"><img src={Images.sarahcap} alt='sarahcapimage' className='img-fluid' /></Link>
                                            <div className='johnchatdetail'>
                                                <Link to="#"><p className='chatDates'>Restaurant</p></Link>
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
                        <div className='col-lg-7 col-md-12'>
                            <div className='flexBox justify-content-end'>
                                <button className='sarahavailablebtn' onClick={() => {
                                    handleUserProfile("availabilityModal")
                                }}>
                                    <img src={Images.TimeSquare} alt='timesquareimage' className='availableimg' />
                                    <span className='availableheading'>Availability</span>
                                </button>
                                <button className='sarahmessagebtn'>
                                    <img src={Images.ChefChat} alt='timesquareimage' className='availableimg' />
                                    <span className='availableheading'>Chat</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* chef experience section  */}
                <div className='sarahdata'>
                    <div className='row'>
                        <div className='col-lg-3 col-md-6 col-sm-12 d-flex justify-content-start'>
                            <h6 className='chatSearchere_'> <span className='sarahtime'>£45</span>/hour</h6>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-12'>
                            <h6 className='chefName'>Experience</h6>
                            <h6 className='chatSearchere_ mt-2'>15 + Years Exp.</h6>
                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-12'>
                            <h6 className='chefName'>Rating</h6>
                            <div className='chefrating mt-2' onClick={() => {
                                handleUserProfile("ratingchef")
                            }}>
                                <i class="las la-star startIcon"></i>
                                <h6 className='ratingheading'>4.5 (845 Reviews)</h6>
                            </div>

                        </div>
                        <div className='col-lg-3 col-md-6 col-sm-12'>
                            <h6 className='chefName'>Address</h6>
                            <p className='chatSearchere_ mt-2'>46 Abingdon Road, Brandeston, United Kingdom
                                IP13 4PB</p>
                        </div>
                    </div>
                </div>
                {/* chef bio section  */}
                <div className='sarahbioexpert'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-12'>
                            <h3 className='innerDummyHeading '>Bio</h3>
                            <p className='dummyText mt-2'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using to using 'Content here, content here', making it look like English.</p>
                        </div>


                        <div className='col-lg-6 col-md-12'>
                            <h3 className='innerDummyHeading '>Expertise</h3>
                            <div className='chefexpertise mt-2'>
                                <div className='expertisevalue'>
                                    <h6 className='expertheading'>North Indian</h6>
                                </div>
                                <div className='expertisevalue'>
                                    <h6 className='expertheading'>Chicken</h6>
                                </div>
                                <div className='expertisevalue'>
                                    <h6 className='expertheading'>Soups</h6>
                                </div>
                                <div className='expertisevalue'>
                                    <h6 className='expertheading'>North Indian</h6>
                                </div>
                                <div className='expertisevalue'>
                                    <h6 className='expertheading'>Chicken</h6>
                                </div>
                                <div className='expertisevalue'>
                                    <h6 className='expertheading'>Soups</h6>
                                </div>
                                <div className='expertisevalue'>
                                    <h6 className='expertheading'>North Indian</h6>
                                </div>
                                <div className='expertisevalue'>
                                    <h6 className='expertheading'>Chicken</h6>
                                </div>
                                <div className='expertisevalue'>
                                    <h6 className='expertheading'>Soups</h6>
                                </div>
                                <div className='expertisevalue'>
                                    <h6 className='expertheading'>North Indian</h6>
                                </div>
                                <div className='expertisevalue'>
                                    <h6 className='expertheading'>Chicken</h6>
                                </div>
                                <div className='expertisevalue'>
                                    <h6 className='expertheading'>Soups</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* chef menu section  */}
                <div className='sarahsmenu'>
                    <h2 className='innerDummyHeading ' > Sarah’s Menu</h2>
                    <div className='row'>
                        {slides && slides.map((val, i) => {
                            return (
                                <div className='col-lg-2 col-md-4 col-sm-6'>
                                    <div className='listItems_'>
                                        <div className='menu_Items'>
                                            <div className='innerItems_'>
                                                <img src={Images.ItemsBgMenu} alt="logo" className="bgmenuImg_" />
                                                <img src={Images.SaladImg} alt="logo" className="menuItem_" />
                                            </div>
                                        </div>
                                        <h6 className='itemIs_'>Chicken Salad</h6>
                                        <h6 className='category_'>Food Category</h6>
                                        <div className='sarahmenuprice'>
                                            <button className='itemsPrice_ '>£22.00</button>
                                            <div className='sarahbasket'>
                                                <Link to="#" className='chefcartlink' onClick={() => {
                                                    handleUserProfile("CartFood")
                                                }}><img src={Images.basketImg} alt='basketimage' className='img-fluid' /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
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
                className={modalDetail.flag === "availabilityModal" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "availabilityModal" ? "availablebtnModal" : modalDetail.flag === "CartFood" ? "CartModalFood" : modalDetail.flag === "ratingchef" ? "ratingusermodal" : modalDetail.flag === "chefcart" ? "usercartmodal" : ""}
                child={
                    modalDetail.flag === "availabilityModal" ? (
                        <AvailableModal
                            close={() => handleOnCloseModal()}

                        />
                    ) :
                        modalDetail.flag === "CartFood" ? (
                            <CartFoodModal
                                close={() => handleOnCloseModal()}
                            />
                        ) :
                            modalDetail.flag === "ratingchef" ? (
                                <ChefRating
                                    close={() => handleOnCloseModal()}
                                />
                            ) :
                                ""
                }
                header=

                {modalDetail.flag === "availabilityModal" ?
                    <>
                        <h2 className="modal_Heading">
                            Availability
                        </h2>
                        <div onClick={handleOnCloseModal} className='modal_cancel'>
                            <img src={Images.modalCancel} className='ModalCancel' />
                        </div>
                    </>
                    :
                    modalDetail.flag === "CartFood" ?
                        <>
                            {/* <h2 className="modal_Heading">
                                Cart
                            </h2> */}
                            <div onClick={handleOnCloseModal} className='modal_cancel'>
                                <img src={Images.modalCancel} className='ModalCancel' />
                            </div>
                        </>
                        :
                        modalDetail.flag === "ratingchef" ?
                            <>
                                <h2 className="modal_Heading">
                                    Rating & Reviews
                                </h2>
                                <div onClick={handleOnCloseModal} className='modal_cancel'>
                                    <img src={Images.modalCancel} className='ModalCancel' />
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

export default ChefDetails