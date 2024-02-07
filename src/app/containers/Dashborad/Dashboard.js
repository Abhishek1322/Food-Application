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
          <img src={Images.LineBg} alt="line-bg" class="img-fluid lineImg" />
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
                  Embark on a global culinary adventure with ServeItLocal, your ultimate gateway to the rich
                  tapestry of local flavors worldwide! Book a skilled chef now and immerse yourself in a
                  unique culinary journey that transcends borders. Our platform is not just a service; it's a
                  movement dedicated to redefining travel experiences through the joy of shared meals.
                  Connect with passionate local chefs who are not only masters of their craft but also
                  storytellers of their culture through food. Join us in exploring, savoring, and connecting with
                  ServeItLocal, where every booking and adventure becomes an opportunity to celebrate the
                  diverse and authentic global flavors.<strong>ServeItLocal: Explore. Savor. Connect.</strong>
                </p>
                <div className="appButtons mt-2">
                  <a href="#" className="orngButtons me-3  ">
                    <img
                      className="appImages  me-2 "
                      alt="apple-icon"
                      src={Images.appStoreOrange}
                    />
                    <img
                      className="appImages  me-2 "
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
          <img src={Images.PhotoRoom2} alt="plate-food" className="Img-fluid foodHalf" />
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
                ServeItLocal is a platform that aims to revolutionize culinary experiences for travelers by
                celebrating the diversity of local cuisines worldwide. The organization was founded by a
                group of friends driven by their shared passion for authentic food and cultural exploration.
                Vision: ServeItLocal envisions a world where every journey becomes a feast, allowing
                travelers to deeply connect with destinations through their local flavors. They believe that
                food serves as a universal language, bringing people together, and seek to create memorable
                experiences beyond just the culinary aspect.{" "}
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
              Why Choose <span className="black">ServeItLocal for Your Culinary Adventure?</span>
            </h2>
            <p className="secondary pb-5">
              ServeItLocal offers a unique and enriching culinary experience, providing curated culinary
              journeys, a global community connection, visionary exploration, empowerment for chefs
              worldwide, authenticity, and cultural immersion. As more than just a platform, it acts as a
              curator of extraordinary culinary experiences, handpicking local chefs who are not only
              masters of their craft but also storytellers of their culture through food. Serving as a global
              culinary passport, ServeItLocal transcends borders, connecting travelers with passionate local
              chefs worldwide. It envisions a world where every journey is a feast, fostering genuine
              connections through the universal language of food. By empowering chefs to showcase their
              expertise globally, ServeItLocal transforms kitchens into cultural hubs, supporting local talent
              and enhancing the global culinary landscape. Join this culinary movement to explore, savor,
              and celebrate the diverse tapestry of global flavors.{" "}
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
                "Embark on a Culinary Journey with ServeItLocal: Explore, Savor, Connect!" {" "}
                </h2>
                <p className="greyHeading">
                  Discover a world of flavors with ServeItLocal! Book a chef, explore diverse cuisines, and
                  create lasting memories through shared meals. Our platform is a global celebration of local
                  culinary experiences, connecting you with passionate chefs who are also cultural storytellers.
                  Join us in redefining travel through exploration, savoring, and connecting with ServeItLocal –
                  where each booking is an opportunity to celebrate the rich tapestry of global flavors. <strong>ServeItLocal: Explore. Savor. Connect.</strong>
                </p>
              </div>
            </div>
            <div className="col-lg-7 col-md-6 pe-0">
              <div className="video">
                <img class="img-fluid" src={Images.videoimg} alt="video-img" />
              </div>
            </div>
          </div>
        </div>
        <img className="image2" alt="food-bg" src={Images.foodBgThree} />
      </section>
      {/*Ends Video Section*/}

      {/*Starts Different Section*/}
      <section className="whatDifferent ">
        <div className="container">
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
                  <br /> ServeItLocal form<br />
                  Others.
                </h2>
                <p className="greyHeading">
                  ServeItLocal stands as a unique culinary platform, seamlessly blending curated culinary
                  experiences, global community connection, visionary exploration, chef empowerment,
                  authenticity, transparency, and a culinary movement:

                </p>
                <p class="greyHeading">ServeItLocal goes beyond transactional interactions, serving as a curator of extraordinary
                    culinary experiences. The platform meticulously selects local chefs who are both masters of
                    their craft and cultural storytellers, ensuring that each culinary encounter is a carefully crafted
                    journey, telling a story, and celebrating local traditions.</p></div>
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
            <div className="container mt-2 mb-3">
              <div className="row">
                <div className="col-lg-12">
                 <div className="diffSec">
                  
                  <p class="greyHeading">Fostering a global community that transcends borders, ServeItLocal connects travelers with
                    passionate local chefs worldwide, providing a unique global culinary passport. This emphasis
                    on community building and cultural exchange distinguishes ServeItLocal as more than just a
                    service but as a movement bringing people together through the universal language of food.</p>
                  <p class="greyHeading">Envisioning a world where every journey is a feast, ServeItLocal allows travelers to immerse
                    themselves in the heart of a community through its flavors. This visionary approach sees food
                    as a universal language that unites people, creating memorable experiences that go beyond
                    just the culinary aspect.</p>
                  <p class="greyHeading">Beyond being a booking platform, ServeItLocal empowers chefs globally, transforming
                    kitchens into cultural hubs. From personalized culinary experiences to connecting with
                    travelers passionate about local flavors, ServeItLocal supports local talent, contributing to the
                    global culinary landscape.</p>
                  <p class="greyHeading">As the gateway to authentic culinary experiences for travelers, ServeItLocal goes beyond the
                    typical tourist experience. It allows users to discover hidden gems, learn from local chefs, and
                    immerse themselves in the flavors of a destination, fostering genuine cultural exchange and
                    lasting memories.</p>
                  <p class="greyHeading">ServeItLocal believes in transparency, providing clear pricing breakdowns for both chefs and
                    travelers. This commitment to openness extends to the quality of experiences, community
                    integrity, and the authenticity of shared flavors, building trust at the core of the platform.</p>

                  <p class="greyHeading">ServeItLocal is not just a platform; it's a movement that aims to bring people together through
                    the universal language of food. Whether you are a chef looking to showcase talents or a
                    traveler seeking authentic experiences, ServeItLocal invites you to join this culinary journey
                    to explore, savor, and celebrate the diverse tapestry of global flavors. In essence, while
                    acknowledging the absence of direct competitors, these distinguishing features solidify
                    ServeItLocal's unique and unparalleled position in the culinary exploration space.</p>
                </div>
                </div>
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
