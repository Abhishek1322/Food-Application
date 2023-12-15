import React, { useState, useEffect, useCallback } from "react";
import * as Images from "../../../../utilities/images";
import CustomModal from "./CustomModal";
import OrderReadyForDeliverModal from "./orderReadyForDeliverModal.js";
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
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import {
  chefProfileDocument,
  onErrorStopLoad,
} from "../../../../redux/slices/auth/index.js";
import { useDispatch } from "react-redux";

const ChatWithChefModal = ({ orderDetails }) => {
  const dispatch = useDispatch();
  const room_id = `${orderDetails?.userId?._id}-${orderDetails?.chefId?._id}`;
  const fcmToken = localStorage.getItem("fcmToken");
  console.log("orderDetailsorderDetails", orderDetails);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const [imageUrl, setImgUrl] = useState("");
  const [key, setKey] = useState(Math.random());
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

  // send new messages
  const handleSendMessage = async (e) => {
    if (!msg || msg === "") {
      return;
    }
    const senderName =
      orderDetails?.chefId?.userInfo?.firstName +
      " " +
      orderDetails?.chefId?.userInfo?.lastName;

    const receiverName =
      orderDetails?.userId?.userInfo?.firstName +
      " " +
      orderDetails?.userId?.userInfo?.lastName;
    try {
      const roomDocRef = doc(db, "chats", room_id);
      await setDoc(
        roomDocRef,
        {
          deletedChatUserIds: [],
          lastMessage: {
            createdAt: serverTimestamp(),
            senderId: orderDetails?.chefId?._id,
            recieverId: orderDetails?.userId?._id,
            text: msg,
            image_url: imageUrl,
          },
          roomId: room_id,
          unseenMessageCount: 0,
          user1: {
            email: orderDetails?.chefId?.email,
            fcmToken: fcmToken,
            full_name: senderName,
            id: orderDetails?.chefId?._id,
            onlineStatus: 1,
            profile_image: orderDetails?.chefId?.userInfo?.profilePhoto,
          },
          user2: {
            email: orderDetails?.userId?.email,
            full_name: receiverName,
            id: orderDetails?.userId?._id,
            onlineStatus: 1,
            profile_image: orderDetails?.userId?.userInfo?.profilePhoto,
          },
          users: [orderDetails?.chefId?._id, orderDetails?.userId?._id],
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
        senderId: orderDetails?.chefId?._id,
        recieverId: orderDetails?.userId?._id,
      });
      console.log("Message sent to existing room:", room_id);
    } else {
      console.log("Room does not exist with ID:", room_id);
    }
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

  return (
    <>
      <div className="chat-main-content">
        {messages?.map((message, index) => (
          <div
            key={index}
            className={
              orderDetails?.userId?._id === message?.senderId
                ? "chat-left-section"
                : "chat-right-section"
            }
          >
            {console.log("messagemessage", message)}
            <div className="chat-box-left py-2">
              <p className="chat-value">{message?.text}</p>

              <div className="chefchat_detail">
                {orderDetails?.userId?._id === message?.senderId ? (
                  <img
                    src={
                      orderDetails?.userId?.userInfo?.profilePhoto
                        ? orderDetails?.userId?.userInfo?.profilePhoto
                        : Images.dummyProfile
                    }
                    alt="profile"
                    className="chatnextImg"
                  />
                ) : (
                  <img
                    src={
                      orderDetails?.chefId?.userInfo?.profilePhoto
                        ? orderDetails?.chefId?.userInfo?.profilePhoto
                        : Images.dummyProfile
                    }
                    alt="profile"
                    className="chatnextImg"
                  />
                )}
                {orderDetails?.userId?._id === message?.senderId ? (
                  <p className="chatUser m-0 pe-1">
                    {orderDetails?.userId?.userInfo?.firstName}{" "}
                    {orderDetails?.userId?.userInfo?.lastName}
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
                onClick={handleSendMessage}
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
