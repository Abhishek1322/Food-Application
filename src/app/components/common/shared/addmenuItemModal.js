import React, { useState } from 'react'
import * as Images from "../../../../utilities/images"
import CustomModal from './CustomModal'
import AfterUploadImage from './afterUploadImage'

const AddmenuItemModal = () => {

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
      <div className='modalscroll'>
        <div className='addmenuItemModal'>
          <div className="input-container mt-5">
            <input type="" className=" menuReport_button   " placeholder='Chicken Salad' />
            <img src={Images.categoryImg} className='cateofyImg_' />
            <label className="border-label">Item Name</label>

          </div>
          <div className="input-container mt-4">
            <input type="" className=" menuReport_button   " placeholder='Non-Veg' />
            <img src={Images.menuDishImg} className='cateofyImg_' />
            <label className="border-label">Category</label>

          </div>
          <div className='flexBox justify-content-between editMenuFields_ '>
            <div className="input-container mt-5">
              <input type="" className=" menuEditbuttom " placeholder='22.00' />
              <img src={Images.euroImg} className='cateofyImg_' />
              <label className="border-label">Price</label>
            </div>
            <div className="input-container mt-5 pe-3 flexBox">
              <input type="" className=" menuEditbuttom " placeholder='45' />
              <p className='inneredittxt'>MIN</p>
              <img src={Images.clockImg} className='cateofyImg_' />
              <label className="border-label">Delivery Time</label>
            </div>
          </div>
        </div>
        <div className="input-container mt-4">
          <textarea type="" className=" menuReport_button  menuDescrition_  " placeholder='Type here...' />
          <label className="border-label">Description</label>

        </div>
        <div className='editImgBox_'>

          <p className='chefName mt-4 pb-3'>Upload Image </p>
          <div class="uploadImgebox choosetoUpload">
            <img src={Images.Uploadicon} alt="Uploadicon" class="Uploadicon uploadIconImg" />
            <p class="uploadbtnn">Choose Image</p>
            <p class="smallHeading_">Upload Image Here</p>
            <p class="uploadText mt-1">5 mb max file size</p>
          </div>
        </div>
      </div>
      <button className='foodmodalbtn  menuItemBtn modalfooterbtn' onClick={() => {
        handleUserProfile("afterimgUploadModal")
      }} >
        ADD
      </button>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={modalDetail.flag === "afterimgUploadModal" ? "commonWidth customContent" : ""}
        ids={modalDetail.flag === "afterimgUploadModal" ? "readyWithOrder" : ""}
        child={
          modalDetail.flag === "afterimgUploadModal" ? (
            <AfterUploadImage
              close={() => handleOnCloseModal()}

            />
          ) :
            ""
        }
        header=

        {modalDetail.flag === "afterimgUploadModal" ?
          <>
            <div className='editadressheading'>
              <div className='edithead'>
                <p className="modal_Heading">
                  Add Menu Item
                </p>
                <p className='chatUser'>Add your menu items below.</p>
              </div>
            </div>
            <p onClick={handleOnCloseModal} className='modal_cancel'>
              <img src={Images.modalCancel} className='ModalCancel' />
            </p>
            {/* <p onClick={handleOnCloseModal} className='modal_cancel'>
                            <img src={Images.modalCancel} className='ModalCancel' />
                        </p> */}
          </>
          :
          ''
        }
        onCloseModal={() => handleOnCloseModal()}
      />

    </>
  )
}

export default AddmenuItemModal