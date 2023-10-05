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
            <p className='overallTxt ps-2'>Overall</p>
          </div>
          <img src={Images.ratingAndReview} className='RatingImg_' />
        </div>

        <div className='flexBox justify-content-between pt-3'>
          <p className='rateAll'>All</p>
          <div className='StarRating_'>
            <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
            <span className='rating ps-2'>5</span>
          </div>
          <div className='StarRating_'>
            <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
            <span className='rating ps-2'>4</span>
          </div>
          <div className='StarRating_'>
            <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
            <span className='rating ps-2'>3</span>
          </div>
          <div className='StarRating_'>
            <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
            <span className='rating ps-2'>2</span>
          </div>
        </div>
        <div className='modalscroll'>
          <div className='chefrateimg'>
            <img src={Images.UserProfileRate} alt='userrating' className='img-fluid' />
            <div className='reviewrating'>
              <div className='chefreviews'>
                <div className='venuInfo'>Alejandro Hagenes</div>
                <div className='cheftext'>2 days ago</div>
              </div>
              <div className='ratingimgmodal'>
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.LightStar} alt='userrating' className='img-fluid' />
              </div>
              <div className='userreviews mt-2'>
                <p className='cheftext '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
              </div>
            </div>
          </div>
          <div className='chefrateimg'>
            <img src={Images.UserProfileRate} alt='userrating' className='img-fluid' />
            <div className='reviewrating'>
              <div className='chefreviews'>
                <div className='venuInfo'>Alejandro Hagenes</div>
                <div className='cheftext'>2 days ago</div>
              </div>
              <div className='ratingimgmodal'>
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.LightStar} alt='userrating' className='img-fluid' />
              </div>
              <div className='userreviews mt-2'>
                <p className='cheftext '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
              </div>
            </div>
          </div>
          <div className='chefrateimg'>
            <img src={Images.UserProfileRate} alt='userrating' className='img-fluid' />
            <div className='reviewrating'>
              <div className='chefreviews'>
                <div className='venuInfo'>Alejandro Hagenes</div>
                <div className='cheftext'>2 days ago</div>
              </div>
              <div className='ratingimgmodal'>
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.LightStar} alt='userrating' className='img-fluid' />
              </div>
              <div className='userreviews mt-2'>
                <p className='cheftext '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
              </div>
            </div>
          </div>
          <div className='chefrateimg'>
            <img src={Images.UserProfileRate} alt='userrating' className='img-fluid' />
            <div className='reviewrating'>
              <div className='chefreviews'>
                <div className='venuInfo'>Alejandro Hagenes</div>
                <div className='cheftext'>2 days ago</div>
              </div>
              <div className='ratingimgmodal'>
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.RatingStar} alt='userrating' className='img-fluid' />
                <img src={Images.LightStar} alt='userrating' className='img-fluid' />
              </div>
              <div className='userreviews mt-2'>
                <p className='cheftext '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RatingReviewsModal