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
  const [search, setSearch] = useState("");

  // get all chef lists
  useEffect(() => {
    getChefList();
  }, [search]);

  const getChefList = (page = currentPage) => {
    let params = {
      page: page,
      limit: 12,
      address: search,
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
      <div className="mainBoxOuter userchefhome">
        <div className="cheffilter flexBox">
          <div className="searchbar me-4">
            <input
              onChange={(e) => setSearch(e.target.value)}
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
          {/* <OwlCarousel
            className="owl-theme"
            loop={true}
            margin={10}
            nav
            dots={false}
            autoWidth={true}
          >
            <div className="chefslidermain active manageimg">
              <h6 className="sliderheading ">All</h6>
            </div>
            <div className="chefslidermain manageimg">
              <h6 className="sliderheading">Butcher Chef</h6>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <h6 className="sliderheading">Chef-Owner</h6>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <h6 className="sliderheading">Commis Chef</h6>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <h6 className="sliderheading">Executive Chef</h6>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <h6 className="sliderheading">Fish Chef</h6>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <h6 className="sliderheading">Fry Chef</h6>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <h6 className="sliderheading">Grill Chef</h6>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <h6 className="sliderheading">Head Chef</h6>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <h6 className="sliderheading">Meat Chef</h6>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <h6 className="sliderheading">Fish Chef</h6>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <h6 className="sliderheading">Fry Chef</h6>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <h6 className="sliderheading">Grill Chef</h6>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <h6 className="sliderheading">Head Chef</h6>
              </div>
            </div>
            <div className="item">
              <div className="chefslidermain manageimg">
                <h6 className="sliderheading">Meat Chef</h6>
              </div>
            </div>
          </OwlCarousel> */}
          <div className="row mt-3">
            {chefListData && chefListData.length > 0 ? (
              <>
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
              </>
            ) : (
              <p>No data found</p>
            )}
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