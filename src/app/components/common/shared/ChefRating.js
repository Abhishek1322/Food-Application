import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import ChefGiveRating from './ChefGiveRating';
import CustomModal from './CustomModal';

const ChefRating = () => {
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
            <div className='chefratingsection'>
                <div className='userrate modalscroll'>
                    <div className='chefrateimg'>
                        <img src={Images.UserProfileRate} alt='userrating' className='img-fluid' />
                        <div className='reviewrating'>
                            <div className='chefreviews'>
                                <div className='venuInfo'>Alejandro Hagenes</div>
                                <div className='cheftext'>2 days ago</div>
                            </div>
                            <div className='ratingimgmodal'>
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.LightStar} alt='userrating' className='img-fluid' />
                            </div>
                            <div className='userreviews mt-2'>
                                <p className='cheftext '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>
                        </div>
                    </div>
                    <div className='chefrateimg'>
                        <img src={Images.UserRating} alt='userrating' className='img-fluid' />
                        <div className='reviewrating'>
                            <div className='chefreviews'>
                                <div className='venuInfo'>Jeffrey Towne</div>
                                <div className='cheftext'>2 days ago</div>
                            </div>
                            <div className='ratingimgmodal'>
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.LightStar} alt='userrating' className='img-fluid' />
                            </div>
                            <div className='userreviews mt-2'>
                                <p className='cheftext '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>
                        </div>
                    </div>
                    <div className='chefrateimg'>
                        <img src={Images.UserProfileRate} alt='userrating' className='img-fluid' />
                        <div className='reviewrating'>
                            <div className='chefreviews'>
                                <div className='venuInfo'>Alejandro Hagenes</div>
                                <div className='cheftext'>2 days ago</div>
                            </div>
                            <div className='ratingimgmodal'>
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.LightStar} alt='userrating' className='img-fluid' />
                            </div>
                            <div className='userreviews mt-2'>
                                <p className='cheftext '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>
                        </div>
                    </div>
                    <div className='chefrateimg'>
                        <img src={Images.UserRating} alt='userrating' className='img-fluid' />
                        <div className='reviewrating'>
                            <div className='chefreviews'>
                                <div className='venuInfo'>Jeffrey Towne</div>
                                <div className='cheftext'>2 days ago</div>
                            </div>
                            <div className='ratingimgmodal'>
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.LightStar} alt='userrating' className='img-fluid' />
                            </div>
                            <div className='userreviews mt-2'>
                                <p className='cheftext '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>
                        </div>
                    </div>
                    <div className='chefrateimg'>
                        <img src={Images.UserProfileRate} alt='userrating' className='img-fluid' />
                        <div className='reviewrating'>
                            <div className='chefreviews'>
                                <div className='venuInfo'>Alejandro Hagenes</div>
                                <div className='cheftext'>2 days ago</div>
                            </div>
                            <div className='ratingimgmodal'>
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                                <img src={Images.LightStar} alt='userrating' className='img-fluid' />
                            </div>
                            <div className='userreviews mt-2'>
                                <p className='cheftext '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='modalfooterbtn'>
                    <div className='addfoodbtn'>
                        <button className='foodmodalbtn' type='button' onClick={() => {
                                            handleUserProfile("giverate")
                                        }}>
                            Rate Us
                        </button>
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
          className={modalDetail.flag === "giverate" ? "commonWidth customContent" : ""}
          ids={modalDetail.flag === "giverate" ? "giveratemodal" : ""}
          child={
            modalDetail.flag === "giverate" ? (
              <ChefGiveRating
                close={() => handleOnCloseModal()}
              />
            ) :
              ""
          }
          header=

          {modalDetail.flag === "giverate" ?
            <>
              <div className='editadressheading'>
                            <img src={Images.backArrowpassword} alt='backarrowimage' className='img-fluid' />
                            <div className='edithead'>
                                <h2 className="modal_Heading">
                                Give Rating & Reviews
                                </h2>
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

export default ChefRating