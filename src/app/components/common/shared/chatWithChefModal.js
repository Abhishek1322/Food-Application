import React, { useState, useEffect, useCallback, useRef } from "react";
import * as Images from "../../../../utilities/images";
import {
  CHILDCOLLECTIONNAME,
  db,
  PARENTCOLLECTIONNAME,
} from "../../../../config/firebase-config";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  setDoc,
  doc,
  getDoc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import {
  chefProfileDocument,
  onErrorStopLoad,
} from "../../../../redux/slices/auth/index.js";
import { useDispatch } from "react-redux";
import { getUserProfileDetails } from "../../../../redux/slices/web";
import { useAuthSelector } from "../../../../redux/selector/auth.js";
import { useWebSelector } from "../../../../redux/selector/web.js";

const ChatWithChefModal = ({ orderDetails, handleChefProfle, close }) => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const webData = useWebSelector();
  const fcmToken = localStorage.getItem("fcmToken");
  const authData = useAuthSelector();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const [imageUrl, setImgUrl] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const ROOM_ID = `${userInfo?.id}-${authData?.userInfo?.id}`;

  // scroll bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current?.scrollIntoView({
        block: "end",
        inline: "end",
        behavior: "smooth",
      });
    }
  };

  // get all parent collection chats
  useEffect(() => {
    const parentCollectionChat = query(collection(db, PARENTCOLLECTIONNAME));
    const unsubscribe = onSnapshot(parentCollectionChat, (snap) => {
      const messagesList = snap.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });
      const getMyChats = messagesList?.filter((item) => {
        return item?.roomId === ROOM_ID;
      });
      getFireStoreData(getMyChats);
      setIsLoading(false);
      scrollToBottom();
    });
    return () => unsubscribe();
  }, [userInfo]);

  // get all messages
  const getFireStoreData = (allChats) => {
    let lastDeletedAt;
    if (
      allChats &&
      allChats.length > 0 &&
      allChats[0].deletedChatUserIds &&
      allChats[0].deletedChatUserIds.length > 0
    ) {
      let lastDeletedAts = allChats[0].deletedChatUserIds.filter(
        (item) => item.userId == authData?.userInfo?.id
      );
      if (lastDeletedAts.length > 0) {
        lastDeletedAts = lastDeletedAts?.sort(
          (a, b) => b.deletedAt - a.deletedAt
        );
        lastDeletedAt = lastDeletedAts[0].deletedAt;
      }
    }

    const allMessageQuery = query(
      collection(db, PARENTCOLLECTIONNAME, ROOM_ID, CHILDCOLLECTIONNAME),
      orderBy("createdAt", "asc")
    );

    onSnapshot(allMessageQuery, (snap) => {
      const messagesList = snap.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });

      let filteredMessages = messagesList;
      if (messagesList && messagesList.length > 0 && lastDeletedAt) {
        filteredMessages = messagesList?.filter(
          (val) => val?.createdAt > Math.floor(lastDeletedAt)
        );
      }
      const updatedData = filteredMessages?.map((item, index) => {
        if (item?.imageUrl === "") {
          const { imageUrl, ...rest } = item;
          return rest;
        }
        return item;
      });

      const removeEmptyTextField = updatedData?.map((item) => {
        if (item?.text === "") {
          const { text, ...rest } = item;
          return rest;
        }
        return item;
      });

      setMessages(removeEmptyTextField);
    });
  };

  // send and update messages
  const handleUpdateMessage = async (e) => {
    e.preventDefault();
    if (msg || imageUrl) {
      setIsLoading(true);
      const senderName =
        authData?.userInfo?.userInfo?.firstName +
        " " +
        authData?.userInfo?.userInfo?.lastName;

      const receiverName =
        userInfo?.userInfo?.firstName + " " + userInfo?.userInfo?.lastName;
      const roomDocRef = doc(db, PARENTCOLLECTIONNAME, ROOM_ID);
      const roomDocSnapshot = await getDoc(roomDocRef);
      const previousUnseenMessageCount =
        roomDocSnapshot.data()?.unseenMessageCount || 0;
      const previousDeletedChatUserIds = roomDocSnapshot.data();
      if (roomDocSnapshot.exists()) {
        const messagesCollectionRef = collection(
          roomDocRef,
          CHILDCOLLECTIONNAME
        );
        await addDoc(
          messagesCollectionRef,
          {
            createdAt: Math.floor(Date.now()),
            text: msg,
            id: "",
            imageUrl: imageUrl,
            senderId: authData?.userInfo?.id,
            recieverId: userInfo?.id,
          },
          setMsg(""),
          setImgUrl(""),
          handleSendWebPushNotification(senderName)
        );
        scrollToBottom();
        try {
          setIsLoading(true);
          const roomDocRef = doc(db, PARENTCOLLECTIONNAME, ROOM_ID);
          await updateDoc(
            roomDocRef,
            {
              clearChat: false,
              deletedChatUserIds:
                previousDeletedChatUserIds?.deletedChatUserIds,
              lastMessage: {
                createdAt: Math.floor(Date.now()),
                senderId: authData?.userInfo?.id,
                recieverId: userInfo?.id,
                text: msg,
                imageUrl: imageUrl,
              },
              roomId: ROOM_ID,
              unseenMessageCount: previousUnseenMessageCount + 1,
              user1: {
                email: userInfo?.email,
                fcmToken: userInfo?.fcmToken ? userInfo?.fcmToken : "",
                full_name: receiverName,
                id: userInfo?.id,
                onlineStatus: 1,
                profile_image: userInfo?.userInfo?.profilePhoto,
              },
              user2: {
                email: authData?.userInfo?.email,
                fcmToken: fcmToken,
                full_name: senderName,
                id: authData?.userInfo?.id,
                onlineStatus: 1,
                profile_image: authData?.userInfo?.userInfo?.profilePhoto,
              },
              users: [authData?.userInfo?.id, userInfo?.id],
            },
            setMsg(""),
            setImgUrl(""),
            handleSendWebPushNotification(senderName)
          );
        } catch (error) {
          console.error("Error creating room:", error);
        } finally {
          setIsLoading(false);
        }
        console.log("Message sent to existing room:", ROOM_ID);
      } else {
        handleSendInitialMessage(senderName, receiverName);
        setIsLoading(false);
      }
    }
  };

  // handle send initial message
  const handleSendInitialMessage = async (senderName, receiverName) => {
    try {
      const roomDocRef = doc(db, PARENTCOLLECTIONNAME, ROOM_ID);
      const messagesCollectionRef = collection(roomDocRef, CHILDCOLLECTIONNAME);
      await setDoc(
        roomDocRef,
        {
          clearChat: false,
          deletedChatUserIds: [],
          lastMessage: {
            createdAt: Math.floor(Date.now()),
            senderId: authData?.userInfo?.id,
            recieverId: userInfo?.id,
            text: msg,
            imageUrl: imageUrl,
          },
          roomId: ROOM_ID,
          unseenMessageCount: 1,
          user1: {
            email: userInfo?.email,
            fcmToken: userInfo?.fcmToken ? userInfo?.fcmToken : "",
            full_name: receiverName,
            id: userInfo?.id,
            onlineStatus: 1,
            profile_image: userInfo?.userInfo?.profilePhoto,
          },
          user2: {
            email: authData?.userInfo?.email,
            fcmToken: fcmToken,
            full_name: senderName,
            id: authData?.userInfo?.id,
            onlineStatus: 1,
            profile_image: authData?.userInfo?.userInfo?.profilePhoto,
          },
          users: [authData?.userInfo?.id, userInfo?.id],
        },
        setMsg(""),
        setImgUrl(""),
        scrollToBottom(),
        handleSendWebPushNotification(senderName)
      );
      await addDoc(messagesCollectionRef, {
        createdAt: Math.floor(Date.now()),
        text: msg,
        id: "",
        imageUrl: imageUrl,
        senderId: authData?.userInfo?.id,
        recieverId: userInfo?.id,
      });
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  // send web push notification
  const handleSendWebPushNotification = async (senderName) => {
    const notificationData = {
      title: senderName,
      body: `${msg ? msg : "sent a photo"}`,
      profile_image: webData?.userProfileData?.data?.userInfo?.profilePhoto,
    };
    const payload = {
      notification: notificationData,
      data: notificationData,
      to: userInfo?.fcmToken,
    };

    await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key= AAAAHRQtGIo:APA91bHfwyhY4cv1HeqaG7rSy9cnIQawy96LWye1SyralUJsoct5iT3NjssbzMPlhnncVGLUqLNGuKqdRFL8-FCCA2mrC65uH-3zrExXscs1nc8tBtbC67ZbsOXoeMdYvtYZ_CZW2Yfa`, // Replace with your Firebase Cloud Messaging Server Key
      },
      body: JSON.stringify(payload),
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

  // validation for upload files
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (
        rejectedFiles.length > 0 &&
        rejectedFiles[0]?.file?.type !== "image/jpeg" &&
        "image/jpg" &&
        "image/png" &&
        "image/svg"
      ) {
        toast.error("Please upload valid image");
        return;
      }
      setImg(acceptedFiles[0]);
      scrollToBottom();
    },
    [img]
  );

  // showing only images
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
      "image/svg": [],
    },
    multiple: false,
  });

  // getting uploaded image url
  useEffect(() => {
    if (img) {
      let params = {
        file: img,
      };
      dispatch(
        chefProfileDocument({
          ...params,
          cb(res) {
            if (res.status === 200) {
              setImgUrl(res.data.data.fileUrl);
            }
          },
        })
      );
    }
  }, [img]);

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // remove selected image
  const handleRemoveImage = (url) => {
    if (url === imageUrl) {
      setImgUrl("");
    }
  };

  // getting user profile details
  useEffect(() => {
    let params = {
      userid: orderDetails?.userId?._id
        ? orderDetails?.userId?._id
        : orderDetails,
    };
    dispatch(
      getUserProfileDetails({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setUserInfo(res?.data?.data);
            if (handleChefProfle !== undefined) {
              handleChefProfle(res?.data?.data);
            }
          }
        },
      })
    );
  }, []);

  return (
    <>
      <div className="chat-main-content-chef">
        {messages && messages.length > 0 ? (
          <>
            {messages?.map((message, index) => (
              <div
                ref={messagesEndRef}
                key={index}
                className={
                  userInfo?.id === message?.senderId
                    ? "chat-left-section"
                    : "chat-right-section"
                }
              >
                <div
                  className={
                    userInfo?.id === message?.senderId
                      ? "chat-box-left py-2"
                      : "chat-box-right py-2"
                  }
                >
                  {message?.text && (
                    <p className="chat-value">{message?.text}</p>
                  )}
                  {message?.imageUrl && (
                    <div className="message-img">
                      <img alt="upload-img" src={message?.imageUrl} />
                    </div>
                  )}
                  <div className="chefchat_detail">
                    {userInfo?.id === message?.senderId ? (
                      <img
                        src={
                          userInfo?.userInfo?.profilePhoto
                            ? userInfo?.userInfo?.profilePhoto
                            : Images.dummyProfile
                        }
                        alt="profile"
                        className="chatnextImg"
                      />
                    ) : (
                      <img
                        src={
                          webData?.userProfileData?.data?.userInfo?.profilePhoto
                            ? webData?.userProfileData?.data?.userInfo
                                ?.profilePhoto
                            : Images.dummyProfile
                        }
                        alt="profile"
                        className="chatnextImg"
                      />
                    )}
                    {userInfo?.id === message?.senderId ? (
                      <p className="chatUser m-0 pe-1">
                        {userInfo?.userInfo?.firstName}{" "}
                        {userInfo?.userInfo?.lastName}
                      </p>
                    ) : (
                      <p className="chatUser m-0 pe-1">You</p>
                    )}

                    <p className="chatTime_ m-0 pe-2">
                      {convertTimeFormat(message?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          ""
        )}
        {imageUrl && (
          <div className="select-image-outer">
            <div className="send-selected-msg">
              <img alt="upload-img" src={imageUrl} />
              <i
                onClick={() => handleRemoveImage(imageUrl)}
                className="fa fa-times cross-icon"
              ></i>
            </div>
          </div>
        )}

        <div className="chat-input">
          <form
            onSubmit={handleUpdateMessage}
            className="d-flex align-items-center justify-space-between"
          >
            <input
              className="chat-input-box"
              type="text"
              placeholder="Type Something..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <div className="d-flex align-items-center justify-content-center gap-2">
              {!imageUrl && (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <img
                    src={Images.chatgalleryImg}
                    alt="chatGallerImg"
                    className=""
                  />
                </div>
              )}
              <div className="chat-send-btn">
                {/* <p className="chatSearchere_">
              Your only able to send photos from gallery
            </p> */}
                {isLoading ? (
                  <span className="spinner-border text-white spinner-border-sm me-1"></span>
                ) : (
                  <button type="submit">
                    <img
                      onClick={handleUpdateMessage}
                      src={Images.chatSendImg}
                      alt="chatsendImg"
                      className=""
                    />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatWithChefModal;
