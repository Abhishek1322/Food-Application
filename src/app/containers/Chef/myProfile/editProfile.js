import React, { useState, useEffect } from "react";
import * as Images from "../../../../utilities/images";
import { Link } from "react-router-dom";
import CustomModal from "../../../components/common/shared/CustomModal";
import AddExpertiseModal from "../../../components/common/shared/addExpertiseModal";
import {
  getChefProfileDetails,
  onErrorStopLoad,
} from "../../../../redux/slices/web";
import { useDispatch } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const EditProfile = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const [chefProfileData, setProfileData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [chefType, setChefType] = useState("");
  const [experience, setExperience] = useState("");
  const [expertice, setExpertice] = useState([]);
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();


  useEffect(() => {
    let params = {
      userid: userId,
    };
    dispatch(
      getChefProfileDetails({
        ...params,
        cb(res) {
          setProfileData(res?.data?.data);
          setFirstName(res?.data?.data?.userInfo.firstName);
          setLastName(res?.data?.data?.userInfo.lastName);
          setEmail(res?.data?.data?.email);
          setChefType(res?.data?.data?.chefInfo.type);
          setExpertice(res?.data?.data?.chefInfo.expertise);
          setAddress(res?.data?.data?.chefInfo.address);
          setExperience(res?.data?.data?.chefInfo?.experience);
          setBio(res?.data?.data?.chefInfo?.bio);
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

  return (
    <>
      <section className="editsection">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <div className="editleft">
                <img
                  src={Images.chefProfile}
                  alt="chefProfileimg"
                  className="chefprofileimg"
                />
                <img
                  src={Images.editProfile}
                  alt="editprofileimg"
                  className="editprofileimg"
                />
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
                          placeholder="Sarah "
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
                          placeholder="Bergstrom"
                        />
                        <label className="border-label">Last Name</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="input-container mt-5">
                        <input
                          type="text"
                          value={email}
                          className="border-input"
                          placeholder="bangura@serveitlocal.com"
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
                          type="text"
                          value={experience}
                          className="border-input"
                          placeholder="Bergstrom"
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
                          searchOptions={{
                            componentRestrictions: {
                              country: ["Ind"],
                            },
                          }}
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
                                    "location-search-input customform-control border-input",
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion, index) => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? {
                                        backgroundColor: "#41b6e6",
                                        cursor: "pointer",
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
                        />
                        <label className="border-label">Bio</label>
                      </div>
                    </div>
                  </div>
                  <div className="buttonBox mt-5">
                    <button type="submit" role="button" className="smallBtn">
                      {" "}
                      Update
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
