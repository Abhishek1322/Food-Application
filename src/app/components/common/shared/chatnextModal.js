import React, { useState, useEffect, useCallback } from "react";
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
  const fcmToken = localStorage.getItem('fcmToken');
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const [imageUrl, setImgUrl] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const room_id = `${authData?.userInfo?.id}-${chefId}`;

  console.log("messagesmessages", messages);
  console.log("room_idroom_idroom_id", room_id);

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
    if (!msg || msg === "") {
      return;
    }
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
          users: [chefId],
        },
        setMsg(""),
        setImgUrl("")
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
      });
      console.log("Message sent to existing room:", room_id);
    } else {
      console.log("Room does not exist with ID:", room_id);
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

  return (
    <>
      <div className="modalContent">
        <div className="modalDetail ">
          <div className="chatnext">
            <div className="left_chatBox">
              <p className="innerchat_">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking layout.
              </p>
              <div className="chefchat_detail">
                <img
                  src={Images.homeProfile}
                  alt="profile"
                  className="chatnextImg"
                />
                <p className="chatUser m-0 ps-1 pe-2">John Smith</p>
                <p className="chatTime_ m-0">2:34 pm</p>
              </div>
            </div>
            <div className="right_chatBox">
              {messages?.map((message, index) => (
                <div className="py-1" key={index}>
                  {console.log("messagemessage", message)}
                  <div className="chatinRight_">
                    <p className="chat_Text">{message?.text}</p>
                  </div>
                  <div className="chefchat_detail">
                    <p className="chatTime_ m-0 pe-2">
                      {convertTimeFormat(
                        message?.createdAt?.nanoseconds,
                        message?.createdAt?.seconds
                      )}
                    </p>
                    <p className="chatUser m-0 pe-1">You</p>
                    <img
                      src={
                        profilePhoto?.userInfo?.profilePhoto
                          ? profilePhoto?.userInfo?.profilePhoto
                          : Images.dummyProfile
                      }
                      alt="profile"
                      className="chatnextImg"
                    />
                    {message?.image_url && (
                      <img alt="upload-img" src={message?.image_url} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {imageUrl && <img alt="upload-img" src={imageUrl} />}
            <div className="chatSearchHere_">
              {console.log("imageUrlimageUrl", imageUrl)}
              <div className="d-flex">
                <textarea
                  className="chatSearchere_"
                  type="text"
                  placeholder="Type Something..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
                {!imageUrl && (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img
                      src={Images.chatgalleryImg}
                      alt="chatGallerImg"
                      className="gallerImg infoimg"
                    />
                  </div>
                )}
              </div>

              <div className="sarahinformation">
                <p className="chatSearchere_ ">
                  Your only able to send photos from gallery
                </p>
              </div>
              <img
                onClick={handleSendMessage}
                src={Images.chatSendImg}
                alt="chatsendImg"
                className="sendImg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatnextModal;
