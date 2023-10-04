import React from "react";
import * as Images from "../../../../utilities/images";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const UserChefHome = () => {
  const slides = Array(15)
    .join()
    .split(",")
    .map(
      function (a) {
        return this.i++;
      },
      { i: 1 }
    );

  return (
    <>
      <div className="mainBoxOuter">
        <div className="cheffilter">
          <div className="chefiltersub">
            <p className="chefName">Filter By:</p>
            <select className="slideselectbox" required="">
              <option value="">4 <img src={Images.RatingStar} alt="starimg" className="img-fluid" /></option>
              <option>Category1</option>
              <option>Category2</option>
            </select>
          </div>
        </div>
        <div className="container-fluid">
          <OwlCarousel className='owl-theme'
            loop={true}
            margin={15} nav
            dots={false}
            autoWidth={true}
          >
              <div className="chefslidermain active">
                <p className="sliderheading">All</p>
              </div>
              <div className="chefslidermain">
                <p className="sliderheading">Butcher Chef</p>
              </div>
            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Chef-Owner</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Commis Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Executive Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Fish Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Fish Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Fish Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Fish Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Fish Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Fish Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Fish Chef</p>
              </div>
            </div>

            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Fry Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Grill Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Head Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain">
                <p className="sliderheading">Meat Chef</p>
              </div>
            </div>



          </OwlCarousel>

          <div className="row">
            {slides &&
              slides.map((val, i) => {
                return (
                  <div className="col-lg-2">
                    <div className="outerBox text-center">
                      <figure className="chefDetails mb-3">
                        <img
                          src={Images.UserICon}
                          alt="UserICon"
                          className="img-fluid UserICon"
                        />
                      </figure>
                      <h6 className="smallHeading">Sarah Bergstrom</h6>
                      <button className="expBtn" type="button">
                        15+ Year Exp.
                      </button>
                      <div className="flexBox justify-content-between mt-3">
                        <article className="ratingBox">
                          <span className="coloredText">
                            <i class="las la-star startIcon"></i>4.5
                          </span>
                        </article>
                        <article>
                          <span className="uploadText">845 reviews</span>
                        </article>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserChefHome;
