import React from 'react'
import * as Images from "../../../../utilities/images"


const ChefGiveRating = () => {
    return (
        <>
            <div className='giveratesection'>
                <p className='venuInfo mt-4'>Rating</p>
                <div className='ratingimgmodal mt-2'>
                    <img src={Images.star} alt='userrating' className='img-fluid' />
                    <img src={Images.star} alt='userrating' className='img-fluid' />
                    <img src={Images.star} alt='userrating' className='img-fluid' />
                    <img src={Images.star} alt='userrating' className='img-fluid' />
                    <img src={Images.LargeStar} alt='userrating' className='img-fluid' />
                </div>
                <div className='row mt-3'>
                    <div className='col-lg-12'>
                        <div className="input-container mt-4">
                            <textarea
                                type="text"
                                className="border-input"
                                placeholder='Write here'
                                rows={5}
                            />
                            <label className="border-label">Description</label>
                        </div>
                    </div>
                </div>
                <div className='modalfooterbtn'>
                    <div className='orderItems'>
                        <button className='cancelOrder'>CANCEL</button>
                        <button className='acceptOrder'>ACCEPT</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChefGiveRating