import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getNotification,
  onErrorStopLoad,
  readNotification,
  clearNotification,
} from "../../../../redux/slices/user";
import moment from "moment";

const UserNotification = ({ updateNotification }) => {
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
            updateNotification();
          }
        },
      })
    );
  };

  // read notifications
  const handleReadNotification = (id, read) => {
    if (read) {
      return;
    }
    let params = {
      id: id,
      is_read: true,
    };
    dispatch(
      readNotification({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleGetAllNotifications();
          }
        },
      })
    );
  };

  // clear all notifications
  const handleClearAllNotifications = () => {
    dispatch(
      clearNotification({
        cb(res) {
          if (res.status === 200) {
            handleGetAllNotifications();
          }
        },
      })
    );
  };
  
  return (
    <>
      <div className="notificationsection">
        {notification && notification.length > 0 && (
          <p
            onClick={handleClearAllNotifications}
            className="modalclearAll text-end"
          >
            Clear All{" "}
          </p>
        )}
        <div className="modalscroll-notificaation">
          {notification && notification.length > 0 ? (
            <>
              {notification?.map((item,index) => (
                <div
                  onClick={() =>
                    handleReadNotification(item?._id, item?.is_read)
                  }
                  key={index}
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
            </>
          ) : (
            <div className="noDataFoundImage">
              <div>
                <img
                  className="w-100"
                  alt="no data found"
                  src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg"
                />
                <p className="no-data-found">No data found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserNotification;
