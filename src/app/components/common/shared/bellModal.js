import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import ReportchatDropModal from "./reportchatDropModal";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";
import { useAuthSelector } from "../../../../redux/selector/auth";
import ChatWithChefModal from "./chatWithChefModal";

const BellModal = () => {
  const authData = useAuthSelector();
  const room_id = authData?.userInfo?.id;
  const [key, setKey] = useState(Math.random());
  const [allChats, setAllChats] = useState([]);
  const [userId, setUserId] = useState();
  const [profile, setProfile] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

  //close Modal
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
    setUserId(id);
  };

  // get all conversations
  useEffect(() => {
    handleGetAllChats();
  }, [searchTerm]);

  // get all chats
  const handleGetAllChats = () => {
    const allMessageQuery = query(collection(db, "chats"));
    onSnapshot(allMessageQuery, (snap) => {
      const messagesList = snap.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });
      const reversedMessagesList = messagesList.slice().reverse();
      const getMyChats = reversedMessagesList?.filter((item, index) => {
        return item?.id?.includes(room_id);
      });
      setAllChats(getMyChats);
    });
  };

  // convert time in UTC to local time
  const convertTimeFormat = (nanoseconds, seconds) => {
    const timestamp = new Date(seconds * 1000 + nanoseconds / 1000000);
    const formattedTime = timestamp.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedTime;
  };

  // get profile info
  const handleChefProfle = (data) => {
    setProfile(data);
  };

  // search on chats
  const filteredChats = allChats.filter((item) => {
    const fullName = item?.user1?.full_name.toLowerCase();
    const text = item?.lastMessage?.text.toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || text.includes(search);
  });
  return (
    <>
      <div className="modalContent">
        <div className="searchbar">
          <input
            type="search"
            placeholder="Search chats..."
            className="searchtext"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src={Images.searchbar}
            className="searchbarImg"
            alt="searchbar"
          />
        </div>
        <div className="modalscroll">
          {filteredChats && filteredChats.length > 0 ? (
            <>
              {filteredChats?.map((item, index) => (
                <div
                  key={index}
                  className="chatModal"
                  onClick={() => {
                    handleOpenModal("chatBell", item?.user1?.id);
                  }}
                >
                  <img
                    src={
                      item?.user1?.profile_image
                        ? item?.user1?.profile_image
                        : Images?.dummyProfile
                    }
                    className="userprofile"
                    alt="cartImg"
                  />
                  <div className="innermodal">
                    <p className="chefName">{item?.user1?.full_name}</p>
                    <p className="cheftext">{item?.lastMessage?.text}</p>
                    <p className="chatTime">
                      {convertTimeFormat(
                        item?.lastMessage?.createdAt?.nanoseconds,
                        item?.lastMessage?.createdAt?.seconds
                      )}
                    </p>
                    <span className="modalChatmsg">2</span>
                  </div>
                  <div className="mt-3 me-3">
                    <img src={Images.chatsDots} className="" alt="cartcancel" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No Chats Found</p>
          )}
        </div>
      </div>
      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={false}
        isRightSideModal={true}
        mediumWidth={false}
        className={
          modalDetail.flag === "chatBell " ? "commonWidth customContent" : ""
        }
        ids={
          modalDetail.flag === "reportchatD"
            ? "chatbellSection"
            : modalDetail.flag === "chatBell"
            ? "chatbellSection"
            : ""
        }
        child={
          modalDetail.flag === "chatBell" ? (
            <ChatWithChefModal
              orderDetails={userId}
              handleChefProfle={handleChefProfle}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "reportchatD" ? (
            <ReportchatDropModal close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "chatBell" ? (
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
                    profile?.userInfo?.profilePhoto
                      ? profile?.userInfo?.profilePhoto
                      : Images.dummyProfile
                  }
                  alt="logo"
                  className="img-fluid  headerImg_"
                />
                <div className="headerProfile">
                  <p className="headerTxt_">
                    {profile?.userInfo?.firstName} {profile?.userInfo?.lastName}
                  </p>
                  <p className="headerInner_">Online</p>
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
                      alt="modalHeaderImg"
                    />
                  </button>
                  <ul
                    className="dropdown-menu chatmenu_"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <div
                      className=" chatnext_ flexBox"
                      onClick={() => {
                        handleOpenModal("reportchatD");
                      }}
                    >
                      <img
                        src={Images.reportchatIcon}
                        className=" img-fluid reporticon_"
                        alt="reportchatImg"
                      />
                      <p className="reportchattxt_ m-0 ps-2">Report Chat</p>
                    </div>
                  </ul>
                </div>
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

export default BellModal;
