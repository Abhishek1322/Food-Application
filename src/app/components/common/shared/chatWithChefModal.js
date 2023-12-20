import React, { useState, useEffect, useCallback } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import OrderReadyForDeliverModal from "./orderReadyForDeliverModal.js";
import {
  CHILDCOLLECTIONNAME,
  db,
  messaging,
  PARENTCOLLECTIONNAME,
  VAPID_KEY,
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
import { getToken } from "firebase/messaging";

const ChatWithChefModal = ({ orderDetails, handleChefProfle, close }) => {
  const dispatch = useDispatch();
  const fcmToken = localStorage.getItem("fcmToken");
  const authData = useAuthSelector();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const [imageUrl, setImgUrl] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
  });
  const ROOM_ID = `${userInfo?.id}-${authData?.userInfo?.id}`;
  //closeModal
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
    close();
  };
  // open modal
  const handleOpenModal = (flag) => {
    setModalDetail({
      show: true,
      flag: flag,
      type: flag,
    });
    setKey(Math.random());
  };

  // get all messages
  useEffect(() => {
    const allMessageQuery = query(
      collection(db, PARENTCOLLECTIONNAME, ROOM_ID, CHILDCOLLECTIONNAME),
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
      setMessages(updatedData);
    });
    return () => unsubscribe();
  }, [userInfo]);

  
  // send and update messages
  const handleUpdateMessage = async (e) => {
    if (!msg || msg === "") {
      return;
    }
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
    if (roomDocSnapshot.exists()) {
      const messagesCollectionRef = collection(roomDocRef, CHILDCOLLECTIONNAME);
      await addDoc(messagesCollectionRef, {
        createdAt: new Date(),
        text: msg,
        id: "",
        image_url: imageUrl,
        senderId: authData?.userInfo?.id,
        recieverId: userInfo?.id,
      });
      try {
        const roomDocRef = doc(db, PARENTCOLLECTIONNAME, ROOM_ID);
        await updateDoc(
          roomDocRef,
          {
            deletedChatUserIds: [],
            lastMessage: {
              createdAt: new Date(),
              senderId: authData?.userInfo?.id,
              recieverId: userInfo?.id,
              text: msg,
              image_url: imageUrl,
            },
            roomId: ROOM_ID,
            unseenMessageCount: previousUnseenMessageCount + 1,
            user1: {
              email: userInfo?.email,
              fcmToken: userInfo?.fcmToken,
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
      }

      console.log("Message sent to existing room:", ROOM_ID);
    } else {
      handleSendInitialMessage(senderName, receiverName);
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
          deletedChatUserIds: [],
          lastMessage: {
            createdAt: new Date(),
            senderId: authData?.userInfo?.id,
            recieverId: userInfo?.id,
            text: msg,
            image_url: imageUrl,
          },
          roomId: ROOM_ID,
          unseenMessageCount: 1,
          user1: {
            email: userInfo?.email,
            fcmToken: userInfo?.fcmToken,
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
      await addDoc(messagesCollectionRef, {
        createdAt: new Date(),
        text: msg,
        id: "",
        image_url: imageUrl,
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
      title: "New Message",
      body: `${senderName}: ${msg}`,
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
        Authorization: `Bearer AAAAHRQtGIo:APA91bHfwyhY4cv1HeqaG7rSy9cnIQawy96LWye1SyralUJsoct5iT3NjssbzMPlhnncVGLUqLNGuKqdRFL8-FCCA2mrC65uH-3zrExXscs1nc8tBtbC67ZbsOXoeMdYvtYZ_CZW2Yfa`, // Replace with your Firebase Cloud Messaging Server Key
      },
      body: JSON.stringify(payload),
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
      <div className="chat-main-content">
        {messages?.map((message, index) => (
          <div
            key={index}
            className={
              userInfo?.id === message?.senderId
                ? "chat-left-section"
                : "chat-right-section"
            }
          >
            <div className="chat-box-left py-2">
              <p className="chat-value">{message?.text}</p>

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
                      authData?.userInfo?.userInfo?.profilePhoto
                        ? authData?.userInfo?.userInfo?.profilePhoto
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
                onClick={handleUpdateMessage}
                src={Images.chatSendImg}
                alt="chatsendImg"
                className=""
              />
            </div>
          </div>
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
          modalDetail.flag === "orderReadyForDelivery"
            ? "commonWidth customContent"
            : ""
        }
        ids={
          modalDetail.flag === "orderReadyForDelivery" ? "readyWithOrder" : ""
        }
        child={
          modalDetail.flag === "orderReadyForDelivery" ? (
            <OrderReadyForDeliverModal close={() => handleOnCloseModal()} />
          ) : (
            ""
          )
        }
        header={
          modalDetail.flag === "orderReadyForDelivery" ? (
            <>
              <div className="Common_header">
                <img
                  onClick={handleOnCloseModal}
                  src={Images.backArrowpassword}
                  alt="arrowPswImg"
                  className="img-fluid  arrowCommon_"
                />
                <div className="headerProfile ps-2">
                  <p className="modal_Heading">Order #12548</p>
                  <p className="innerhead_ ps-3">In-Progress</p>
                </div>
              </div>
              {/* <p onClick={handleOnCloseModal} className='modal_cancel'>
                            <img src={Images.modalCancel} className='ModalCancel' />
                        </p> */}
            </>
          ) : modalDetail.flag === "CartFood" ? (
            <>
              {/* <h2 className="modal_Heading">
                                Cart
                            </h2> */}
              <p onClick={handleOnCloseModal} className="modal_cancel">
                <img
                  src={Images.modalCancel}
                  className="ModalCancel"
                  alt="modalCancel"
                />
              </p>
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

export default ChatWithChefModal;
