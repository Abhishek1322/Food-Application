import React, { useEffect } from "react";
import * as Images from "../../../utilities/images";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Banner Section Starts*/}
      <section class="foodDetails">
        <div className="foodImg1">
          <img alt="food-img" src={Images.PhotoRoom1} className="img-fluid leftHalf" />
        </div>
        <div className="stroke">
          <img  src={Images.LineBg} alt="line-bg" class="img-fluid lineImg"  />
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="headings">
                <h5 className="orangeHeading">Flavorful Delights</h5>
                <h2 className="blackHeading">
                  Book a Chef and
                  <br />
                  Order Your Culinary
                  
                  <br /> Experience Now!
                </h2>
                <p className="greyHeading mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  <br />
                  sed hendrerit justo, pretium auctor est. Duis finibus, diam
                  sit
                  <br />
                  amet vestibulum laoreet.
                </p>
                <div className="appButtons mt-2">
                  <a href="#" className="orngButtons me-3  ">
                    <img
                      className="me-2"
                      alt="apple-icon"
                      src={Images.appStoreOrange}
                    />
                    <img
                      className="me-2 "
                      alt="play-store-icon"
                      src={Images.googleStore}
                    />
                  </a>
                  
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div class="rightImg">
              <img
                className="img-fluid chef"
                alt="chef-image"
                src={Images.chefImageNew}
              />
              </div>
            </div>
          </div>
        </div>
        <div className="foodImg2 position:relative">
              <img src={Images.PhotoRoom2}  alt="plate-food" className="Img-fluid foodHalf" />
              </div>
      </section>
      {/*Banner Section Ends*/}

      {/*Starts About Section*/}
      <section className="about">
        <div className="image1">
          <img className="image1" alt="food-bg" src={Images.foodBgOne} />
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <img className="img-fluid aboutImage" alt="about-img" src={Images.aboutImg} />
            </div>
            <div className="col-lg-6 col-md-6">
              <h2 className="orange">
                About <span className="black">ServeItLocal</span>
              </h2>
              <p className="secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                sed hendrerit
                 justo, pretium auctor est. Duis finibus, diam sit amet
                vestibulum laoreet,
                 velit orci congue turpis, ac ultrices justo turpis
                placerat turpis. Pellentesque
                fermentum id sem a gravida. Pellentesque maximus felis
                porttitor purus
                semper porttitor. Proin porttitor enim nisl, a pretium ex
                gravida nec.
                 Suspendisse viverra nisi nec urna fermentum euismod.{" "}
              </p>{" "}
              <button className="orngButton mt-3">
                <sapn className="sub me-2">Read More</sapn>
                <img alt="right-arrow" src={Images.rightUpArrow} />
              </button>
            </div>
          </div>
        </div>
        <div className="image2">
          <img className="image2" alt="pizza-one" src={Images.pizzaOne} />
        </div>
        <div className="image3">
          <img className="burgerImg" alt="burger-img" src={Images.burgerOne} />
        </div>
      </section>
      {/*Ends About Section*/}

      {/*Starts Why Choose Section*/}
      <section className="whyChoose">
        <div className="container">
          <div className="text-center mt-4">
            <h2 className="orange">
              Why Choose <span className="black">ServeItLocal</span>
            </h2>
            <p className="secondary pb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
            </p>
          </div>
          <div className="row mt-4">
            <div className="col-lg-4 ">
              <div className="choose">
                <img alt="chef-logo" src={Images.chefGreatLogo} className="img-fluid" />
                <h2 className="primary mt-4 pb-4">You Can Book chef</h2>
              </div>
            </div>
            <div className="col-lg-4 ">
              <div className="choose">
                <img alt="food-order-logo" src={Images.orderFood} className="img-fluid" />
                <h2 className="primary mt-4 pb-4">You Can Order Food</h2>
              </div>
            </div>
            <div className="col-lg-4 ">
              <div className="choose">
                <img alt="help-support-logo" className="img-fluid" src={Images.helpSupport} />
                <h2 className="primary mt-4 pb-4">Easy Help Support</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Ends Why Choose Section*/}

      {/*Starts Video Section*/}
      <section className="videoSection">
        <div className="image1">
          <img alt="food-bg" src={Images.foodBgTwo} />
        </div>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-6">
              <div className="mainHeadings">
                <h2 className="blackHeading">
                  Lorem ipsum dolor sit amet ServeItLocal{" "}
                </h2>
                <p className="greyHeading">
                  Lorem ipsum dolor sit amet,consectetur adipiscing
                  elit.Proin,sed hendrerit justo, Lorem ipsum dolor sit
                  amet,consectetur adipiscing elit. Proin sed hendrerit
                  justo,pretium auctor est. Duis finibus.
                </p>
              </div>
            </div>
            <div className="col-lg-7 col-md-6 pe-0">
              <div className="video">
                <img class="img-fluid" src={Images.videoimg}   alt="video-img"/>
              </div>
            </div>
          </div>
        </div>
        <img className="image2" alt="food-bg" src={Images.foodBgThree} />
      </section>
      {/*Ends Video Section*/}

      {/*Starts Different Section*/}
      <section className="whatDifferent ">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="text-center">
                <img alt="chef-woman" src={Images.chefWoman} class="img-fluid chefImages" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div class="different_">
              <h2 className="black">
                What Different to
                <br /> ServeItLocal form
                <br /> Others.
              </h2>
              <p className="greyHeading">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                <br /> sed hendrerit justo, pretium auctor est. Duis finibus,
                diam sit
                <br />
                amet vestibulum laoreet, velit orci congue turpis,.
              </p></div>
              <div className="differentButton">
                <button className="primary me-3 mt-3">
                  <span className="inner me-3">2k+</span>
                  <span className="sub">Our Delicious Food</span>
                </button>
                <button className="primary mt-3">
                  <span className="inner me-3">1k+</span>
                  <span className="sub">Our Super Chefs</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <img alt="food-bg" className="image2" src={Images.foodBgFour} />
        <img alt="burger-img" className="image3 burgerSmall " src={Images.burgerTwo} />
      </section>
      {/*Ends Different Section*/}

      {/*Starts Download App Section*/}
      <section className="downloadApp">
        <div className="container">
          <div className="custom">
            <div className="pizzaImg ">
              {" "}
              <img alt="pizza-img" className="pizzaImage" src={Images.pizza} />
            </div>
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-6">
                <div className="mobile">
                  <img alt="mobile-logo" src={Images.mobile} className="img-fluid mobileImage" />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="appStore_">
                <h2 className="whiteHeading">
                  Download
                  <br /> Our Mobile App
                </h2>
                <div className="appButtons mt-2">
                   <img alt="mobile-logo" src={Images.playStore} className="img-fluid playImage me-1  " />
                   <img alt="mobile-logo" src={Images.appStore} className="img-fluid playImage me-1 " />
                 
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*Ends Download App Section */}
    </>
  );
};

export default Dashboard;
