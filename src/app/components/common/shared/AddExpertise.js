import React from 'react'
import * as Images from "../../../../utilities/images";


const AddExpertise = () => {
  return (
    <>
      <div className='text-end mt-4'>
        <p className='addMore'><i class="las la-plus"></i>Add More</p>
      </div>
      <div className="input-container  mt-3">
        <input type="text" className="border-input" placeholder='Experty' />
        <img src={Images.DeleteIcon} alt="InfoIcon" className='InputIcon' />
      </div>
      <div className='buttomBtn'>
        <button className='smallBtn disable w-100'>Done</button>
      </div>
    </>
  )
}

export default AddExpertise
