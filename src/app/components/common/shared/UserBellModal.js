import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import UserDeleteChat from "./UserDeleteChat";
import ChatnextModal from "./chatnextModal";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, PARENTCOLLECTIONNAME } from "../../../../config/firebase-config";
import { useAuthSelector } from "../../../../redux/selector/auth";
import ReportchatDropModal from "./reportchatDropModal";

const UserBellModal = ({ id }) => {
  const [key, setKey] = useState(Math.random());
  const authData = useAuthSelector();
  const sender_id = authData?.userInfo?.id;
  const [allChats, setAllChats] = useState([]);
  const [userId, setUserId] = useState();
  const [profile, setProfile] = useState([]);
  const [sendRoomId, setSendRoomId] = useState("");
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
  const handleOpenModal = (flag, id, room_id) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
    setUserId(id);
    if (room_id) {
      handleUnseenMessages(room_id);
      setSendRoomId(room_id);
    }
  };

  // get all conversations
  useEffect(() => {
    handleGetAllChats();
  }, [searchTerm]);

  // get all chats
  const handleGetAllChats = () => {
    const allMessageQuery = query(
      collection(db, PARENTCOLLECTIONNAME),
      orderBy("lastMessage.createdAt", "desc")
    );
    onSnapshot(allMessageQuery, (snap) => {
      const messagesList = snap.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });

      // const reversedMessagesList = messagesList.slice().reverse();

      const getMyChats = messagesList?.filter((item, index) => {
        return item?.id?.includes(sender_id);
      });

      let sortedRecords = getMyChats.map((record) => {
        const deletedChatUserIds = record.deletedChatUserIds.filter(
          (item) => item.userId == sender_id
        );
        if (deletedChatUserIds && deletedChatUserIds.length > 0) {
          let sortedDelete = deletedChatUserIds
            .slice()
            .sort((a, b) => b.deletedAt - a.deletedAt);
          return { ...record, sortedRecords: sortedDelete };
        }
        return record;
      });

      let dataSortedFilter = sortedRecords?.filter((val) => {
        if (
          !val?.lastMessage?.createdAt ||
          !val?.sortedRecords ||
          val.sortedRecords.length <= 0
        ) {
          return val;
        } else if (
          val?.lastMessage?.createdAt > val.sortedRecords[0].deletedAt
        ) {
          return val;
        } else {
          return false;
        }
      });
      setAllChats(dataSortedFilter);
    });
  };

  // Convert UTC time to local time
  const convertTimeFormat = (seconds) => {
    const timestamp = new Date(seconds);
    const now = new Date();
    const timeDifferenceInSeconds = Math.floor((now - timestamp) / 1000);
    if (timeDifferenceInSeconds < 5) {
      return "just now";
    }
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    const formattedTime = timestamp.toLocaleTimeString("en-US", options);
    return formattedTime;
  };

  // get profile info
  const handleChefProfle = (data) => {
    setProfile(data);
  };

  // search on chats
  const filteredChats = allChats.filter((item) => {
    const fullName = item?.user2?.full_name.toLowerCase();
    const text = item?.lastMessage?.text?.toLowerCase();
    const search = searchTerm?.toLowerCase();
    return fullName.includes(search) || text.includes(search);
  });

  // clear unseen messages count
  const handleUnseenMessages = async (room_id) => {
    const zeroUnseenCount = allChats?.find((item) => {
      return item?.roomId === room_id;
    });
    const roomDocRef = doc(db, PARENTCOLLECTIONNAME, room_id);
    const roomDocSnapshot = await getDoc(roomDocRef);
    if (roomDocSnapshot.exists()) {
      try {
        await updateDoc(roomDocRef, {
          deletedChatUserIds: [],
          lastMessage: {
            createdAt: zeroUnseenCount?.lastMessage?.createdAt,
            senderId: zeroUnseenCount?.lastMessage?.senderId,
            recieverId: zeroUnseenCount?.lastMessage?.recieverId,
            text: zeroUnseenCount?.lastMessage?.text,
            imageUrl: zeroUnseenCount?.lastMessage?.imageUrl,
          },
          roomId: zeroUnseenCount?.roomId,
          unseenMessageCount: 0,
          user1: {
            email: zeroUnseenCount?.user1?.email,
            fcmToken: zeroUnseenCount?.user1?.fcmToken,
            full_name: zeroUnseenCount?.user1?.full_name,
            id: zeroUnseenCount?.user1?.id,
            onlineStatus: 1,
            profile_image: zeroUnseenCount?.user1?.profile_image,
          },
          user2: {
            email: zeroUnseenCount?.user2?.email,
            fcmToken: zeroUnseenCount?.user2?.fcmToken,
            full_name: zeroUnseenCount?.user2?.full_name,
            id: zeroUnseenCount?.user2?.id,
            onlineStatus: 1,
            profile_image: zeroUnseenCount?.user2?.profile_image,
          },
          users: zeroUnseenCount?.users,
        });
      } catch (error) {
        console.error("Error creating room:", error);
      }
      console.log("Message sent to existing room:", room_id);
    }
  };

  return (
    <>
      <div className="userbellsection modalContent">
        {filteredChats && filteredChats.length > 0 && (
          <div className="searchbar ">
            <input
              type="text"
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
        )}

        <div className="modalscroll">
          {filteredChats && filteredChats.length > 0 ? (
            <>
              {filteredChats?.map((item, index) => (
                <div key={index} className="chatModal">
                  <div
                    onClick={() => {
                      handleOpenModal(
                        "chefchat",
                        item?.user2?.id,
                        item?.roomId
                      );
                    }}
                    className="d-flex align-items-center w-100"
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
                    <div className="all-chat-list">
                      <div>
                        <p className="chefName">{item?.user2?.full_name}</p>
                        <p className="cheftext">{`${
                          item?.lastMessage?.text
                            ? item?.lastMessage?.text
                            : item?.lastMessage?.imageUrl
                            ? "sent a photo"
                            : " "
                        }`}</p>
                        <p className="chatTime">
                          {convertTimeFormat(item?.lastMessage?.createdAt)}
                        </p>
                      </div>
                      {sender_id !== item?.lastMessage?.senderId &&
                      item?.unseenMessageCount > 0 ? (
                        <span className="chat-list-counts">
                          {item?.unseenMessageCount}
                        </span>
                      ) : (
                        ""
                      )}
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
                          onClick={() => {
                            handleOpenModal(
                              "deletechat",
                              item?.user2?.id,
                              item?.roomId
                            );
                          }}
                          className=" chatnext_ flexBox"
                        >
                          <img
                            src={Images.cartDelete}
                            className=" img-fluid reporticon_"
                            alt="reportchatImg"
                          />
                          <p className="reportchattxt_ m-0 ps-2">Delete Chat</p>
                        </div>
                      </ul>
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
                  src={Images.noChatFound}
                />
                <p className="no-data-found">No data found</p>
              </div>
            </div>
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
            ? "chatmessagemodal"
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
          modalDetail.flag === "deletechat" ||
          modalDetail.flag === "clearchat" ? (
            <UserDeleteChat
              sender_id={sender_id}
              allChats={allChats}
              sendRoomId={sendRoomId}
              flag={modalDetail.flag === "deletechat" ? "deleteChat" : ""}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "chefchat" ? (
            <ChatnextModal
              chefId={userId}
              allChats={allChats}
              handleChefProfle={handleChefProfle}
              close={() => handleOnCloseModal()}
            />
          ) : modalDetail.flag === "reportchat" ? (
            <ReportchatDropModal
              id={profile?.id}
              close={() => handleOnCloseModal()}
            />
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
              <div className="Common_header">
                <img
                  onClick={handleOnCloseModal}
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
                onClick={handleOnCloseModal}
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
