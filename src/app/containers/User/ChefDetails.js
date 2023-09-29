import React, { useState } from 'react'
import * as Images from "../../../utilities/images";
import { Link } from 'react-router-dom';
import CustomModal from '../../components/common/shared/CustomModal';
import AvailableModal from '../../components/common/shared/availableModal';
import CartFoodModal from '../../components/common/shared/CartFoodModal';


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
                            <div className='col-lg-7 col-md-12 buttonBoxmodal'>

                                <button className='sarahavailablebtn' onClick={() => {
                                    handleUserProfile("availabilityModal")
                                }}>
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
                {/* chef experience section  */}
                <div className='sarahdata'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-lg-3 col-md-6 col-sm-12 d-flex justify-content-start'>
                                <p className='chatSearchere_'> <span className='sarahtime'>£45</span>/hour</p>
                            </div>
                            <div className='col-lg-3 col-md-6 col-sm-12'>
                                <p className='chefName'>Experience</p>
                                <p className='chatSearchere_ mt-2'>15 + Years Exp.</p>
                            </div>
                            <div className='col-lg-3 col-md-6 col-sm-12'>
                                <p className='chefName'>Rating</p>
                                <div className='chefrating mt-2'>
                                    <i class="las la-star startIcon"></i>
                                    <p className='ratingheading'>4.5 (845 Reviews)</p>
                                </div>

                            </div>
                            <div className='col-lg-3 col-md-6 col-sm-12'>
                                <p className='chefName'>Address</p>
                                <p className='chatSearchere_ mt-2'>46 Abingdon Road, Brandeston, United Kingdom
                                    IP13 4PB</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* chef bio section  */}
                <div className='sarahbioexpert'>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-lg-6 col-md-12'>
                                <p className='innerDummyHeading '>Bio</p>
                                <p className='dummyText mt-2'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using to using 'Content here, content here', making it look like English.</p>
                            </div>


                            <div className='col-lg-6 col-md-12'>
                                <p className='innerDummyHeading '>Expertise</p>
                                <div className='chefexpertise mt-2'>
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
                        </div>
                    </div>
                </div>
                {/* chef menu section  */}
                <div className='sarahsmenu'>
                    <div className='container-fluid'>
                        <p className='innerDummyHeading ' > Sarah’s Menu</p>
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
                                    <p className='itemIs_'>Chicken Salad</p>
                                    <p className='category_'>Food Category</p>
                                    <div className='sarahmenuprice'>
                                        <button className='itemsPrice_ '>£22.00</button>
                                        <div className='sarahbasket'>
                                            <Link to="#" onClick={() => {
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
            </div>
            <CustomModal
                key={key}
                show={modalDetail.show}
                backdrop="static"
                showCloseBtn={false}
                isRightSideModal={true}
                mediumWidth={false}
                className={modalDetail.flag === "availabilityModal" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "availabilityModal" ? "availablebtnModal" : modalDetail.flag === "CartFood" ? "CartModalFood" : ""}
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
                            ""
                }
                header=

                {modalDetail.flag === "availabilityModal" ?
                    <>
                        <h2 className="modal_Heading">
                            Availability
                        </h2>
                        <p onClick={handleOnCloseModal} className='modal_cancel'>
                            <img src={Images.modalCancel} className='ModalCancel' />
                        </p>
                    </>
                    :
                    modalDetail.flag === "CartFood" ?
                        <>
                            {/* <h2 className="modal_Heading">
                                Cart
                            </h2> */}
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

export default ChefDetails