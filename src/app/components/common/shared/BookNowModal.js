import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal';
import ChefBookModal from './ChefBookModal';

const BookNowModal = () => {
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
            <div className='booknowsection'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className="input-container mt-4">
                                <input
                                    type="text"
                                    name="Zip Code"
                                    className="border-input"
                                    placeholder='5485 2658 2154 2210'
                                />
                                <label className="border-label">Address</label>
                                <img src={Images.Location} alt="InfoIcon" className='InputIcon' />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className="input-container mt-4">
                                <input
                                    type="text"
                                    name="Zip Code"
                                    className="border-input"
                                    placeholder='DD/MM/YYYY'
                                />
                                <label className="border-label">Date</label>
                                <img src={Images.Calendar} alt="InfoIcon" className='InputIcon' />
                            </div>
                        </div>
                    </div>
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
                        <div className='daytimes '>
                            <img src={Images.ClockIcon} alt='clockimage' className='img-fluid lighttime' />
                            <img src={Images.ColorClock} alt='clockimage' className='img-fluid darktime' />
                            <p className='daytimesheading'>9:30am - 10:30am</p>
                        </div>
                        <div className='daytimes '>
                            <img src={Images.ClockIcon} alt='clockimage' className='img-fluid lighttime' />
                            <img src={Images.ColorClock} alt='clockimage' className='img-fluid darktime' />
                            <p className='daytimesheading'>10:30am - 11:30am</p>
                        </div>
                        <div className='daytimes '>
                            <img src={Images.ClockIcon} alt='clockimage' className='img-fluid lighttime' />
                            <img src={Images.ColorClock} alt='clockimage' className='img-fluid darktime' />
                            <p className='daytimesheading'>11:30am - 12:30pm</p>
                        </div>
                        <div className='daytimes '>
                            <img src={Images.ClockIcon} alt='clockimage' className='img-fluid lighttime' />
                            <img src={Images.ColorClock} alt='clockimage' className='img-fluid darktime' />
                            <p className='daytimesheading'>12:30 am - 1:30 pm</p>
                        </div>
                        <div className='daytimes '>
                            <img src={Images.ClockIcon} alt='clockimage' className='img-fluid lighttime' />
                            <img src={Images.ColorClock} alt='clockimage' className='img-fluid darktime' />
                            <p className='daytimesheading'>1:30 am - 2:30 pm</p>
                        </div>
                        <div className='daytimes '>
                            <img src={Images.ClockIcon} alt='clockimage' className='img-fluid lighttime' />
                            <img src={Images.ColorClock} alt='clockimage' className='img-fluid darktime' />
                            <p className='daytimesheading'>2:30 am - 3:30 pm</p>
                        </div>
                        <div className='daytimes '>
                            <img src={Images.ClockIcon} alt='clockimage' className='img-fluid lighttime' />
                            <img src={Images.ColorClock} alt='clockimage' className='img-fluid darktime' />
                            <p className='daytimesheading'>3:30 am - 4:30 pm</p>
                        </div>
                        <div className='daytimes '>
                            <img src={Images.ClockIcon} alt='clockimage' className='img-fluid lighttime' />
                            <img src={Images.ColorClock} alt='clockimage' className='img-fluid darktime' />
                            <p className='daytimesheading'>4:30 am - 5:30 pm</p>
                        </div>
                        <div className='daytimes '>
                            <img src={Images.ClockIcon} alt='clockimage' className='img-fluid lighttime' />
                            <img src={Images.ColorClock} alt='clockimage' className='img-fluid darktime' />
                            <p className='daytimesheading'>5:30 am - 6:30 pm</p>
                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className="input-container mt-4">
                                <textarea
                                    type="text"
                                    className="border-input"
                                    placeholder='Write here'
                                    rows={4}
                                />
                                <label className="border-label">Description</label>
                            </div>
                        </div>
                    </div>
                    <div className='modalfooterbtn'>
                        <button className='foodmodalbtn' type='submit' onClick={() => {
                            handleUserProfile("chefbook")
                        }}>
                            book Now
                        </button>
                    </div>
            </div>
            <CustomModal
                key={key}
                show={modalDetail.show}
                backdrop="static"
                showCloseBtn={false}
                isRightSideModal={true}
                mediumWidth={false}
                className={modalDetail.flag === "chefbook" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "chefbook" ? "chefbookmodal" : ""}
                child={
                    modalDetail.flag === "chefbook" ? (
                        <ChefBookModal
                            close={() => handleOnCloseModal()}
                        />
                    ) :
                        ""
                }
                header=

                {modalDetail.flag === "chefbook" ?
                    <>
                        <h2 className="modal_Heading">
                            Check Out
                        </h2>
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

export default BookNowModal