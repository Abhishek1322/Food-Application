import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { chefLists } from "../../../../redux/slices/web";
import ReactPaginate from "react-paginate";
import { useWebSelector } from "../../../../redux/selector/web";
import { FadeLoader } from "react-spinners";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { getExpertise } from "../../../../redux/slices/auth";

const UserChefHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const webSelector = useWebSelector();
  const [chefListData, setChefListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState("");
  const [search, setSearch] = useState("");
  const [experticeList, setExperticeList] = useState([]);
  const [expertice, setExpertice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterChefByRating, setFilterChefByRating] = useState("");

  const icon = <RadioButtonUncheckedIcon fontSize="small" />;
  const checkedIcon = (
    <CheckCircleIcon style={{ color: "#E65C00" }} fontSize="small" />
  );

  // get expertice values
  useEffect(() => {
    dispatch(
      getExpertise({
        cb(res) {
          if (res?.status === 200) {
            setExperticeList(res?.data?.data?.data);
          }
        },
      })
    );
  }, []);

  // get all chef lists
  useEffect(() => {
    getChefList();
  }, [search, filterChefByRating, expertice]);

  const getChefList = (page = currentPage) => {
    let params = {
      page: page,
      limit: 12,
      // search: search,
      rating: filterChefByRating,
      foodType: expertice,
    };
    dispatch(
      chefLists({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setChefListData(res.data.data.userList.data);
            setPageCount(res.data.data.userList.total_pages);
            setIsLoading(false);
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

  // filter chef by rating
  const handleFilterChefByRating = (e, rating) => {
    e.preventDefault();
    setFilterChefByRating(rating);
  };

  // go menu details page
  const handleGoMenuDetailsPage = () => {
    navigate("/menu-details");
  };

  // get value of expertice
  const handleAutocompleteChange = (event, values) => {
    const getTitle = values?.map((item) => item.title);
    setExpertice(getTitle);
  };

  return (
    <>
      {webSelector?.loading && isLoading ? (
        <div className="good-loader">
          <FadeLoader
            color={"#E65C00"}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="mainBoxOuter chefs-lists">
          <div className="cheffilter flexBox">
            <div className="searchbar me-4">
              <input
                // onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dish or chef name here..."
                type="text"
                className="searchtext"
                onPointerDown={handleGoMenuDetailsPage}
                // onClick={navigate("/menu-details")}
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
                <span className="filterheading">{filterChefByRating}</span>
                <img
                  src={Images.RatingStar}
                  alt="starimg"
                  className="img-fluid ms-1 me-1"
                />
                <span className="filterheading">Above Rating</span>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link
                    onClick={(e) => handleFilterChefByRating(e, "5")}
                    className="dropdown-item"
                    to="#"
                  >
                    <span className="filterheading">5</span>
                    <img
                      src={Images.RatingStar}
                      alt="starimg"
                      className="img-fluid ms-1 me-1"
                    />
                    <span className="filterheading">Above Rating</span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={(e) => handleFilterChefByRating(e, "4")}
                    className="dropdown-item"
                    to="#"
                  >
                    <span className="filterheading">4</span>
                    <img
                      src={Images.RatingStar}
                      alt="starimg"
                      className="img-fluid ms-1 me-1"
                    />
                    <span className="filterheading">Rating</span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={(e) => handleFilterChefByRating(e, "3")}
                    className="dropdown-item"
                    to="#"
                  >
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
                  <Link
                    onClick={(e) => handleFilterChefByRating(e, "2")}
                    className="dropdown-item"
                    to="#"
                  >
                    <span className="filterheading">2</span>
                    <img
                      src={Images.RatingStar}
                      alt="starimg"
                      className="img-fluid ms-1 me-1"
                    />
                    <span className="filterheading">Above Rating</span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={(e) => handleFilterChefByRating(e, "1")}
                    className="dropdown-item"
                    to="#"
                  >
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
            <div className="recipe-lists select-expertise-outer">
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={experticeList}
                disableCloseOnSelect
                // value={null}
                onChange={handleAutocompleteChange}
                getOptionLabel={(option) => option?.title}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={
                      expertice?.length > 0 ? "" : "Search Using Menu"
                    }
                  />
                )}
              />
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              {chefListData && chefListData.length > 0 ? (
                <>
                  {chefListData?.map((item, index) => (
                    <div
                      key={index}
                      className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-12"
                    >
                      <div className="outerBox text-center">
                        <figure className="chefDetails mb-3">
                          <Link to={`/chef-details?id=${item._id}`}>
                            <img
                              src={
                                item.userInfo.profilePhoto
                                  ? item.userInfo.profilePhoto
                                  : Images.dummyProfile
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
                <div className="noDataFoundImage">
                  <div>
                    <img
                      className="w-100"
                      alt="no data found"
                      src={Images.nodataFound}
                    />
                  </div>
                </div>
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
      )}
    </>
  );
};

export default UserChefHome;
