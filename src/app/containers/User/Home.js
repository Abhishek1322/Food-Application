import React, { useEffect, useState } from "react";
import * as Images from "../../../utilities/images";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { chefLists } from "../../../redux/slices/web";
import ReactPaginate from "react-paginate";
import FadeLoader from "react-spinners/FadeLoader";
import { useWebSelector } from "../../../redux/selector/web";
import { useUserSelector } from "../../../redux/selector/user";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getExpertise } from "../../../redux/slices/auth";

const HomeUser = () => {
  const dispatch = useDispatch();
  const webSelector = useWebSelector();
  const userSelector = useUserSelector();
  const { currentLocation } = userSelector;
  const [chefListData, setChefListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState("");
  const [search, setSearch] = useState("");
  const [experticeList, setExperticeList] = useState([]);
  const [expertice, setExpertice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterChefByRating, setFilterChefByRating] = useState("");
  const [chefType, setChefType] = useState("");
  console.log("home");
  const icon = <RadioButtonUncheckedIcon fontSize="small" />;
  const checkedIcon = (
    <CheckCircleIcon style={{ color: "#E65C00" }} fontSize="small" />
  );

  // get all chef lists
  useEffect(() => {
    getChefList();
  }, [search, filterChefByRating, currentLocation, expertice, chefType]);

  // get all chef lists
  const getChefList = (page = currentPage) => {
    let params = {
      page: page,
      limit: 12,
      address: search,
      rating: filterChefByRating,
      lat: currentLocation?.lat,
      long: currentLocation?.lng,
      foodType: expertice,
      type: chefType,
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

  // get expertice values
  useEffect(() => {
    dispatch(
      getExpertise({
        cb(res) {
          if (res?.status === 200) {
            const alphOrder = res.data.data.data?.sort((a, b) =>
              a?.title?.localeCompare(b?.title)
            );
            setExperticeList(alphOrder);
          }
        },
      })
    );
  }, []);

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
          <h6 className="headingSub">Chefs Near You</h6>
          <div className="cheffilter flexBox">
            <div className="searchbar me-4">
              <input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Chef near you..."
                type="text"
                className="searchtext search-only-chef"
              />
              <img
                src={Images.searchbar}
                className="searchbarImg"
                alt="searchbar"
              />
            </div>
            <div className="dropdown">
              <span className="chefName">Chef Type:</span>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="filterheading text-capitalize">
                  {chefType || "Select Type"}
                </span>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link
                    onClick={() => setChefType("restaurant")}
                    className="dropdown-item"
                    to="#"
                  >
                    <img
                      src={Images.sarahcap}
                      alt="starimg"
                      className="img-fluid chef-type-img"
                    />

                    <span className="filterheading">Restaurant</span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setChefType("home")}
                    className="dropdown-item"
                    to="#"
                  >
                    <img
                      src={Images.sarahcap}
                      alt="starimg"
                      className="img-fluid chef-type-img"
                    />
                    <span className="filterheading">Home</span>
                  </Link>
                </li>
                {chefType && (
                  <li>
                    <Link
                      onClick={() => setChefType("")}
                      className="dropdown-item text-center d-flex align-items-center gap-2"
                      to="#"
                    >
                      <i className="fa fa-ban none-of-these ms-1"></i>

                      <span className="filterheading ms-2">None of these</span>
                    </Link>
                  </li>
                )}
              </ul>
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
                <span className="filterheading">Above rating</span>
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
                    <span className="filterheading">Above rating</span>
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
                    <span className="filterheading">Above rating</span>
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
                    <span className="filterheading">Above rating</span>
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
                    <span className="filterheading">Above rating</span>
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
                    <span className="filterheading">Above rating</span>
                  </Link>
                </li>
                {filterChefByRating && (
                  <li>
                    <Link
                      onClick={(e) => handleFilterChefByRating(e, "")}
                      className="dropdown-item text-center d-flex align-items-center gap-2"
                      to="#"
                    >
                      <i className="fa fa-ban none-of-these"></i>
                      <span className="filterheading">None of these</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="recipe-lists select-expertise-outer hometype_">
              <span className="chefName">Cuisine Type :</span>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={experticeList}
                disableCloseOnSelect
                // value={null}
                popupIcon={<KeyboardArrowDownIcon />}
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
                    placeholder={!expertice?.length > 0 && "Select type"}
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
                      className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12"
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
                        <h6 className="smallHeading text-capitalize">
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
                  <div className="noData">
                    <img
                      className="w-100"
                      alt="no data found"
                      src={Images.nocheffound}
                    />
                    <p className="no-chef-found-near">No Chef Found Near You</p>
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

export default HomeUser;
