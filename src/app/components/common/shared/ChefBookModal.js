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
                <h2 className='chatheadtext m-3 '>Hire Chef</h2>
                <div className='row align-items-center m-2'>
                    <div className='col-lg-9'>
                        <div className='sarahinfo'>
                            <div className='sarahimg'>
                                <img src={Images.UserICon} alt='sarahimage' className='img-fluid' />
                            </div>
                            <div className='saraheading'>
                                <h4 className='chatheadtext'>Sarah Bergstrom</h4>
                                <Link to="#"><img src={Images.sarahcap} alt='sarahcapimage' className='img-fluid' /></Link>
                                <button className='restrodetail' type='button'>
                                    Restaurant
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3'>
                        <h6 className='chatTime_'> <span className='bookchefprice'>£45</span>/hour</h6>
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
                                    <h6 className='totaltxt'>Total</h6>
                                    <p className='price'>£90.00</p>
                                </div>
                                <button className='orderbutton' type='button' onClick={() => {
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
                            <img src={Images.modalCancel} className='ModalCancel' alt='modalcancelimg' />
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
