import React from 'react'
import * as Images from "../../../../utilities/images"
import ReactStars from "react-rating-stars-component";


const ChefGiveRating = () => {
    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
       
    return (
        <>
            <div className='giveratesection'>
                <p className='venuInfo mt-4'>Rating</p>
                {/* <div className='ratingimgmodal mt-2'>
                    <img src={Images.star} alt='userrating' className='img-fluid' />
                    <img src={Images.star} alt='userrating' className='img-fluid' />
                    <img src={Images.star} alt='userrating' className='img-fluid' />
                    <img src={Images.star} alt='userrating' className='img-fluid' />
                    <img src={Images.LargeStar} alt='userrating' className='img-fluid' />
                </div> */}
                <ReactStars
    count={5}
    onChange={ratingChanged}
    size={28}
    color="#FFE69C"
    isHalf={true}
    emptyIcon={<i className="far fa-star"></i>}
    halfIcon={<i className="fa fa-star-half-alt"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#FFC107"
  />
                <div className='row mt-2'>
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