import React, { useState, useEffect } from "react";
import { db } from "../../../../config/firebase-config";

import {
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import * as Images from "../../../../utilities/images";
import { useAuthSelector } from "../../../../redux/selector/auth";

const ChatnextModal = () => {
  const authData = useAuthSelector();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const messagesRef = collection(db, "messages");
  const userId = localStorage.getItem("userId");

  console.log("authDataauthData", authData);
  console.log("serverTimestampserverTimestamp", serverTimestamp);
  console.log("dbdbdbdbdbdb", db);

  // get all messages
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const data = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log("messagesmessages", messages);

      setMessages(messages);
    });
    return () => data;
  }, []);

  // send new messages
  const sendMsg = async (e) => {
    await addDoc(messagesRef, {
      text: msg,
      createdAt: serverTimestamp(),
      uid: authData?.userInfo?.id,
      photoURL: authData?.userInfo?.userInfo?.profilePhoto
        ? authData?.userInfo?.userInfo?.profilePhoto
        : Images.dummyProfile,
    });
    setMsg("");
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
                  <div className="chatinRight_">
                    <p className="chat_Text">{message?.text}</p>
                  </div>
                  <div className="chefchat_detail">
                    <p className="chatTime_ m-0 pe-2 ">2:36 pm</p>
                    <p className="chatUser m-0 pe-1">You</p>
                    <img
                      src={
                        message?.photoURL
                          ? message?.photoURL
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
              <input
                className="chatSearchere_"
                type="text"
                placeholder="Type Something..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <img
                src={Images.chatgalleryImg}
                alt="chatGallerImg"
                className="gallerImg infoimg "
              />

              <div className="sarahinformation">
                <p className="chatSearchere_ ">
                  Your only able to send photos from gallery
                </p>
              </div>
              <img
                onClick={sendMsg}
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
