import React from 'react'
import * as Images from "../../../../utilities/images";

const RatingReviewsModal = () => {
  return (
    <>
      <div className='ProfilePageModal'>
        <div className='ratingReviews_ flexBox justify-content-between'>
          <div className='ratingStars'>
            <div className='flexBox'>
              <p className='ratinghere_'>4.8</p>
              <span className='ratingFrom'>/5</span>
            </div>
            <p className='overallTxt'>Overall</p>
          </div>
          <img src={Images.ratingAndReview} className='RatingImg_' />

        </div>
        <div className='flexBox'>
          <p className='rateAll'>All</p>
          <div className='starRating'>
            <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
            <span className='rating ps-2'>5</span>
          </div>
        </div>

      </div>
    </>
  )
}

export default RatingReviewsModal