import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import ReactStars from "react-rating-stars-component";
import moment from "moment";
import { Line } from "rc-progress";

const RatingReviewsModal = ({ allRating, setGetActiveRating }) => {
  const [activeRating, setActiveRating] = useState("All");
  const [ratingProgress, setRatingProgress] = useState({
    fiveStar: "",
    fourStar: "",
    threeStar: "",
    twoStar: "",
    oneStar: "",
  });

  // rating
  const rating = [
    {
      id: 0,
      value: "All",
    },
    {
      id: 1,
      value: "5",
    },
    {
      id: 2,
      value: "4",
    },
    {
      id: 3,
      value: "3",
    },
    {
      id: 4,
      value: "2",
    },
  ];

  // active rating
  const handleActiveRating = (rating) => {
    setActiveRating(rating);
    setGetActiveRating(rating);
  };

  // get rating progress
  useEffect(() => {
    const fiveStar =
      (allRating?.ratingCounts?.fiveRating /
        allRating?.ratingCounts?.totalRating) *
      100;
    const fourStar =
      (allRating?.ratingCounts?.fourRating /
        allRating?.ratingCounts?.totalRating) *
      100;
    const threeRating =
      (allRating?.ratingCounts?.threeRating /
        allRating?.ratingCounts?.totalRating) *
      100;
    const twoRating =
      (allRating?.ratingCounts?.twoRating /
        allRating?.ratingCounts?.totalRating) *
      100;
    const oneRating =
      (allRating?.ratingCounts?.oneRating /
        allRating?.ratingCounts?.totalRating) *
      100;
    setRatingProgress({
      fiveStar: fiveStar,
      fourStar: fourStar,
      threeStar: threeRating,
      twoStar: twoRating,
      oneStar: oneRating,
    });
  }, []);

  return (
    <>
      <div className="ProfilePageModal rating-review-outer">
        <div className="ratingReviews_ rating-review-data">
          <div className="ratingStars">
            <div className="flexBox">
              <p className="ratinghere_">{allRating?.averageRating}</p>
              <span className="ratingFrom">/5</span>
            </div>
            <p className="overallTxt ps-2">Overall</p>
          </div>

          <div className="rating-starts-data">
            <div className="d-flex">
              <div className="rating-starsss">
                <div>
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                </div>
              </div>
              <div className="rating-progress-barrr">
                <Line
                  className="ratingProgressBarNew"
                  percent={ratingProgress?.fiveStar}
                  strokeWidth={8}
                  trailWidth={8}
                  strokeColor={
                    ratingProgress?.fiveStar === 0 ? "#FFE083" : "#FFC107"
                  }
                  trailColor="#FFE083"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="rating-starsss">
                <div>
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                </div>
              </div>
              <div className="rating-progress-barrr">
                <Line
                  className="ratingProgressBarNew"
                  percent={ratingProgress?.fourStar}
                  strokeWidth={8}
                  trailWidth={8}
                  strokeColor={
                    ratingProgress?.fourStar === 0 ? "#FFE083" : "#FFC107"
                  }
                  trailColor="#FFE083"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="rating-starsss">
                <div>
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                </div>
              </div>
              <div className="rating-progress-barrr">
                <Line
                  className="ratingProgressBarNew"
                  percent={ratingProgress?.threeStar}
                  strokeWidth={8}
                  trailWidth={8}
                  strokeColor={
                    ratingProgress?.threeStar === 0 ? "#FFE083" : "#FFC107"
                  }
                  trailColor="#FFE083"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="rating-starsss">
                <div>
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                </div>
              </div>
              <div className="rating-progress-barrr">
                <Line
                  className="ratingProgressBarNew"
                  percent={ratingProgress?.twoStar}
                  strokeWidth={8}
                  trailWidth={8}
                  strokeColor={
                    ratingProgress?.twoStar === 0 ? "#FFE083" : "#FFC107"
                  }
                  trailColor="#FFE083"
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="rating-starsss">
                <div>
                  <img
                    src={Images.singleRating}
                    className="RatingImg_"
                    alt="RatingImg"
                  />
                </div>
              </div>
              <div className="rating-progress-barrr">
                <Line
                  className="ratingProgressBarNew"
                  percent={ratingProgress?.oneStar}
                  strokeWidth={8}
                  trailWidth={8}
                  strokeColor={
                    ratingProgress?.oneStar === 0 ? "#FFE083" : "#FFC107"
                  }
                  trailColor="#FFE083"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flexBox justify-content-between pt-3">
          {rating?.map((item, index) => (
            <div
              onClick={() => handleActiveRating(item?.value)}
              key={index}
              className={
                activeRating === item?.value
                  ? "StarRating_ activeRating"
                  : "StarRating_"
              }
            >
              {item?.value === "All" ? (
                ""
              ) : (
                <img
                  src={Images.RatingStar}
                  alt="userrating"
                  className="img-fluid"
                />
              )}
              <span
                className={item?.value === "All" ? "rating" : "rating ps-2"}
              >
                {item?.value}
              </span>
            </div>
          ))}
        </div>
        <div className="modalscroll">
          {allRating && allRating?.details?.data.length > 0 ? (
            <>
              {allRating?.details?.data?.map((item, index) => (
                <>
                  <div key={index} className="chefrateimg">
                    <div className="rating-review-user">
                      <img
                        src={
                          item?.userId?.userInfo?.profilePhoto
                            ? item?.userId?.userInfo?.profilePhoto
                            : Images.dummyProfile
                        }
                        alt="userrating"
                        className="img-fluid"
                      />
                    </div>
                    <div className="reviewrating">
                      <div className="chefreviews">
                        <div className="venuInfo">
                          {item?.userId?.userInfo?.firstName}{" "}
                          {item?.userId?.userInfo?.lastName}
                        </div>
                        <div className="cheftext">
                          {" "}
                          {moment(item?.createdAt).format(
                            "DD-MM-YYYY  HH:mm:ss"
                          )}
                        </div>
                      </div>
                      <div className="ratingimgmodal">
                        <ReactStars
                          count={5}
                          size={20}
                          value={item?.rating}
                          edit={false}
                          color="#FFE69C"
                          isHalf={true}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#FFC107"
                        />
                      </div>
                      <div className="userreviews mt-2">
                        <p className="cheftext ">{item?.review}</p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <p>No rating found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RatingReviewsModal;
