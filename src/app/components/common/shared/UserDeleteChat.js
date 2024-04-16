import React, { useState } from "react";
import * as Images from "../../../../utilities/images";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  CHILDCOLLECTIONNAME,
  PARENTCOLLECTIONNAME,
  db,
} from "../../../../config/firebase-config";
import { toast } from "react-toastify";

const UserDeleteChat = ({ sender_id, allChats, sendRoomId, close, flag }) => {
  const [isLoading, setIsLoading] = useState(false);

  // // delete room
  // const handleDeleteRoom = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   let date = Math.floor(Date.now());
  //   let filterChatRoom = allChats?.filter((val) => val.roomId == sendRoomId);
  //   let deletedResult = {
  //     deletedAt: date,
  //     userId: sender_id,
  //   };
  //   const roomDocRef = doc(db, PARENTCOLLECTIONNAME, sendRoomId);
  //   const roomDocSnapshot = await getDoc(roomDocRef);
  //   if (roomDocSnapshot.exists()) {
  //     try {
  //       const roomDocRef = doc(db, PARENTCOLLECTIONNAME, sendRoomId);
  //       await updateDoc(roomDocRef, {
  //         deletedChatUserIds: [
  //           ...filterChatRoom[0]?.deletedChatUserIds,
  //           deletedResult,
  //         ],
  //       });
  //       toast.success("Chat deleted successfully");
  //       close();
  //     } catch (error) {
  //       console.error("Error creating room:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   } else {
  //     setIsLoading(false);
  //   }
  // };

  // delete room
  const handleDeleteRoom = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const roomDocRef = doc(db, PARENTCOLLECTIONNAME, sendRoomId);
    const deleteEntireRoom = doc(db, PARENTCOLLECTIONNAME, sendRoomId);
    let filterChatRoom = allChats?.filter((val) => val.roomId == sendRoomId);
    const getRoomDocRef = collection(
      db,
      PARENTCOLLECTIONNAME,
      sendRoomId,
      CHILDCOLLECTIONNAME
    );
    const querySnapshot = await getDocs(getRoomDocRef);
    const roomDocSnapshot = await getDoc(roomDocRef);
    if (roomDocSnapshot.exists()) {
      try {
        if (flag === "deleteChat") {
          await deleteDoc(deleteEntireRoom);
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        } else {
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
          await updateDoc(roomDocRef, {
            lastMessage: {
              createdAt: filterChatRoom[0]?.lastMessage?.createdAt,
              imageUrl: "",
              recieverId: filterChatRoom[0]?.lastMessage?.recieverId,
              senderId: filterChatRoom[0]?.lastMessage?.senderId,
              text: "",
            },
            unseenMessageCount: 0,
          });
        }
        toast.success("Chat deleted successfully");
        close();
      } catch (error) {
        console.error("Error creating room:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="deletesection paymentdonesection">
        <img
          src={Images.DeleteModal}
          alt="accountdeletedimg"
          className="img-fluid"
        />

        <h1 className="accountDeleted mt-3">
          {flag === "deleteChat" ? `Delete Chat` : `Clear Chat`}
        </h1>
        <p className="accountdeletetxt mt-2 ">
          Are you sure, you want to {flag === "deleteChat" ? `delete` : `clear`}{" "}
          this chat?
        </p>
        <div className="modalfooterbtn">
          <div className="orderItems gap-3">
            <button onClick={close} className="clearChatCancel" type="button">
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={(e) => handleDeleteRoom(e)}
              className="clearChatBtn d-flex align-items-center justify-content-center gap-2"
              type="button"
            >
              Yes,{flag === "deleteChat" ? `Delete` : `Clear`}
              {isLoading && (
                <span className="spinner-border spinner-border-sm me-1"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDeleteChat;
