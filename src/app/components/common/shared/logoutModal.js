import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import { userLogout, onErrorStopLoad } from "../../../../redux/slices/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSelectedAddress } from "../../../../redux/slices/user";
import { restAllData } from "../../../../redux/slices/commanAction";

const LogoutModal = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // logout handler
  const handleLogout = (_id) => {
    setIsLoading(true);
    dispatch(
      userLogout({
        cb(res) {
          if (res.status === 200) {
            setIsLoading(false);
            navigate("/");
            dispatch(getSelectedAddress(null));
            dispatch(restAllData());
          } else {
            setIsLoading(false);
          }
        },
      })
    );
  };

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="DeleteMenuModal">
        <img
          src={Images.logoutImg}
          alt="accountdeletedimg"
          className="img-fluid logoutImg"
        />
        <p className="accountDeleted mt-3">Logout</p>
        <p className="accountdeletetxt mt-2 ">
          Are you sure, you want to Logout ?
        </p>
        <div className="Logoutfooterbtn mb-4">
          <div className="orderItems_ flexBox justify_content-center ">
            <button onClick={close} className="cancelOrder_ me-4">
              Cancel
            </button>
            <button onClick={handleLogout} className="submitOrder_ log-out-btn">
              Yes, Logout
              {isLoading && (
                <span className="spinner-border spinner-border-sm ms-2"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
