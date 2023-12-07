import React, { useEffect, useState } from "react";
import * as Images from "../../../utilities/images";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { chefLists } from "../../../redux/slices/web";
import ReactPaginate from "react-paginate";

const HomeUser = () => {
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
      <div className="mainBoxOuter">
        <h6 className="headingSub">Chefs Near You </h6>
        <div className="cheffilter flexBox">
          <div className="searchbar me-4">
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Chef near you..."
              type="search"
              className="searchtext"
            />
            <img
              src={Images.searchbar}
              className="searchbarImg"
              alt="searchbar"
            />
          </div>
          <div className="dropdown">
            <span className="chefName">Filter By:</span>
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
                <Link className="dropdown-item" to="#">
                  <span className="filterheading">4</span>
                  <img
                    src={Images.RatingStar}
                    alt="starimg"
                    className="img-fluid ms-1 me-1"
                  />
                  <span className="filterheading">Above Rating</span>
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  <span className="filterheading">5</span>
                  <img
                    src={Images.RatingStar}
                    alt="starimg"
                    className="img-fluid ms-1 me-1"
                  />
                  <span className="filterheading">Rating</span>
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  <span className="filterheading">3</span>
                  <img
                    src={Images.RatingStar}
                    alt="starimg"
                    className="img-fluid ms-1 me-1"
                  />
                  <span className="filterheading">Above Rating</span>
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  <span className="filterheading">3</span>
                  <img
                    src={Images.RatingStar}
                    alt="starimg"
                    className="img-fluid ms-1 me-1"
                  />
                  <span className="filterheading">Above Rating</span>
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  <span className="filterheading">1</span>
                  <img
                    src={Images.RatingStar}
                    alt="starimg"
                    className="img-fluid ms-1 me-1"
                  />
                  <span className="filterheading">Above Rating</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            {chefListData && chefListData.length > 0 ? (
              <>
                {chefListData?.map((item, index) => (
                  <div
                    key={index}
                    className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12"
                  >
                    <div className="outerBox text-center">
                      <figure className="chefDetails mb-3">
                        <Link to={`/chef-details?id=${item._id}`}>
                          <img
                            src={
                              item.userInfo.profilePhoto
                                ? item.userInfo.profilePhoto
                                : Images.UserICon
                            }
                            alt="UserICon"
                            className="img-fluid UserICon"
                          />
                        </Link>
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
                            <i className="las la-star startIcon"></i>
                            {item?.averageRating}
                          </span>
                        </article>
                        <article>
                          <span className="uploadText">
                            {item?.reviewCount} reviews
                          </span>
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

export default HomeUser;
