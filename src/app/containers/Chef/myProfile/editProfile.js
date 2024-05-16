import React, { useState, useEffect, useCallback } from "react";
import * as Images from "../../../../utilities/images";
import {
  getChefProfileDetails,
  updateProfileImage,
  onErrorStopLoad,
} from "../../../../redux/slices/web";
import { chefProfileDocument } from "../../../../redux/slices/auth";
import { useDispatch } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import { useAuthSelector } from "../../../../redux/selector/auth";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authSelector = useAuthSelector();
  const { loading } = authSelector;
  const userId = localStorage.getItem("userId");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [chefType, setChefType] = useState("");
  const [experience, setExperience] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [chefProfile, setChefProfile] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dialCode, setDialCode] = useState("");

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
      setChefProfile(acceptedFiles[0]);
    },
    [chefProfile]
  );

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

  // get all profile details
  useEffect(() => {
    let params = {
      userid: userId,
    };
    dispatch(
      getChefProfileDetails({
        ...params,
        cb(res) {
          setFirstName(res?.data?.data?.userInfo.firstName);
          setLastName(res?.data?.data?.userInfo.lastName);
          setEmail(res?.data?.data?.email);
          setPhoneNumber(res?.data?.data?.phoneNo);
          setChefType(res?.data?.data?.chefInfo.type);
          setAddress(res?.data?.data?.chefInfo.address);
          setExperience(res?.data?.data?.chefInfo?.experience);
          setBio(res?.data?.data?.chefInfo?.bio);
          setLatitude(res?.data?.data?.chefInfo?.coordinates?.coordinates[0]);
          setLongitude(res?.data?.data?.chefInfo?.coordinates?.coordinates[1]);
          setProfileUrl(res?.data?.data?.userInfo?.profilePhoto);
          setDialCode(res?.data?.data?.dialCode);
        },
      })
    );
  }, []);

  // handle change address
  const autoCompleteHandleChange = (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => {
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
      })
      .catch((error) => {});
  };

  // select address
  const autoCompleteHandleSelect = (address) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => {
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
      })
      .catch((error) => {});
  };

  const typeOfChef = [{ type: "restaurant" }, { type: "home" }];

  // update chef type
  const handleUpdateChefType = (e, type) => {
    setChefType(type);
  };

  // stop loader on page reload
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // updateChef profile
  const handleUpdateProfile = () => {
    let params = {
      step: "1",
      firstName: firstName,
      lastName: lastName,
      type: chefType,
      experience: experience,
      address: address,
      coordinates: { lat: latitude, long: longitude },
      bio: bio,
      phoneNo: phoneNumber,
      dialCode: dialCode,
    };
    if (profileUrl) {
      params = {
        ...params,
        profilePhoto: profileUrl,
      };
    }
    dispatch(
      updateProfileImage({
        ...params,
        cb(res) {
          if (res.status === 200) {
            navigate("/chef-profile");
          }
        },
      })
    );
  };

  // getting profile image path
  useEffect(() => {
    if (chefProfile) {
      let params = {
        file: chefProfile,
      };
      dispatch(
        chefProfileDocument({
          ...params,
          cb(res) {
            if (res.status === 200) {
              setProfileUrl(res.data.data.fileUrl);
            }
          },
        })
      );
    }
  }, [chefProfile]);

  const onChangePhoneNumber = (value, data) => {
    setDialCode(data.dialCode);
    let validNumber = value.slice(data.dialCode.length);
    setPhoneNumber(validNumber);
  };

  return (
    <>
      <section className="editsection profilesectionChef border-label-update-profile">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <div className="editleft">
                <img
                  src={profileUrl ? profileUrl : Images.dummyProfile}
                  alt="chefProfileimg"
                  className="chefprofileimg"
                />
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <img
                    src={Images.editProfile}
                    alt="editprofileimg"
                    className="editprofileimg"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12">
              <div className="editright">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input-container mt-5">
                        <input
                          type="text"
                          value={firstName}
                          className="border-input"
                          placeholder="enter your first name"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label className="border-label">First Name</label>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-container mt-5">
                        <input
                          type="text"
                          value={lastName}
                          className="border-input"
                          placeholder="enter your last name"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        <label className="border-label">Last Name</label>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-container mt-5 phone-input-dropdown">
                        {/* <input
                          type="number"
                          name="rateperhour"
                          className="border-input"
                          placeholder="enter your phone number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        /> */}
                        <PhoneInput
                          className="border-input"
                          country={"us"}
                          // phoneNo
                          value={dialCode + phoneNumber}
                          onChange={(value, data, event, formattedValue) =>
                            onChangePhoneNumber(
                              value,
                              data,
                              event,
                              formattedValue
                            )
                          }
                        />
                        <label className="border-label">Phone</label>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="input-container mt-5">
                        <input
                          type="text"
                          value={email}
                          className="border-input"
                          placeholder="enter your email address"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="border-label">Email</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="input-container mt-5">
                        <div className="border-box">
                          {typeOfChef.map((item, index) => (
                            <div
                              onClick={(e) =>
                                handleUpdateChefType(e, item.type)
                              }
                              key={index}
                              className={
                                chefType === item.type
                                  ? "chefType active text-capitalize"
                                  : "chefType text-capitalize"
                              }
                            >
                              {item.type}
                              <img
                                src={Images.chefType}
                                alt="InfoIcon"
                                className="InfoIcon"
                                id="Restaurant"
                              />
                              <img
                                src={Images.chefTypeActive}
                                alt="InfoIcon"
                                className="InfoIconActive img-fluid d-none"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="border-label">Chef Type</div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-container mt-5">
                        <input
                          type="number"
                          value={experience}
                          className="border-input"
                          placeholder="enter your experience"
                          onChange={(e) => setExperience(e.target.value)}
                        />
                        <label className="border-label">
                          Experience (in years)
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-container mt-5">
                        <PlacesAutocomplete
                          className=""
                          autoComplete="off"
                          value={address}
                          onChange={autoCompleteHandleChange}
                          onSelect={autoCompleteHandleSelect}
                          searchOptions={{}}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div>
                              <input
                                {...getInputProps({
                                  placeholder: "Street Address",
                                  className:
                                    "location-search-input customform-control border-input address-border-input",
                                })}
                              />
                              <div
                                className={
                                  suggestions && suggestions.length > 0
                                    ? "suggestion-item-outer"
                                    : "autocomplete-dropdown-container"
                                }
                              >
                                {/* {loading && <div>Loading...</div>} */}
                                {suggestions.map((suggestion, index) => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? {
                                        backgroundColor: "#e65c00",
                                        cursor: "pointer",
                                        borderRadius: "4px",
                                        padding: "6px",
                                        color: "#fff",
                                      }
                                    : {
                                        backgroundColor: "#ffffff",
                                        cursor: "pointer",
                                      };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                      key={index}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                        <label className="border-label">Address</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-container mt-5">
                        <textarea
                          value={bio}
                          className="border-input"
                          rows="3"
                          onChange={(e) => setBio(e.target.value)}
                        />
                        <label className="border-label">Bio</label>
                      </div>
                    </div>
                  </div>
                  <div className="buttonBox mt-5">
                    <button
                      onClick={handleUpdateProfile}
                      role="button"
                      className="smallBtn"
                    >
                      {" "}
                      Update
                      {loading && (
                        <span className="spinner-border spinner-border-sm ms-1"></span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
