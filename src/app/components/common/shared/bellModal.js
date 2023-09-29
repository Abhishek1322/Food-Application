import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal'
import ChatnextModal from './chatnextModal'
import ReportchatDropModal from './reportchatDropModal'

const BellModal = () => {
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
                <div className='searchbar '>
                    <input type='text' placeholder='Search Chef near you...' className='searchtext'
                    />
                    <img src={Images.searchbar} className='searchbarImg' alt='searchbar' />

                </div>
                <div className='modalscroll'>
                    <div className='chatModal' onClick={() => {
                        handleUserProfile("chatBell")
                    }}>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                        <div className='innermodal'>
                            <p className='chefName'>Sarah Bergstrom</p>
                            <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
                            <p className='chatTime'>Just Now</p>
                            <span className='modalChatmsg'>2</span>
                        </div>
                        <div className='mt-3 me-3'>
                            <img src={Images.chatsDots} className='' alt='cartcancel' />
                        </div>

                    </div>
                    <div className='chatModal '>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                        <div className='innermodal'>
                            <p className='chefName'>Hilda Herzog </p>
                            <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
                            <p className='chatTime'>Just Now</p>
                        </div>
                        <div className='mt-3  me-3'>
                            <img src={Images.chatsDots} className='' alt='cartcancel' />
                        </div>

                    </div>
                    <div className='chatModal '>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                        <div className='innermodal'>
                            <p className='chefName'>Tom Stoltenberg</p>
                            <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
                            <p className='chatTime'>Just Now</p>
                            <span className='modalChatmsg'>2</span>
                        </div>
                        <div className='mt-3  me-3'>
                            <img src={Images.chatsDots} className='' alt='cartcancel' />
                        </div>

                    </div>
                    <div className='chatModal'>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                        <div className='innermodal'>
                            <p className='chefName'>Sheryl Lowez</p>
                            <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
                            <p className='chatTime'>Just Now</p>
                        </div>
                        <div className='mt-3  me-3'>
                            <img src={Images.chatsDots} className='' alt='cartcancel' />
                        </div>

                    </div>
                    <div className='chatModal '>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                        <div className='innermodal'>
                            <p className='chefName'>Olive Kuvalis</p>
                            <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
                            <p className='chatTime'>Just Now</p>
                        </div>
                        <div className='mt-3  me-3'>
                            <img src={Images.chatsDots} className='' alt='cartcancel' />
                        </div>

                    </div>
                    <div className='chatModal '>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                        <div className='innermodal'>
                            <p className='chefName'>Hilda Herzog </p>
                            <p className='cheftext'>Contrary to popular belief, Ipsum...</p>
                            <p className='chatTime'>Just Now</p>
                        </div>
                        <div className='mt-3  me-3'>
                            <img src={Images.chatsDots} className='' alt='cartcancel' />
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
                className={modalDetail.flag === "chatBell " ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "reportchatD" ? "chatbellSection" : modalDetail.flag === "chatBell" ? "chatbellSection" : ""}
                child={
                    modalDetail.flag === "chatBell" ? (
                        <ChatnextModal
                            close={() => handleOnCloseModal()}
                        />
                    ) : modalDetail.flag === "reportchatD" ? (
                        <ReportchatDropModal close={() => handleOnCloseModal()} />
                    )
                        :
                        ''
                }
                header=

                {modalDetail.flag === "chatBell" ?
                    <>
                        <div className='Common_header'>
                            <img
                                src={Images.backArrowpassword}
                                alt="logo"
                                className="img-fluid  arrowCommon_"
                            />
                            <img
                                src={Images.userProfile}
                                alt="logo"
                                className="img-fluid  headerImg_"
                            />
                            <div className='headerProfile'>
                                <p className='headerTxt_'>John Smith</p>
                                <p className='headerInner_'>Online</p>
                            </div>



                        </div>
                        {/* <p onClick={handleOnCloseModal} className='modal_cancel'>
                            <img src={Images.modalCancel} className='ModalCancel' />
                        </p> */}
                        <div className='Dotsheader_'>
                            <div class="dropdown ">
                                <button class="btn btn-secondary dropdown-toggle modalheaderDot_" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={Images.modalHeader} className=' img-fluid chatreportIcon_' />
                                </button>
                                <ul class="dropdown-menu chatmenu_" aria-labelledby="dropdownMenuButton1">
                                    <div className=' chatnext_ flexBox' onClick={() => {
                                        handleUserProfile("reportchatD")
                                    }}>
                                        <img src={Images.reportchatIcon} className=' img-fluid reporticon_' />
                                        <p className='reportchattxt_ m-0 ps-2'>Report Chat</p>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </>
                    :
                    modalDetail.flag === "reportchatD" ?
                        <>
                            <div className='Common_header'>
                                <img
                                    src={Images.backArrowpassword}
                                    alt="logo"
                                    className="img-fluid  arrowCommon_"
                                />
                                <p className='headerTxt_ m-0 ps-2'>Report Chat</p>
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

export default BellModal