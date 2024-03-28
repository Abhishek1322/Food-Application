import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Images from "../../../utilities/images";
import { chefLists } from "../../../redux/slices/web";
import { useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import CartFoodModalOrder from "../../components/common/shared/CartFoodModalOrder";
import CustomModal from "../../components/common/shared/CustomModal";
import { FadeLoader } from "react-spinners";

const MenuDetails = () => {
  const dispatch = useDispatch();
  const [menuList, setMenuList] = useState([]);
  const [search, setSearch] = useState("");
  const [menuId, setMenuId] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [key, setKey] = useState(Math.random());
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  // get the menu list
  useEffect(() => {
    setIsLoading(true);
    let params = {
      page: currentPage,
      limit: 12,
      search: search,
    };
    dispatch(
      chefLists({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setIsLoading(false);
            setMenuList(res.data.data.menuList.data);
            setPageCount(res.data.data.userList.total_pages);
          }
        },
      })
    );
  }, [search, currentPage]);

  // Page change handler
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  //closeModal
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };

  // open modal
  const handleOpenModal = (flag, id) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
    setMenuId(id);
  };

  return (
    <>
      <div className="mainBoxOuter">
        <div className="cheffilter flexBox">
          <div className="searchbar me-4">
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              type="text"
              className="searchtext search-only-chef"
            />
            <img
              src={Images.searchbar}
              className="searchbarImg"
              alt="searchbar"
            />
          </div>
        </div>
        <div className="container-fluid">
          {isLoading ? (
            <div className="good-loader">
              <FadeLoader
                color={"#E65C00"}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : (
            <div className="sarahsmenu">
              <div className="row">
                {menuList && menuList?.length > 0 ? (
                  <>
                    {menuList?.map((item, index) => (
                      <div key={index} className="col-lg-2 col-md-4 col-sm-6">
                        <div
                          onClick={() => {
                            handleOpenModal("orderModal", item?._id);
                          }}
                          className="menu-list"
                        >
                          <div className="menu_Items">
                            <div className="innerItems_">
                              <img
                                src={Images.ItemsBgMenu}
                                alt="logo"
                                className="bgmenuImg_"
                              />
                              <img
                                src={
                                  item?.image ? item?.image : Images.SaladImg
                                }
                                alt="logo"
                                className="menuItem_ cursorPoint"
                              />
                            </div>
                          </div>
                          <h6 className="itemIs_">
                            {item?.name.slice(0, 13)}{" "}
                            {item?.name.length > 13 && <span>...</span>}
                          </h6>
                          <h6 className="category_">{item?.category}</h6>
                          <div className="sarahmenuprice">
                            <button className="itemsPrice_ " type="button">
                              £ {item?.price}
                            </button>
                          </div>
                          <h1 className="food-by-chef">
                            <span>By: </span>
                            {item?.userId?.userInfo?.firstName}{" "}
                            {item?.userId?.userInfo?.lastName.slice(0, 8)}
                            {item?.userId?.userInfo?.lastName.length > 8 && (
                              <span>...</span>
                            )}
                          </h1>
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
          )}
        </div>
        {menuList && menuList.length > 0 && (
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
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "orderModal" ? "commonWidth customContent" : ""
        }
        ids={modalDetail.flag === "orderModal" ? "CartFoodOrderModal" : ""}
        child={
          modalDetail.flag === "orderModal" ? (
            <CartFoodModalOrder
              menuId={menuId}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "orderModal" ? (
            <p onClick={handleOnCloseModal} className="modal_cancel">
              <img
                src={Images.modalCancel}
                className="ModalCancel"
                alt="modalcancelimg"
              />
            </p>
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default MenuDetails;
