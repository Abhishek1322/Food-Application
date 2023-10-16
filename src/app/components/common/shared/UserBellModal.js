import React, { useState } from 'react'
import * as Images from "../../../../utilities/images";
import CustomModal from './CustomModal';
import UserDeleteChat from './UserDeleteChat';
import UserChatModal from './UserChatModal';
import UserReportChat from './UserReportChat';
import UserClearChat from './UserClearChat';
import { Link } from 'react-router-dom';



const UserBellModal = () => {
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
            <div className='userbellsection modalContent'>
                <div className='searchbar '>
                    <input type='search' placeholder='Search Chef near you...' className='searchtext'
                    />
                    <img src={Images.searchbar} className='searchbarImg' alt='searchbar' />
                </div>
                <div className='modalscroll'>
                    <div className='chatModal'>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                        <div className='innermodal' onClick={() => {
                            handleUserProfile("chefchat")
                        }}>
                            <h4 className='chefName'>Sarah Bergstrom</h4>
                            <p className='cheftext '>Contrary to popular belief, Ipsum...</p>
                            <h6 className='chatTime'>Just Now</h6>
                            <span className='modalChatmsg'>2</span>
                        </div>
                        <div className='mt-3 me-3'>
                            <div className="dropdown dropend">
                                <img src={Images.chatsDots} className='dropdown-toggle' alt='cartcancel' data-bs-toggle="dropdown" />
                                <ul className="dropdown-menu">
                                    <li onClick={() => {
                                        handleUserProfile("deletechat")
                                    }}><Link className="dropdown-item" to="#"><img src={Images.cartDelete} alt='editimage' className='img-fluid' /> <span className='editdrop'>Delete Chat</span></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='chatModal '>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                        <div className='innermodal'>
                            <h4 className='chefName'>Hilda Herzog </h4>
                            <p className='cheftext '>Contrary to popular belief, Ipsum...</p>
                            <h6 className='chatTime'>Just Now</h6>
                        </div>
                        <div className='mt-3  me-3'>
                            <div className="dropdown dropend">
                                <img src={Images.chatsDots} className='dropdown-toggle' alt='cartcancel' data-bs-toggle="dropdown" />
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#"><img src={Images.cartDelete} alt='editimage' className='img-fluid' /> <span className='editdrop'>Delete Chat</span></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='chatModal '>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                        <div className='innermodal'>
                            <h4 className='chefName'>Tom Stoltenberg</h4>
                            <p className='cheftext '>Contrary to popular belief, Ipsum...</p>
                            <h6 className='chatTime'>Just Now</h6>
                            <span className='modalChatmsg'>2</span>
                        </div>
                        <div className='mt-3  me-3'>
                            <div className="dropdown dropend">
                                <img src={Images.chatsDots} className='dropdown-toggle' alt='cartcancel' data-bs-toggle="dropdown" />
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#"><img src={Images.cartDelete} alt='editimage' className='img-fluid' /> <span className='editdrop'>Delete Chat</span></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='chatModal'>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                        <div className='innermodal'>
                            <h4 className='chefName'>Sheryl Lowez</h4>
                            <p className='cheftext '>Contrary to popular belief, Ipsum...</p>
                            <h6 className='chatTime'>Just Now</h6>
                        </div>
                        <div className='mt-3  me-3'>
                            <div className="dropdown dropend">
                                <img src={Images.chatsDots} className='dropdown-toggle' alt='cartcancel' data-bs-toggle="dropdown" />
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#"><img src={Images.cartDelete} alt='editimage' className='img-fluid' /> <span className='editdrop'>Delete Chat</span></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='chatModal '>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                        <div className='innermodal'>
                            <h4 className='chefName'>Olive Kuvalis</h4>
                            <p className='cheftext '>Contrary to popular belief, Ipsum...</p>
                            <h6 className='chatTime'>Just Now</h6>
                        </div>
                        <div className='mt-3  me-3'>
                            <div className="dropdown dropend">
                                <img src={Images.chatsDots} className='dropdown-toggle' alt='cartcancel' data-bs-toggle="dropdown" />
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#"><img src={Images.cartDelete} alt='editimage' className='img-fluid' /> <span className='editdrop'>Delete Chat</span></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='chatModal '>
                        <img src={Images.userProfile} className='userprofile' alt='cartImg' />
                        <div className='innermodal'>
                            <h4 className='chefName'>Hilda Herzog </h4>
                            <p className='cheftext '>Contrary to popular belief, Ipsum...</p>
                            <h6 className='chatTime'>Just Now</h6>
                        </div>
                        <div className='mt-3  me-3'>
                            <div className="dropdown dropend">
                                <img src={Images.chatsDots} className='dropdown-toggle' alt='cartcancel' data-bs-toggle="dropdown" />
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="#"><img src={Images.cartDelete} alt='editimage' className='img-fluid' /> <span className='editdrop'>Delete Chat</span></Link></li>
                                </ul>
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
                className={modalDetail.flag === "deletechat" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "deletechat" ? "userchatdelete" : modalDetail.flag === "chefchat" ? "userchatmodal" : modalDetail.flag === "ratingchef" ? "ratingusermodal" : modalDetail.flag === "chefcart" ? "Usercartmodal" : modalDetail.flag === "reportchat" ? "userreportchat" : modalDetail.flag === "clearchat" ? "userclearchat" : ""}
                child={
                    modalDetail.flag === "deletechat" ? (
                        <UserDeleteChat
                            close={() => handleOnCloseModal()}

                        />
                    ) :
                        modalDetail.flag === "chefchat" ? (
                            <UserChatModal
                                close={() => handleOnCloseModal()}
                            />
                        ) : modalDetail.flag === "reportchat" ? (
                            <UserReportChat close={() => handleOnCloseModal()} />
                        )
                            :
                            modalDetail.flag === "clearchat" ? (
                                <UserClearChat close={() => handleOnCloseModal()} />
                            )
                                :
                                ''
                }
                header=

                {modalDetail.flag === "deletechat" ?
                    <>
                        <img src={Images.backArrowpassword} alt='backarrowimage' className='img-fluid' />
                    </>
                    :
                    modalDetail.flag === "chefchat" ?
                        <>
                            <div className='Common_header'>
                                <img
                                    src={Images.backArrowpassword}
                                    alt="logo"
                                    className="img-fluid  arrowCommon_"
                                />
                                <img
                                    src={Images.UserICon}
                                    alt="logo"
                                    className="img-fluid  headerImg_"
                                />
                                <div className='headerProfile'>
                                    <h2 className='headerTxt_'>John Smith</h2>
                                    <h6 className='headerInner_'>Online</h6>
                                </div>
                            </div>
                            <div className='Dotsheader_'>
                                <div className="dropdown ">
                                    <button className="btn btn-secondary dropdown-toggle modalheaderDot_" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={Images.modalHeader} className=' img-fluid chatreportIcon_' alt='modalheaderimg' />
                                    </button>
                                    <ul className="dropdown-menu chatdrop" aria-labelledby="dropdownMenuButton1">
                                        <li className=' chatdroplabel flexBox' onClick={() => {
                                            handleUserProfile("reportchat")
                                        }}>
                                            <img src={Images.reportchatIcon} className=' img-fluid reporticon_' alt='reportchat' />
                                            <h1 className='reportchat m-0 ps-2'>Report Chat</h1>
                                        </li>
                                        <li className=' chatdroplabel flexBox' onClick={() => {
                                            handleUserProfile("clearchat")
                                        }}>
                                            <img src={Images.ChatModal} className=' img-fluid reporticon_' alt='clearchat' />
                                            <p className='reportchat m-0 ps-2'>Clear Chat</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                        :
                        modalDetail.flag === "reportchat" ?
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

                            modalDetail.flag === "clearchat" ?
                                <>
                                    <img src={Images.backArrowpassword} alt='backarrowimage' className='img-fluid' />
                                </>
                                :

                                ''
                }
                onCloseModal={() => handleOnCloseModal()}
            />

        </>
    )
}

export default UserBellModal