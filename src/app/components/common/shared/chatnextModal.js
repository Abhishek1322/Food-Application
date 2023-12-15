import React, { useState, useEffect, useCallback, useRef } from "react";
import { db } from "../../../../config/firebase-config";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
  orderBy,
} from "firebase/firestore";
import * as Images from "../../../../utilities/images";
import { useAuthSelector } from "../../../../redux/selector/auth";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { chefProfileDocument } from "../../../../redux/slices/auth";
import { useDispatch } from "react-redux";
import { getUserProfileDetails } from "../../../../redux/slices/web";

const ChatnextModal = ({ chefId, chefData }) => {
  const authData = useAuthSelector();
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const fcmToken = localStorage.getItem("fcmToken");
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const [imageUrl, setImgUrl] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const room_id = `${authData?.userInfo?.id}-${chefId}`;

  console.log("authDataauthDataauthData", authData);
  console.log("room_idroom_idroom_id", room_id);

  // scroll bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      block: "end",
      inline: "end",
      behavior: "smooth",
    });
  };

  // get all messages
  useEffect(() => {
    const allMessageQuery = query(
      collection(db, "chats", room_id, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(allMessageQuery, (snap) => {
      const messagesList = snap.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });
      const updatedData = messagesList?.map((item, index) => {
        if (item?.image_url === "") {
          const { image_url, ...rest } = item;
          return rest;
        }
        return item;
      });
      console.log("messagesListmessagesList", updatedData);
      setMessages(updatedData);
    });
    return () => unsubscribe();
  }, []);

  console.log("checkkkkkk", room_id);

  // send new messages
  const handleSendMessage = async (e) => {
    if (msg || imageUrl) {
      const senderName =
        authData?.userInfo?.userInfo?.firstName +
        " " +
        authData?.userInfo?.userInfo?.lastName;

      const receiverName =
        chefData?.userInfo?.firstName + " " + chefData?.userInfo?.lastName;
      try {
        const roomDocRef = doc(db, "chats", room_id);
        await setDoc(
          roomDocRef,
          {
            deletedChatUserIds: [],
            lastMessage: {
              createdAt: serverTimestamp(),
              senderId: authData?.userInfo?.id,
              text: msg,
              image_url: imageUrl,
              recieverId: chefId,
            },
            roomId: room_id,
            unseenMessageCount: 0,
            user1: {
              email: authData?.userInfo?.email,
              fcmToken: fcmToken,
              full_name: senderName,
              id: authData?.userInfo?.id,
              onlineStatus: 1,
              profile_image: profilePhoto?.userInfo?.profilePhoto,
            },
            user2: {
              email: "",
              full_name: receiverName,
              id: chefData?._id,
              onlineStatus: 1,
              profile_image: chefData?.userInfo?.profilePhoto,
            },
            users: [authData?.userInfo?.id, chefId],
          },
          setMsg(""),
          setImgUrl(""),
          scrollToBottom()
        );
      } catch (error) {
        console.error("Error creating room:", error);
      }
      const roomDocRef = doc(db, "chats", room_id);
      const roomDocSnapshot = await getDoc(roomDocRef);
      if (roomDocSnapshot.exists()) {
        const messagesCollectionRef = collection(roomDocRef, "messages");
        await addDoc(messagesCollectionRef, {
          createdAt: serverTimestamp(),
          text: msg,
          id: "",
          image_url: imageUrl,
          senderId: authData?.userInfo?.id,
          recieverId: chefId,
        });
        console.log("Message sent to existing room:", room_id);
      } else {
        console.log("Room does not exist with ID:", room_id);
      }
    }
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

  // getting user profile details
  useEffect(() => {
    let params = {
      userid: authData?.userInfo?.id,
    };
    dispatch(
      getUserProfileDetails({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setProfilePhoto(res?.data?.data);
          }
        },
      })
    );
  }, []);

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

  // remove selected image
  const handleRemoveImage = (url) => {
    if (url === imageUrl) {
      setImgUrl("");
    }
  };

  return (
    <>
      <div className="chat-main-content">
        {messages?.map((message, index) => (
          <div
            ref={messagesEndRef}
            key={index}
            className={
              authData?.userInfo?.id === message?.senderId
                ? "chat-right-section"
                : "chat-left-section"
            }
          >
            {console.log("messagemessage", message)}
            <div className="chat-box-left py-2">
              <p className="chat-value">{message?.text}</p>
              <div className="chefchat_detail">
                {authData?.userInfo?.id === message?.senderId ? (
                  <img
                    src={
                      profilePhoto?.userInfo?.profilePhoto
                        ? profilePhoto?.userInfo?.profilePhoto
                        : Images.dummyProfile
                    }
                    alt="profile"
                    className="chatnextImg"
                  />
                ) : (
                  <img
                    src={
                      chefData?.userInfo?.profilePhoto
                        ? chefData?.userInfo?.profilePhoto
                        : Images.dummyProfile
                    }
                    alt="profile"
                    className="chatnextImg"
                  />
                )}
                {authData?.userInfo?.id === message?.senderId ? (
                  <p className="chatUser m-0 pe-1">you</p>
                ) : (
                  <p className="chatUser m-0 pe-1">
                    {chefData?.userInfo?.firstName}{" "}
                    {chefData?.userInfo?.lastName}
                  </p>
                )}

                <p className="chatTime_ m-0 pe-2">
                  {convertTimeFormat(
                    message?.createdAt?.nanoseconds,
                    message?.createdAt?.seconds
                  )}
                </p>
              </div>
              {message?.image_url && (
                <img alt="upload-img" src={message?.image_url} />
              )}
            </div>
          </div>
        ))}
        {imageUrl && (
          <div>
            <img alt="upload-img" src={imageUrl} />
            <i
              onClick={() => handleRemoveImage(imageUrl)}
              className="fa fa-cross"
            ></i>
          </div>
        )}

        <div className="chat-input">
          <textarea
            className=""
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
              <img
                onClick={handleSendMessage}
                src={Images.chatSendImg}
                alt="chatsendImg"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatnextModal;
