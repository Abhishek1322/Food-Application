import React from 'react'
import * as Images from "../../../../utilities/images"

const EditMenuModal = () => {
  return (
    
    <>
    <div className='menuModal_'>
    <div className="input-container mt-5">
          <textarea type="" className="Reportborder-input  " placeholder='Chicken Salad' />
          <img src={Images.categoryImg}  className='cateofyImg_'/>
          <label className="border-label">Item Name</label>
            
        </div>
    </div>
    </>
  )
}

export default EditMenuModal