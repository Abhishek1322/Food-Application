import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { PARENTCOLLECTIONNAME, db } from "../../../config/firebase-config";
import { useAuthSelector } from "../../../redux/selector/auth";
import { resetSuccess } from "../../../redux/slices/user";
import { getSingleChef, onErrorStopLoad } from "../../../redux/slices/web";
import * as Images from "../../../utilities/images";
import AvailableModal from "../../components/common/shared/availableModal";
import CartFoodModal from "../../components/common/shared/CartFoodModal";
import CartFoodModalOrder from "../../components/common/shared/CartFoodModalOrder";
import ChatnextModal from "../../components/common/shared/chatnextModal";
import ChefRating from "../../components/common/shared/ChefRating";
import CustomModal from "../../components/common/shared/CustomModal";
import ReportchatDropModal from "../../components/common/shared/reportchatDropModal";
import UserDeleteChat from "../../components/common/shared/UserDeleteChat";
import ChefDocModal from "../../components/common/shared/ChefDocModal";

const ChefDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { search } = location;
  const authData = useAuthSelector();
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get("id");
  const [menuId, setMenuId] = useState("");
  const [chefData, setChefData] = useState([]);
  const [key, setKey] = useState(Math.random());
  const [allChats, setAllChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  // close loader after page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // get single chef detail
  const handleGetChefDetails = () => {
    setIsLoading(true);
    let params = {
      id: id,
    };
    dispatch(
      getSingleChef({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            setChefData(res?.data?.data);
            setIsLoading(false);
          }
        },
      })
    );
  };

  // get single chef detail
  useEffect(() => {
    const parentCollectionChat = query(collection(db, PARENTCOLLECTIONNAME));
    onSnapshot(parentCollectionChat, (snap) => {
      const messagesList = snap.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });
      const getMyChats = messagesList?.filter((item) => {
        return item?.id?.includes(authData?.userInfo?.id);
      });
      setAllChats(getMyChats);
    });
    handleGetChefDetails();
  }, []);

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
    if (flag === "alreadyExistCart") {
      dispatch(resetSuccess());
    }
  };

  return (
    <>
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
        <div className="chefdetailsection">
          <div className="sarahchef">
            {/* chef data section  */}
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-6 col-12 contentCenter">
                <div className="sarahinfo">
                  <div className="sarahimg">
                    <img
                      src={
                        chefData?.userInfo?.profilePhoto
                          ? chefData?.userInfo?.profilePhoto
                          : Images.dummyProfile
                      }
                      alt="sarahimage"
                      className="sarahImg_"
                    />
                  </div>
                  <div className="saraheading">
                    <h4 className="johnExplorer mb-1 text-capitalize">
                      {chefData?.userInfo?.firstName}{" "}
                      {chefData?.userInfo?.lastName}
                    </h4>
                    <div className="sarahrestro">
                      <div className="restroinfo">
                        <img
                          src={Images.sarahcap}
                          alt="sarahcapimage"
                          className="img-fluid cursorPoint"
                        />
                        <div className="johnchatdetail">
                          <p className="chatDates textUpperHome">
                            {chefData?.chefInfo?.type}
                          </p>
                        </div>
                      </div>
                      <img
                        src={Images.chefType}
                        alt="cheftypeimage"
                        className="infoimg"
                      />
                      <div className="sarahinformation">
                        <p className="chatSearchere_ ">
                          The chef will prepare exquisite dishes at the
                          restaurant and deliver them to the customer's
                          location.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-6 col-12 ">
                <div className="flexBox justify-content-end contentLast">
                  {chefData?.chefInfo?.isAvailable && (
                    <button
                      className="sarahavailablebtn flexBox"
                      type="button"
                      onClick={() => {
                        handleOpenModal("availabilityModal");
                      }}
                    >
                      <img
                        src={Images.TimeSquare}
                        alt="timesquareimage"
                        className="availableimg"
                      />
                      <span className="availableheading">Availability</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      handleOpenModal("chatModal");
                    }}
                    className="sarahmessagebtn flexBox"
                    type="button"
                  >
                    <img
                      src={Images.ChefChat}
                      alt="timesquareimage"
                      className="availableimg"
                    />
                    <span className="availableheading">Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* chef experience section  */}
          <div className="sarahdata">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <h6 className="chefName">Experience</h6>
                <h6 className="chatSearchere_ mt-2">
                  {chefData?.chefInfo?.experience} + Years Exp.
                </h6>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <h6 className="chefName">Rating</h6>
                <div
                  className="chefrating mt-2"
                  onClick={() => {
                    handleOpenModal("ratingchef");
                  }}
                >
                  <i className="las la-star startIcon"></i>
                  <p className="ratingheading">
                    {chefData?.averageRating} ({chefData?.totalReview} Reviews)
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <h6 className="chefName">Address</h6>
                <p className="chatSearchere_ mt-2">
                  {chefData?.chefInfo?.address}
                </p>
              </div>
            </div>
          </div>
          {/* chef bio section  */}
          <div className="sarahbioexpert">
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="d-flex align-items-center gap-3">
                  <h3 className="innerDummyHeading">Bio</h3>
                  <button
                    onClick={() => {
                      handleOpenModal("chefDocModal");
                    }}
                    className="view-doc-btn"
                  >
                    View Document
                  </button>
                </div>
                <p className="dummyText mt-2">{chefData?.chefInfo?.bio}</p>
              </div>

              <div className="col-lg-6 col-md-12">
                <h3 className="innerDummyHeading ">Expertise</h3>
                <div className="chefexpertise mt-2">
                  {chefData?.chefInfo?.expertise &&
                  chefData?.chefInfo?.expertise.length > 0 ? (
                    <>
                      {chefData?.chefInfo?.expertise?.map((item, index) => (
                        <div key={index} className="expertisevalue">
                          <p className="expertheading">{item}</p>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p>No any expertise</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* chef menu section  */}
          <div className="sarahbioexpert">
            <h2 className="innerDummyHeading text-capitalize">
              {" "}
              {chefData?.userInfo?.firstName}’s Menu
            </h2>
            <div className="row">
              {chefData?.menus && chefData?.menus.length > 0 ? (
                <>
                  {chefData?.menus?.map((val, i) => {
                    return (
                      <div key={i} className="col-lg-2 col-md-4 col-sm-6">
                        <div
                          onClick={() => {
                            handleOpenModal("alreadyExistCart", val?._id);
                          }}
                          className="listItems_"
                        >
                          <div className="menu_Items">
                            <div className="innerItems_">
                              <img
                                src={Images.ItemsBgMenu}
                                alt="logo"
                                className="bgmenuImg_"
                              />
                              <img
                                // onClick={() => {
                                //   handleOpenModal("CartFood", val?._id);
                                // }}
                                src={val?.image ? val?.image : Images.SaladImg}
                                alt="logo"
                                className="menuItem_ cursorPoint"
                              />
                            </div>
                          </div>
                          <h6 className="itemIs_">{val?.name}</h6>
                          <h6 className="category_ text-capitalize">
                            {val?.category}
                          </h6>
                          <div className="sarahmenuprice">
                            <button className="itemsPrice_ " type="button">
                              £ {val?.price}.00
                            </button>
                            <div className="sarahbasket">
                              <img
                                src={Images.basketImg}
                                alt="basketimage"
                                className="img-fluid cursorPointCart"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <p>No added any menu</p>
              )}
            </div>
          </div>
        </div>
      )}

      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "availabilityModal"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "availabilityModal"
            ? "availablebtnModal"
            : modalDetail.flag === "CartFood"
            ? "CartModalFood"
            : modalDetail.flag === "ratingchef"
            ? "ratingusermodal"
            : modalDetail.flag === "chefcart"
            ? "usercartmodal"
            : modalDetail.flag === "alreadyExistCart"
            ? "CartFoodOrderModal"
            : modalDetail.flag === "chatModal"
            ? "userchatmodal"
            : modalDetail.flag === "reportchat"
            ? "userchatmodal"
            : modalDetail.flag === "clearchat"
            ? "userchatmodal"
            : modalDetail.flag === "chefDocModal"
            ? "bigSizeModal"
            : ""
        }
        child={
          modalDetail.flag === "availabilityModal" ? (
            <AvailableModal
              chefData={chefData}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "CartFood" ? (
            <CartFoodModal menuId={menuId} close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "ratingchef" ? (
            <ChefRating
              handleGetChefDetails={handleGetChefDetails}
              chefId={id}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "alreadyExistCart" ? (
            <CartFoodModalOrder
              menuId={menuId}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "chatModal" ? (
            <ChatnextModal
              allChats={allChats}
              chefId={id}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "reportchat" ? (
            <ReportchatDropModal id={id} close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "clearchat" ? (
            <UserDeleteChat
              sender_id={authData?.userInfo?.id}
              allChats={allChats}
              sendRoomId={`${authData?.userInfo?.id}-${id}`}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "chefDocModal" ? (
            <ChefDocModal
              chefData={chefData}
              close={() => handleOnCloseModal()}
            />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "availabilityModal" ? (
            <>
              <h2 className="modal_Heading">Availability</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </>
          ) : modalDetail.flag === "CartFood" ? (
            <>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </>
          ) : modalDetail.flag === "ratingchef" ? (
            <>
              <h2 className="modal_Heading">Rating & Reviews</h2>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </>
          ) : modalDetail.flag === "alreadyExistCart" ? (
            <>
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalcancelimg"
                />
              </p>
            </>
          ) : modalDetail.flag === "chatModal" ? (
            <>
              <div className="Common_header">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="logo"
                  className="img-fluid  arrowCommon_"
                />
                <img
                  src={
                    chefData?.userInfo?.profilePhoto
                      ? chefData?.userInfo?.profilePhoto
                      : Images.dummyProfile
                  }
                  alt="logo"
                  className="img-fluid  headerImg_"
                />
                <div className="headerProfile">
                  <h2 className="headerTxt_">
                    {" "}
                    {chefData?.userInfo?.firstName}{" "}
                    {chefData?.userInfo?.lastName}
                  </h2>
                  {/* <h6 className="headerInner_">Online</h6> */}
                </div>
              </div>
              <div className="Dotsheader_">
                <div className="dropdown ">
                  <button
                    className="btn btn-secondary dropdown-toggle modalheaderDot_"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={Images.modalHeader}
                      className=" img-fluid chatreportIcon_"
                      alt="modalheaderimg"
                    />
                  </button>
                  <ul
                    className="dropdown-menu chatdrop"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li
                      className=" chatdroplabel flexBox"
                      onClick={() => {
                        handleOpenModal("reportchat");
                      }}
                    >
                      <img
                        src={Images.reportchatIcon}
                        className=" img-fluid reporticon_"
                        alt="reportchat"
                      />
                      <h1 className="reportchat m-0 ps-2">Report Chat</h1>
                    </li>
                    <li
                      className=" chatdroplabel flexBox"
                      onClick={() => {
                        handleOpenModal("clearchat");
                      }}
                    >
                      <img
                        src={Images.ChatModal}
                        className=" img-fluid reporticon_"
                        alt="clearchat"
                      />
                      <p className="reportchat m-0 ps-2">Clear Chat</p>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : modalDetail.flag === "reportchat" ? (
            <>
              <div className="Common_header gap-2">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="logo"
                  className="img-fluid  arrowCommon_"
                />

                <div className="headerProfile">
                  <h2 className="headerTxt_ mb-0">Report Chat</h2>
                </div>
              </div>
            </>
          ) : modalDetail.flag === "clearchat" ? (
            <>
              <div className="Common_header gap-2">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="logo"
                  className="img-fluid  arrowCommon_"
                />
              </div>
            </>
          ) : modalDetail.flag === "chefDocModal" ? (
            <>
              <div className="d-flex align-items-center justify-content-between w-100 gap-2">
                <div className="headerProfile">
                  <h2 className="headerTxt_ mb-0">Chef Document</h2>
                </div>
                <img
                  onClick={handleOnCloseModal}
                  src={Images.modalCancel}
                  alt="logo"
                  className="img-fluid  ModalCancel"
                />
              </div>
            </>
          ) : (
            ""
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default ChefDetails;
