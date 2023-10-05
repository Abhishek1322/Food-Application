import React from 'react'
import * as Images from "../../../../utilities/images"

const AddmenuItemModal = () => {
  return (
    <>
      <div className='addmenuItemModal'>
        <div className="input-container mt-5">
          <textarea type="" className=" menuReport_button   " placeholder='Chicken Salad' />
          <img src={Images.categoryImg} className='cateofyImg_' />
          <label className="border-label">Item Name</label>

        </div>
        <div className="input-container mt-4">
          <textarea type="" className=" menuReport_button   " placeholder='Non-Veg' />
          <img src={Images.menuDishImg} className='cateofyImg_' />
          <label className="border-label">Category</label>

        </div>
        <div className='flexBox justify-content-between editMenuFields_ '>
          <div className="input-container mt-5">
            <textarea type="" className=" menuEditbuttom " placeholder='22.00' />
            <img src={Images.euroImg} className='cateofyImg_' />
            <label className="border-label">Price</label>
          </div>
          <div className="input-container mt-5 pe-3 flexBox">
            <textarea type="" className=" menuEditbuttom " placeholder='45' />
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
      <button className='foodmodalbtn  menuItemBtn modalfooterbtn'>
        ADD
      </button>


    </>
  )
}

export default AddmenuItemModal