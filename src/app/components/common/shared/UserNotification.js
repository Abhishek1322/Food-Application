import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getNotification,
  onErrorStopLoad,
  readNotification,
} from "../../../../redux/slices/user";
import moment from "moment";

const UserNotification = () => {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState([]);

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // get all notifications
  useEffect(() => {
    handleGetAllNotifications();
  }, []);

  // get all notifications
  const handleGetAllNotifications = () => {
    dispatch(
      getNotification({
        cb(res) {
          if (res.status === 200) {
            setNotification(res?.data?.data);
          }
        },
      })
    );
  };

  // read notifications
  const handleReadNotification = (id) => {
    let params = {
        id: id,
    }
    dispatch(readNotification({
        ...params,
        cb(res){
            
        }
    }))
  };

  return (
    <>
      <div className="notificationsection">
        <p className="modalclearAll text-end">Clear All </p>
        <div className="modalscroll">
          {notification?.map((item) => (
            <div
              onClick={()=>handleReadNotification(item?._id)}
              key={item?._id}
              className={
                item?.is_read
                  ? "notificationModal unreadmessage"
                  : "notificationModal reademessage cursor-pointer-notifiy"
              }
            >
              <p className="notificationText">{item?.description}</p>
              <p className="notificationTime">
                {moment(item?.createdAt).format("hh:mm A")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserNotification;
