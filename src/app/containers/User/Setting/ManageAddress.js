import React, { useState } from 'react'
import * as Images from "../../../../utilities/images";
import { Link } from 'react-router-dom';
import CustomModal from '../../../components/common/shared/CustomModal';
import UserOrderEdit from '../../../components/common/shared/UserOrderEdit';

const UserManageAddress = () => {
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
            <div className='settingmanagesection contactUs'>
                    <div className='commonInnerHeader d-flex align-items-center mt-4 ms-3'>
                        <img src={Images.backArrowpassword} alt="logo" className="img-fluid innerHeaderArrow " />
                        <h1 className='settingMainHeading text-align-center '>Manage Address</h1>
                    </div>
                    <div className='changepassword'>
                        <div className="logRight mt-5">
                            <div className="changepasswordForm">
                                <div className='changepasswordImg d-flex justify-content-center'>
                                    <img src={Images.ManageLocation} alt="logo" className="img-fluid  contactusImg" />
                                </div>
                                <h6 className="settingMainText mb-3 d-flex  justify-content-center mt-3">Add New and Edit your
                                    Saved Addresses</h6>
                                <div className='managehome mt-5'>
                                    <img src={Images.ManageHome} alt='Homeimg' className='img-fluid' />
                                    <div className='managetext'>
                                        <h6 className='notificationText'>Home</h6>
                                        <p className='cheftext pt-1'>New York, 10003, 2nd Street dorm</p>
                                        <div class="dropdown  dropstart managedrop">
                                            <img src={Images.chatsDots} className='dropdown-toggle manageimg' alt='cartcancel' data-bs-toggle="dropdown" />
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><img src={Images.EditImg} alt='editimage' className='img-fluid' /> <span className='editdrop'>Edit </span></a></li>
                                                <li><a class="dropdown-item " href="#"><img src={Images.cartDelete} alt='editimage' className='img-fluid' /> <span className='editdrop'>Delete</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='managehome mt-3'>
                                    <img src={Images.ManageOffice} alt='Homeimg' className='img-fluid' />
                                    <div className='managetext'>
                                        <h6 className='notificationText'>Office</h6>
                                        <p className='cheftext pt-1'>New York, 10003, 2nd Street dorm</p>
                                        <div class="dropdown  dropstart managedrop">
                                            <img src={Images.chatsDots} className='dropdown-toggle manageimg' alt='cartcancel' data-bs-toggle="dropdown" />
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><img src={Images.EditImg} alt='editimage' className='img-fluid' /> <span className='editdrop'>Edit </span></a></li>
                                                <li><a class="dropdown-item " href="#"><img src={Images.cartDelete} alt='editimage' className='img-fluid' /> <span className='editdrop'>Delete</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <Link to="#">
                                    <h6 className='cancelOrder' onClick={() => {
                                        handleUserProfile("ordereditmodal")
                                    }}>+ Add New Address</h6>
                                </Link>
                                <div className="buttonBox mt-5 d-flex  justify-content-center">
                                    <button type="submit" role="button" className="smallBtn">SAVE</button>
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
                className={modalDetail.flag === "ordereditmodal" ? "commonWidth customContent" : ""}
                ids={modalDetail.flag === "ordereditmodal" ? "ordereditaddress" : ""}
                child={
                    modalDetail.flag === "ordereditmodal" ? (
                        <UserOrderEdit
                            close={() => handleOnCloseModal()}
                        />
                    ) :
                        ""
                }
                header=

                {modalDetail.flag === "ordereditmodal" ?
                    <>
                        <div className='editadressheading'>
                            <img src={Images.backArrowpassword} alt='backarrowimage' className='img-fluid' />
                            <div className='edithead'>
                                <h2 className="modal_Heading">
                                    Edit Address
                                </h2>
                                <p className='chatUser'>Edit Address below</p>
                            </div>
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

export default UserManageAddress