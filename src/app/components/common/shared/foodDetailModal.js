import React, { useState } from 'react'
import * as Images from "../../../../utilities/images";
import { Link } from 'react-router-dom';
import EditFoodDetailsModal from './editFoodDetailsModal'
import ClickDeleteMenuModal from './clickDeleteMenuModal'
import CustomModal from './CustomModal'
const FoodDetailModal = () => {
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
            <div className='cartfoodsection'>
                <div className='topFoodmenu'>
                    <div className='Dotsheader_'>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle modalheaderDot_" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fas fa-ellipsis-v foodDetailicon"></i>
                            </button>
                            <ul class="dropdown-menu menuItems_" aria-labelledby="dropdownMenuButton1 ">
                                <div className=' menuChat'>
                                    <div className='flexBox pb-2 ' onClick={() => {
                                        handleUserProfile("editFoodDetailsModal")
                                    }}>
                                        <img src={Images.EditImg} className=' img-fluid reporticon_' />
                                        <p className='ps-2' >Edit</p>
                                    </div>
                                    <div className='flexBox' onClick={() => {
                                        handleUserProfile("clickDeletemenuModal")
                                    }} >
                                        <img src={Images.cartDelete} className=' img-fluid reporticon_' />
                                        <p className='reportchattxt_ m-0 ps-2'>Delete Chat</p>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='foodmodal'>
                    <img src={Images.SaladImg} alt='saladimage' className='img-fluid foodDetailImg' />
                    <p className='foodmodalheading'>Chicken Salad</p>
                    <div className='restroinfo'>
                        <Link to="#"><img src={Images.sarahcap} alt='sarahcapimage' className='img-fluid ' /></Link>
                        <div className='johnchatdetail'>
                            <Link to="#"><p className='chatDates'>Category</p></Link>
                        </div>
                    </div>
                </div>
                <div className='deliverytimesheet'>
                    <div className='modalfooddelivery'>
                        <div className='foodeliverytime'>
                            <p className='chefName'>Delivery Time</p>
                            <p className='chatSearchere_  mt-1'>45 mins</p>
                        </div>
                        <div className='foodrating'>
                            <p className='chefName'>Rating</p>
                            <div className='chefrating mt-1'>
                                <i class="las la-star startIcon"></i>
                                <p className='ratingheading'>4.5 (845 Reviews)</p>
                            </div>
                        </div>
                    </div>
                    <div className='deliverfrom mt-2'>
                        <p className='chefName'>Deliver From</p>
                        <p className='chatSearchere_  mt-1'>46 Abingdon Road, Brandeston, United Kingdom
                            IP13 4PB</p>
                    </div>
                    <div className='deliverfrom mt-2'>
                        <p className='chefName'>Description</p>
                        <p className='chatSearchere_  mt-1 '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content.</p>
                    </div>
                </div>
                <p className='foodamountmodal'>
                    £22.00
                </p>
                <div className='modalfooterbtn'>
                    <div className='addfoodbtn'>
                        <button className='foodmodalbtn'>
                            Add to Cart
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
        className={modalDetail.flag === "editFoodDetailsModal" ? "commonWidth customContent" : ""}
        ids={modalDetail.flag ===  "editFoodDetailsModal" ? "editFoodDetail" : "clickDeletemenuModal" ? "clickDeleteMenu" :""}
        child={
          modalDetail.flag === "editFoodDetailsModal" ? (
            <EditFoodDetailsModal
              close={() => handleOnCloseModal()}

            />
          ) :""
        }
        header={
          modalDetail.flag === "foodDetailModal" ?
          <>
            <div className='foodDetailHeader_'>
              <p onClick={handleOnCloseModal} className='modal_cancel'>
                <img src={Images.modalCancel} className='ModalCancel' />
              </p>
            </div>
            {/* <p onClick={handleOnCloseModal} className='modal_cancel'>
                            <img src={Images.modalCancel} className='ModalCancel' />
                        </p> */}
          </>
          :
          modalDetail.flag === "editFoodDetailsModal" ?
          <>
            <div className='editadressheading'>
              <div className='edithead'>
                <p className="modal_Heading">
                Edit Item
                </p>
                <p className='chatUser'>Edit your menu items below.</p>
              </div>
            </div>
            <p onClick={handleOnCloseModal} className='modal_cancel'>
              <img src={Images.modalCancel} className='ModalCancel' />
            </p>
          </>
          :
          modalDetail.flag === "clickDeletemenuModal" ?
          <>
            <div className='editadressheading'>
             <img src={Images.backArrowpassword} className='img-fluid arrowCommon_'/>
            </div>
            {/* <p onClick={handleOnCloseModal} className='modal_cancel'>
              <img src={Images.modalCancel} className='ModalCancel' />
            </p> */}
          </>:""
        }
        onCloseModal={() => handleOnCloseModal()}
      />
        </>
        
    )
}

export default FoodDetailModal