import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal'
import ChefBookPay from './ChefBookPay'

const ChefBookModal = () => {
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
            <div className='chefbookmodalsection mt-3'>
                <div className='container-fluid'>
                    <p className='chatheadtext '>Hire Chef</p>
                    <div className='row align-items-center mt-3'>
                        <div className='col-lg-9'>
                            <div className='sarahinfo'>
                                <div className='sarahimg'>
                                    <img src={Images.UserICon} alt='sarahimage' className='img-fluid' />
                                </div>
                                <div className='saraheading'>
                                    <p className='chatheadtext'>Sarah Bergstrom</p>
                                    <Link to="#"><img src={Images.sarahcap} alt='sarahcapimage' className='img-fluid' /></Link>
                                    <button className='restrodetail'>
                                        Restaurant
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-3'>
                            <p className='chatTime_'> <span className='bookchefprice'>£45</span>/hour</p>
                        </div>
                    </div>
                </div>
                <div className='chefbookslots'>
                    <p className='chefName mt-3'>Book Time Slot</p>
                    <div className='bookslots mt-2'>
                        <div className='daytimes active '>
                            <img src={Images.ClockIcon} alt='clockimage' className='img-fluid lighttime' />
                            <img src={Images.ColorClock} alt='clockimage' className='img-fluid darktime' />
                            <p className='daytimesheading'>7:30 am - 8:30 pm</p>
                        </div>
                        <div className='daytimes active'>
                            <img src={Images.ClockIcon} alt='clockimage' className='img-fluid lighttime' />
                            <img src={Images.ColorClock} alt='clockimage' className='img-fluid darktime' />
                            <p className='daytimesheading'>8:30am - 9:30am</p>
                        </div>
                    </div>
                </div>
                <div className='modalfooterborder'>
                    <div className='modalfooterbtn'>
                        <div className='bookmodalbtn'>
                            <p className='foodamountmodal'>£45.00  <span className='notificationText '>X   2 hrs</span></p>

                            <div className='orderNow'>
                                <div className='totalPrice'>
                                    <p className='totaltxt'>Total</p>
                                    <p className='price'>£90.00</p>
                                </div>
                                <button className='orderbutton' onClick={() => {
                                    handleUserProfile("chefpay")
                                }}>Pay Now</button>
                            </div>
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
                className={modalDetail.flag === "editmodal" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "chefpay" ? "chefbookpaymodal" : ""}
                child={
                    modalDetail.flag === "chefpay" ? (
                        <ChefBookPay
                            close={() => handleOnCloseModal()}
                        />
                    ) :
                        ""
                }
                header=

                {modalDetail.flag === "chefpay" ?
                    <>
                        <div className='editadressheading'>
                            <img src={Images.backArrowpassword} alt='backarrowimage' className='img-fluid' />
                            <div className='edithead'>
                                <h2 className="modal_Heading">
                                    Pay Now
                                </h2>
                                <p className='chatUser'>Debit/Credit cards acceptable</p>
                            </div>
                        </div>
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

export default ChefBookModal
