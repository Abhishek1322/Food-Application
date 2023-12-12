import React, { useState, useEffect, useCallback } from "react";
import { db, storage } from "../../../../config/firebase-config";
import {
  collection,
  query,
  limit,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import * as Images from "../../../../utilities/images";
import { useAuthSelector } from "../../../../redux/selector/auth";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { chefProfileDocument } from "../../../../redux/slices/auth";
import { useDispatch } from "react-redux";
import { ref, uploadBytes } from "@firebase/storage";
import { getUserProfileDetails } from "../../../../redux/slices/web";

const ChatnextModal = ({ chefId }) => {
  const authData = useAuthSelector();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const [imageUrl, setImgUrl] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  console.log("messagesmessages", messages);
  console.log("authDataauthData", authData);

  //   get all messages
  useEffect(() => {
    const q = query(
      collection(db, `chats/${authData?.userInfo?.id}-${chefId}/messages`)
    );
    const data = onSnapshot(
      q,
      (QuerySnapshot) => {
        let messages = [];
        QuerySnapshot.forEach((doc) => {
          messages.push({ ...doc.data() });
        });
        console.log("messagesmessageszzzzzz", messages);
        setMessages(messages);
      },
      (error) => {
        console.log("ErrorMsssss", error);
      }
    );
    return () => data;
  }, []);

  const messagesRef = collection(
    db,
    `chats/${authData?.userInfo?.id}-${chefId}/messages`
  );

  // send new messages
  const handleSendMessage = async (e) => {
    if (!msg || msg === "") {
      return;
    }
    const senderName =
      authData?.userInfo?.userInfo?.firstName +
      " " +
      authData?.userInfo?.userInfo?.lastName;

    await addDoc(
      messagesRef,
      {
        deletedChatUserIds: [],
        lastMessage: {
          createdAt: serverTimestamp(),
          senderId: authData?.userInfo?.id,
          text: msg,
        },
        roomId: `${authData?.userInfo?.id}-${chefId}`,
        unseenMessageCount: 0,
        user1: {
          email: authData?.userInfo?.email,
          fcmToken: "",
          full_name: senderName,
          id: chefId,
          onlineStatus: 1,
          profile_image: profilePhoto?.userInfo?.profilePhoto,
        },
        users: [chefId],
      },
      setMsg("")
    );
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

  // send image msg
  const handleUpload = async () => {
    if (!img) {
      console.error("No file selected");
      return;
    }
    const storagePath = `chats/0-0/${img.name}`;
    const storageRef = ref(storage, storagePath);
    try {
      await uploadBytes(storageRef, img);
      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

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
                    <p className="chat_Text">{message?.lastMessage?.text}</p>
                  </div>
                  <div className="chefchat_detail">
                    <p className="chatTime_ m-0 pe-2 ">
                      2.00 pm
                    </p>
                    <p className="chatUser m-0 pe-1">You</p>
                    <img
                      src={
                        message?.user1?.profile_image
                          ? message?.user1?.profile_image
                          : Images.dummyProfile
                      }
                      alt="profile"
                      className="chatnextImg"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="chatSearchHere_">
              {imageUrl ? (
                <img alt="upload-img" src={imageUrl} />
              ) : (
                <div className="d-flex">
                  <textarea
                    className="chatSearchere_"
                    type="text"
                    placeholder="Type Something..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  />
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <img
                      src={Images.chatgalleryImg}
                      alt="chatGallerImg"
                      className="gallerImg infoimg"
                    />
                  </div>
                </div>
              )}
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
