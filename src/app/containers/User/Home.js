import React from "react";
import * as Images from "../../../utilities/images";

const HomeUser = () => {
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
        <div className="container-fluid">
        <div className="row align-items-center mt-2 mb-2">
        <div className="col-lg-6 col-md-12">
          <h6 className="headingSub">Chefs Near You </h6>
          </div>
          <div className="col-lg-6 col-md-12">
          <div className="cheffilter flexBox">
          <div className="searchbar me-4">
            <input
              placeholder="Search Chef near you..."
              type="search"
              className='searchtext'
            />
            <img src={Images.searchbar} className='searchbarImg' alt='searchbar' />
          </div>
          <p className="chefName">Filter By:</p>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="filterheading">4</span>
              <img
                src={Images.RatingStar}
                alt="starimg"
                className="img-fluid ms-1 me-1"
              />
              <span className="filterheading">Above Rating</span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  <span className="filterheading">4</span>
                  <img
                    src={Images.RatingStar}
                    alt="starimg"
                    className="img-fluid ms-1 me-1"
                  />
                  <span className="filterheading">Above Rating</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <span className="filterheading">5</span>
                  <img
                    src={Images.RatingStar}
                    alt="starimg"
                    className="img-fluid ms-1 me-1"
                  />
                  <span className="filterheading">Rating</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <span className="filterheading">3</span>
                  <img
                    src={Images.RatingStar}
                    alt="starimg"
                    className="img-fluid ms-1 me-1"
                  />
                  <span className="filterheading">Above Rating</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <span className="filterheading">3</span>
                  <img
                    src={Images.RatingStar}
                    alt="starimg"
                    className="img-fluid ms-1 me-1"
                  />
                  <span className="filterheading">Above Rating</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <span className="filterheading">1</span>
                  <img
                    src={Images.RatingStar}
                    alt="starimg"
                    className="img-fluid ms-1 me-1"
                  />
                  <span className="filterheading">Above Rating</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
          </div>
          </div>
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

export default HomeUser;
