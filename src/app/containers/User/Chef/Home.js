import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { chefLists } from "../../../../redux/slices/web";
import ReactPaginate from "react-paginate";

const UserChefHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chefListData, setChefListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState("");

  // get all chef lists
  useEffect(() => {
    getChefList();
  }, []);

  const getChefList = (page = currentPage) => {
    let params = {
      page: currentPage,
      limit: 12,
      address: "ds",
    };

    dispatch(
      chefLists({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setChefListData(res.data.data.data);
            setPageCount(res.data.data.total_pages);
          }
        },
      })
    );
  };

  // Page change handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    getChefList(selected + 1);
  };

  return (
    <>
      <div className="mainBoxOuter">
        <div className="cheffilter flexBox">
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
        <div className="container-fluid">
          <OwlCarousel
            className="owl-theme"
            loop={true}
            margin={10}
            nav
            dots={false}
            autoWidth={true}
          >
            <div className="chefslidermain active manageimg">
              <p className="sliderheading ">All</p>
            </div>
            <div className="chefslidermain manageimg">
              <p className="sliderheading">Butcher Chef</p>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Chef-Owner</p>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Commis Chef</p>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Executive Chef</p>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Fish Chef</p>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Fry Chef</p>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Grill Chef</p>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Head Chef</p>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Meat Chef</p>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Fish Chef</p>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Fry Chef</p>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Grill Chef</p>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Head Chef</p>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <p className="sliderheading">Meat Chef</p>
              </div>
            </div>
          </OwlCarousel>
          <div className="row">
            {chefListData?.map((item, index) => (
              <div key={index} className="col-lg-2">
                <div className="outerBox text-center">
                  <figure className="chefDetails mb-3">
                    <img
                      src={Images.UserICon}
                      alt="UserICon"
                      className="img-fluid UserICon"
                    />
                  </figure>
                  <h6 className="smallHeading">
                    {item.userInfo.firstName} {item.userInfo.lastName}
                  </h6>
                  <button className="expBtn" type="button">
                    {item.chefInfo.experience} Year Exp.
                  </button>
                  <div className="flexBox justify-content-between mt-3">
                    <article className="ratingBox">
                      <span className="coloredText">
                        <i className="las la-star startIcon"></i>4.5
                      </span>
                    </article>
                    <article>
                      <span className="uploadText">845 reviews</span>
                    </article>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {chefListData && chefListData.length > 0 && (
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            pageCount={pageCount}
            pageRangeDisplayed={2}
            marginPagesDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        )}
      </div>
    </>
  );
};

export default UserChefHome;
