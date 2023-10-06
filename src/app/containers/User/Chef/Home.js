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
         <div className="cheffilter flexBox">
            <p className="chefName">Filter By:</p>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="filterheading">4</span><img src={Images.RatingStar} alt="starimg" className="img-fluid ms-1 me-1"/><span className="filterheading">Above Rating</span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#"><span className="filterheading">4</span><img src={Images.RatingStar} alt="starimg" className="img-fluid ms-1 me-1"/><span className="filterheading">Above Rating</span></a></li>
                <li><a class="dropdown-item" href="#"><span className="filterheading">5</span><img src={Images.RatingStar} alt="starimg" className="img-fluid ms-1 me-1"/><span className="filterheading">Rating</span></a></li>
                <li><a class="dropdown-item" href="#"><span className="filterheading">3</span><img src={Images.RatingStar} alt="starimg" className="img-fluid ms-1 me-1"/><span className="filterheading">Above Rating</span></a></li>
                <li><a class="dropdown-item" href="#"><span className="filterheading">3</span><img src={Images.RatingStar} alt="starimg" className="img-fluid ms-1 me-1"/><span className="filterheading">Above Rating</span></a></li>
                <li><a class="dropdown-item" href="#"><span className="filterheading">1</span><img src={Images.RatingStar} alt="starimg" className="img-fluid ms-1 me-1"/><span className="filterheading">Above Rating</span></a></li>
              </ul>
          </div>
        </div> 
        <div className="container-fluid">
          <OwlCarousel className='owl-theme'
            loop={true}
            margin={10} 
            nav
            dots={false}
            // autoplay={true}
            // autoplayTimeout={1000}
            autoWidth={true}
          >
            <div className="chefslidermain active manageimg">
              <p className="sliderheading ">All</p>
            </div>
            <div className="chefslidermain manageimg">
              <p className="sliderheading">Butcher Chef</p>
            </div>
            <div class='item'>
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Chef-Owner</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Commis Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Executive Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Fish Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Fry Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Grill Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Head Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Meat Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Fish Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Fry Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Grill Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Head Chef</p>
              </div>
            </div>
            <div class='item'>
              <div className="chefslidermain manageimg">
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
