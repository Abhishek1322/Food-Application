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
          <h6 className="headingSub">Chefs Near You</h6>
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
