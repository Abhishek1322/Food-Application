import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Images from "../../../../utilities/images";
import {
  addBankDetails,
  onErrorStopLoad,
  updateBankDetails,
} from "../../../../redux/slices/auth";
import { useAuthSelector } from "../../../../redux/selector/auth";

const BankDetails = () => {
  const dispatch = useDispatch();
  const authSelector = useAuthSelector();
  const { bankInfo, loading } = authSelector;
  const [isLoading, setIsLoading] = useState("");
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountHolder: "",
    bankName: "",
    country: "",
    currency: "",
    routingNumber: "",
  });

  // add bank details
  const handleAddBankDetails = (flag) => {
    setIsLoading(flag);
    dispatch(
      addBankDetails({
        cb(res) {
          if (res?.status === 200) {
            window.location.href = res?.data?.data?.url;
          }
        },
      })
    );
  };

  // add bank details
  const handleUpdateBankDetails = (flag) => {
    setIsLoading(flag);
    dispatch(
      updateBankDetails({
        cb(res) {
          if (res?.status === 200) {
            const url = res?.data?.data?.url;
            if (url) {
              window.open(url, "_blank");
            }
          }
        },
      })
    );
  };

  // get bank detials
  useEffect(() => {
    setFormData({
      accountNumber: bankInfo?.data[0]?.last4,
      accountHolder: bankInfo?.data[0]?.account_holder_name,
      bankName: bankInfo?.data[0]?.bank_name,
      country: bankInfo?.data[0]?.country,
      currency: bankInfo?.data[0]?.currency,
      routingNumber: bankInfo?.data[0]?.routing_number,
    });
  }, []);

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  return (
    <>
      <div className="contactUs">
        <div className="container-fluid">
          <div className="commonInnerHeader d-flex align-items-center mt-4 ms-3">
            <Link to={"/setting"}>
              <img
                src={Images.backArrowpassword}
                alt="arrowImg"
                className="img-fluid  innerHeaderArrow"
              />
            </Link>
            <h1 className="settingMainHeading text-align-center">
              Bank Details
            </h1>
          </div>
          <div className="changepassword">
            {bankInfo && bankInfo?.data?.length > 0 ? (
              <div className="logRight mt-5">
                <div className="changepasswordForm">
                  <div className="changepasswordImg d-flex justify-content-center">
                    <img
                      src={Images.bankDetailLogo}
                      alt="contactUs"
                      className="img-fluid bank-logo-setting contactusImg"
                    />
                  </div>
                  <h2 className="settingMainText mb-3 d-flex  justify-content-center mt-3">
                    Change your bank details below.
                  </h2>

                  <div className="topInputfields">
                    <div className="container p-0">
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="input-container mt-5">
                            <input
                              readOnly
                              type="text"
                              className="border-input"
                              value={`********${formData.accountNumber}`}
                            />
                            <label className="border-label">
                              Account Number
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="input-container mt-5">
                            <input
                              readOnly
                              type="text"
                              className="border-input"
                              value={formData.accountHolder || "---"}
                            />
                            <label className="border-label">
                              Account Holder
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="input-container mt-5">
                            <input
                              readOnly
                              type="text"
                              className="border-input"
                              value={formData.bankName}
                            />
                            <label className="border-label">Bank Name</label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="input-container mt-5">
                            <input
                              readOnly
                              type="text"
                              className="border-input"
                              value={formData.country}
                            />
                            <label className="border-label">Country</label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="input-container mt-5">
                            <input
                              readOnly
                              type="text"
                              className="border-input"
                              value={formData.currency}
                            />
                            <label className="border-label">Currency</label>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="input-container mt-5">
                            <input
                              readOnly
                              type="text"
                              className="border-input"
                              value={formData.routingNumber}
                            />
                            <label className="border-label">
                              Routing Number
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="buttonBox mt-3 d-flex  justify-content-center">
                    <button
                      onClick={() => handleUpdateBankDetails("update")}
                      role="button"
                      className="smallBtn"
                      disabled={loading}
                    >
                      Update Account
                      {loading && isLoading === "update" && (
                        <span className="spinner-border spinner-border-sm ms-2"></span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="no-bank-found">
                  <img
                    alt="no-img"
                    className="w-100 h-100"
                    src={Images.noBank}
                    draggable={false}
                  />
                </div>
                <div className="buttonBox mt-5 d-flex  justify-content-center">
                  <button
                    onClick={() => handleAddBankDetails("add")}
                    role="button"
                    className="smallBtn"
                    disabled={loading}
                  >
                    Add Account
                    {loading && isLoading === "add" && (
                      <span className="spinner-border spinner-border-sm ms-2"></span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BankDetails;
