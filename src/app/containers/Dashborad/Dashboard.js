import React, { useEffect } from "react";
import * as Images from "../../../utilities/images";

const Dashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Banner Section Starts*/}
      <section>
        <div className="foodImg1">
          <img alt="food-img" src={Images.PhotoRoom1} />
        </div>
        <div className="stroke">
          <img alt="line-bg" src={Images.LineBg} />
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="headings">
                <h2 className="orangeHeading">Flavorful Delights</h2>
                <h2 className="blackHeading">
                  Book a Chef and
                  <br /> Order Your Culinary
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
                  <button className="orngButtons me-3  ">
                    <img
                      className="me-3"
                      alt="apple-icon"
                      src={Images.AppleIcon}
                    />
                    <div className="btnInner">
                      <span className="primary">Download on the</span>
                      <br />
                      <span className="secondary">App Store</span>
                    </div>
                  </button>
                  <button className="orngButtons">
                    <img
                      className="me-3"
                      alt="play-store-icon"
                      src={Images.PlayStoreIcon}
                    />
                    <div className="btnInner">
                      <span className="primary">Get it on</span>
                      <br />
                      <span className="secondary">Google Play</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                className="chef"
                alt="chef-image"
                src={Images.chefImageNew}
              />
            </div>
          </div>
        </div>
        <div className="foodImg2">
          <img alt="plate-food" src={Images.PhotoRoom2} />
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
            <div className="col-lg-6">
              <img alt="about-img" src={Images.aboutImg} />
            </div>
            <div className="col-lg-6">
              <h2 className="orange">
                About <span className="black">ServeItLocal</span>
              </h2>
              <p className="secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                sed hendrerit
                <br /> justo, pretium auctor est. Duis finibus, diam sit amet
                vestibulum laoreet,
                <br /> velit orci congue turpis, ac ultrices justo turpis
                placerat turpis. Pellentesque
                <br /> fermentum id sem a gravida. Pellentesque maximus felis
                porttitor purus <br />
                semper porttitor. Proin porttitor enim nisl, a pretium ex
                gravida nec.
                <br /> Suspendisse viverra nisi nec urna fermentum euismod.{" "}
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
          <img alt="burger-img" src={Images.burgerOne} />
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
            <div className="col-lg-4">
              <div className="choose">
                <img alt="chef-logo" src={Images.chefGreatLogo} />
                <h2 className="primary mt-4 pb-2">You Can Book chef</h2>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="choose">
                <img alt="food-order-logo" src={Images.orderFood} />
                <h2 className="primary mt-4 pb-2">You Can Order Food</h2>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="choose">
                <img alt="help-support-logo" src={Images.helpSupport} />
                <h2 className="primary mt-4 pb-2">Easy Help Support</h2>
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
            <div className="col-lg-4">
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
            <div className="col-lg-8 pe-0">
              <div className="video">
                <img alt="video-img" src={Images.videoimg} />
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
            <div className="col-lg-6">
              <div className="text-center">
                <img alt="chef-woman" src={Images.chefWoman} />
              </div>
            </div>
            <div className="col-lg-6">
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
              </p>
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
        <img alt="burger-img" className="image3" src={Images.burgerTwo} />
      </section>
      {/*Ends Different Section*/}

      {/*Starts Download App Section*/}
      <section className="downloadApp">
        <div className="container">
          <div className="custom">
            <div className="pizzaImg ">
              {" "}
              <img alt="pizza-img" src={Images.pizza} />
            </div>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="mobile">
                  <img alt="mobile-logo" src={Images.mobile} />
                </div>
              </div>
              <div className="col-lg-6">
                <h2 className="whiteHeading">
                  Download
                  <br /> Our Mobile App
                </h2>
                <div className="appButtons mt-2">
                  <button className="blackButtons me-3 ">
                    <img
                      className="me-3"
                      alt="apple-icon"
                      src={Images.AppleIcon}
                    />
                    <div
                      className="btnInner
                     "
                    >
                      <span className="primary">Download on the</span>
                      <br />
                      <span className="secondary">App Store</span>
                    </div>
                  </button>
                  <button className="blackButtons">
                    <img
                      className="me-3"
                      alt="play-store"
                      src={Images.PlayStoreIcon}
                    />
                    <div className="btnInner">
                      <span className="primary">Get it on</span>
                      <br />
                      <span className="secondary">Google Play</span>
                    </div>
                  </button>
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
