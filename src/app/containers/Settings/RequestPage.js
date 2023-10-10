import React, { useState, useEffect } from "react";
import * as Images from "../../../utilities/images";
import swal from "sweetalert";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout, onErrorStopLoad } from "../../../redux/slices/auth";
import { useAuthSelector } from "../../../redux/selector/auth";

const RequestPage = () => {
  const authData = useAuthSelector();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  //   useEffect(() => {
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 2500);
  //   }, []);

  // logout handler
  const handleLogout = (_id) => {
    swal({
      className: "sweetAlertLogout",
      title: "Are you sure?",
      text: "Are you sure to log out this account",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((logout) => {
      if (logout) {
        dispatch(
          userLogout({
            cb(res) {
              navigate("/");
            },
          })
        );
        // swal("", "Your document has been deleted!", "success");
      }
    });
  };

  // stop loader on refresh page
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="accountDelete_">
        <div className="container-fluid">
          <div className="changepassword loadingpage">
            <div className="changepasswordForm">
              <div className="changepasswordImg d-flex justify-content-center">
                <img
                  src={Images.accountDeleted}
                  alt="logo"
                  className="img-fluid innerHeaderArrow "
                />
              </div>
              <h6 className="accountDeleted mb-3 d-flex  justify-content-center mt-3">
                Account request has been <br /> summited successfully
              </h6>
              <p className="accountdeletetxt mb-3 d-flex  justify-content-center mt-3">
                Your Account request is in under process.
                <br /> It will take some time.
              </p>
              <div className="settingBox d-flex align-items-center justify-content-center">
                {/* <img
                  onClick={() => handleLogout()}
                  src={Images.logout}
                  alt="logo"
                  className="img-fluid settingIcon "
                /> */}
                <Link to="/">
                  <p className="settingBoxtxt ms-3 mb-0">Back to login</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestPage;
