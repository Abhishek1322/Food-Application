import React from 'react'
import * as Images from "../../../../utilities/images"

const EditMenuModal = () => {
  return (

    <>
      <div className='menuModal_'>
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
            <img src={Images.menuDishImg} className='cateofyImg_' />
            <label className="border-label">Price</label>

          </div>
          <div className="input-container mt-5 pe-3">
            <textarea type="" className=" menuEditbuttom " placeholder='45' />
            <img src={Images.menuDishImg} className='cateofyImg_' />
            <label className="border-label">Delivery Time</label>
          </div>
        </div>
        <div className="input-container mt-4">
          <textarea type="" className=" menuReport_button  menuDescrition_  " placeholder='It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' />
          <label className="border-label">Description</label>

        </div>
        <div className='editImgBox_'>
          <p className='chefName mt-4 pb-3'>Upload Image </p>
          <img src={Images.editMenuImg} className='editFoodImg' />
          <span className='cancelEditImg'>
            <i class="fas fa-times cancelEdit"></i>
          </span>

        </div>
        <button className='foodmodalbtn  modalfooterbtn'>
          Save Changes
        </button>

      </div>
    </>
  )
}

export default EditMenuModal