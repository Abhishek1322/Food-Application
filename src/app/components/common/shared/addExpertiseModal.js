import React from 'react'
import * as Images from "../../../../utilities/images"


const AddExpertiseModal = () => {
  return (
    <div className='ProfilePageModal'>
      <div className='editPage_'>
        <i class="fas fa-plus addmore"></i>
        <p className='editext_ text-end'>Add More</p>
      </div>
      <div className='editFields_'>
        <div className="input-container mt-4">
          <div className='flexBox justify-content-between'>
            <input type="text" className="border-input" placeholder='North Indian' />
            <img src={Images.editprofileDelete} className='editDelete_' />
          </div>
        </div>
        <div className="input-container mt-3">
          <div className='flexBox justify-content-between'>
            <input type="text" className="border-input" placeholder='Chicken' />
            <img src={Images.editprofileDelete} className='editDelete_' />
          </div>
        </div>
        <div className="input-container mt-3">
          <div className='flexBox justify-content-between'>
            <input type="text" className="border-input" placeholder='Soups' />
            <img src={Images.editprofileDelete} className='editDelete_' />
          </div>
        </div>
        <div className="input-container mt-3">
          <div className='flexBox justify-content-between'>
            <input type="text" className="border-input" placeholder='North Indian' />
            <img src={Images.editprofileDelete} className='editDelete_' />
          </div>
        </div>
        <div className="input-container mt-3">
          <div className='flexBox justify-content-between'>
            <input type="text" className="border-input" placeholder='Chicken' />
            <img src={Images.editprofileDelete} className='editDelete_' />
          </div>
        </div>
        <div className="input-container mt-3">
          <div className='flexBox justify-content-between'>
            <input type="text" className="border-input" placeholder='Soups' />
            <img src={Images.editprofileDelete} className='editDelete_' />
          </div>
        </div>
      </div>
      <button className='foodmodalbtn  modalfooterbtn'>
        Done
      </button>

    </div>
  )
}

export default AddExpertiseModal