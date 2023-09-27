import React, { useState, useEffect } from "react";
import * as Images from "../../../utilities/images";
import swal from "sweetalert";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onErrorStopLoad, deleteAccount } from "../../../redux/slices/auth";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // delete account
  const deleteAccountHandle = () => {
    let params = {
      id: userId,
    };
    dispatch(
      deleteAccount({
        ...params,
        cb(res) {
          if (res.status === 200) {
            navigate("/");
          }
        },
      })
    );
  };

  // stop loader on refresh page
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="deleteAccount_">
        <div className="container-fluid">
          <div className="commonInnerHeader d-flex align-items-center mt-4 ms-3">
            <Link to="/setting">
              <img
                src={Images.backArrowpassword}
                alt="logo"
                className="img-fluid innerHeaderArrow"
              />
            </Link>
            <p className="settingMainHeading text-align-center ">
              {" "}
              Delete Account
            </p>
          </div>
          <div className="commonheightbox_ deleteBox_">
            <div className="changepassword">
              <div className="changepasswordImg d-flex justify-content-center ">
                <img
                  src={Images.deleteImg}
                  alt="logo"
                  className="img-fluid .contactusImg "
                />
              </div>
              <h6 className="settingMainText d-flex  justify-content-center">
                Are you sure, you want to delete
                <br /> your account?
              </h6>
              <div className="buttonBox d-flex  justify-content-center">
                <Link to="/setting">
                  <button className="cancelBtn">cancel</button>
                </Link>
                <button onClick={deleteAccountHandle} className="smallBtn">
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
