import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getNotification,
  onErrorStopLoad,
  readNotification,
  clearNotification,
} from "../../../../redux/slices/user";
import moment from "moment";
import * as Images from "../../../../utilities/images";
import { useAuthSelector } from "../../../../redux/selector/auth";
import { useNavigate } from "react-router-dom";

const UserNotification = ({ updateNotification }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = useAuthSelector();
  const { userInfo } = authData;
  const { role } = userInfo;
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
  const handleReadNotification = (id, read, type, userId) => {
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
            // if (role === "chef" && type === "order-food") {
            //   navigate(`/order-details?recent-order=${userId}`);
            // }
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
        <div className="modalscroll-notificaation user-chef-notification-modal">
          {notification && notification.length > 0 ? (
            <>
              {notification?.map((item, index) => (
                <div
                  onClick={() =>
                    handleReadNotification(
                      item?._id,
                      item?.is_read,
                      item?.type,
                      item?.userId
                    )
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
                  src={Images.nodataFound}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserNotification;
