import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import UserDeleteChat from "./UserDeleteChat";
import ChatnextModal from "./chatnextModal";
import UserReportChat from "./UserReportChat";
import UserClearChat from "./UserClearChat";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../../config/firebase-config";
import { useAuthSelector } from "../../../../redux/selector/auth";

const UserBellModal = () => {
  const [key, setKey] = useState(Math.random());
  const authData = useAuthSelector();
  const sender_id = authData?.userInfo?.id;
  const [allChats, setAllChats] = useState([]);
  console.log("allChatsallChats", allChats);
  const [userId, setUserId] = useState();
  const [profile, setProfile] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });

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
        return item?.id?.includes(sender_id);
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
    const fullName = item?.user2?.full_name.toLowerCase();
    const text = item?.lastMessage?.text.toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || text.includes(search);
  });

  return (
    <>
      <div className="userbellsection modalContent">
        <div className="searchbar ">
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
                    handleOpenModal("chefchat", item?.user1?.id);
                  }}
                >
                  <img
                    src={
                      item?.user2?.profile_image
                        ? item?.user2?.profile_image
                        : Images?.dummyProfile
                    }
                    className="userprofile"
                    alt="cartImg"
                  />
                  <div className="innermodal">
                    <p className="chefName">{item?.user2?.full_name}</p>
                    <p className="cheftext">{item?.lastMessage?.text}</p>
                    <p className="chatTime">
                      {convertTimeFormat(
                        item?.lastMessage?.createdAt?.nanoseconds,
                        item?.lastMessage?.createdAt?.seconds
                      )}
                    </p>
                    {sender_id !== item?.lastMessage?.senderId ? (
                      <span className="modalChatmsg">
                        {item?.unseenMessageCount}
                      </span>
                    ) : (
                      ""
                    )}
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
          modalDetail.flag === "deletechat"
            ? "commonWidth customContent"
            : "chefchat"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "deletechat"
            ? "userchatdelete"
            : modalDetail.flag === "chefchat"
            ? "userchatmodal"
            : modalDetail.flag === "ratingchef"
            ? "ratingusermodal"
            : modalDetail.flag === "chefcart"
            ? "Usercartmodal"
            : modalDetail.flag === "reportchat"
            ? "userreportchat"
            : modalDetail.flag === "clearchat"
            ? "userclearchat"
            : ""
        }
        child={
          modalDetail.flag === "deletechat" ? (
            <UserDeleteChat close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "chefchat" ? (
            <ChatnextModal
              chefId={userId}
              handleChefProfle={handleChefProfle}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "reportchat" ? (
            <UserReportChat close={() => handleOnCloseModal()} />
          ) : modalDetail.flag === "clearchat" ? (
            <UserClearChat close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "deletechat" ? (
            <>
              <img
                onClick={handleOnCloseModal}
                src={Images.backArrowpassword}
                alt="backarrowimage"
                className="img-fluid arrowCommon_"
              />
            </>
          ) : modalDetail.flag === "chefchat" ? (
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
                  <h2 className="headerTxt_">
                    {profile?.userInfo?.firstName} {""}
                    {profile?.userInfo?.lastName}
                  </h2>
                  <h6 className="headerInner_">Online</h6>
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
              <div className="Common_header">
                <img
                  src={Images.backArrowpassword}
                  alt="logo"
                  className="img-fluid  arrowCommon_"
                />
                <p className="headerTxt_ m-0 ps-2">Report Chat</p>
              </div>
            </>
          ) : modalDetail.flag === "clearchat" ? (
            <>
              <img
                src={Images.backArrowpassword}
                alt="backarrowimage"
                className="img-fluid arrowCommon_"
              />
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

export default UserBellModal;
