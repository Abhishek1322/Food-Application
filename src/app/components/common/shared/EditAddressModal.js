import React, { useState, useEffect, useRef } from "react";
import * as Images from "../../../../utilities/images";
import {
  singleAddress,
  editUserAddress,
  onErrorStopLoad,
  getLocationInfo,
} from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useUserSelector } from "../../../../redux/selector/user";
import { toast } from "react-toastify";

const EditAddressModal = (props) => {
  const { close, addressId, handleGetUserAddress } = props;
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const userData = useUserSelector();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressType, setAddressType] = useState("");
  const [building, setBuilding] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isLoading, setIsLoading] = useState("");

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // getting address
  useEffect(() => {
    let params = {
      id: addressId,
    };
    dispatch(
      singleAddress({
        ...params,
        cb(res) {
          if (res.status === 200) {
            setCity(res?.data?.data?.city);
            setState(res?.data?.data?.state);
            setZipCode(res?.data?.data?.zipCode);
            setStreetAddress(res?.data?.data?.streetAddress);
            setBuilding(res?.data?.data?.plotNumber);
            setAddressType(res?.data?.data?.type);
            setLatitude(res?.data?.data?.coordinates?.coordinates[0]);
            setLongitude(res?.data?.data?.coordinates?.coordinates[1]);
          }
        },
      })
    );
  }, []);

  // handle change city
  const autoCompleteHandleChange = (city) => {
    setCity(city);
    geocodeByAddress(city)
      .then((results) => {
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
      })
      .catch((error) => {});
  };

  // handle get location common function
  const getLocationFields = (city) => {
    geocodeByAddress(city)
      .then((results) => {
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
        if (results.length > 0) {
          // Extract the state from the results
          setCity(results[0].formatted_address);
          const addressComponents = results[0].address_components;
          const stateComponent = addressComponents.find((component) =>
            component.types.includes("administrative_area_level_1")
          );
          // If stateComponent exists, set the state value
          if (stateComponent) {
            const stateName = stateComponent.long_name;
            setState(stateName);
          }
          // Extract the ZIP code from the results
          const zipCodeComponent = addressComponents.find((component) =>
            component.types.includes("postal_code")
          );
          if (zipCodeComponent) {
            const zipCode = zipCodeComponent.long_name;
            setZipCode(zipCode);
          }
          // Extract the local street address (route) or locality
          const routeComponent = addressComponents.find((component) =>
            component.types.includes("route")
          );
          const localityComponent = addressComponents.find((component) =>
            component.types.includes("locality")
          );
          if (routeComponent) {
            const localStreet = routeComponent.long_name;
            setStreetAddress(localStreet);
          } else if (localityComponent) {
            const localStreet = localityComponent.long_name;
            setStreetAddress(localStreet);
          }
        }
      })
      .catch((error) => {});
  };

  // select city
  const autoCompleteHandleSelect = (city) => {
    getLocationFields(city);
  };

  // show only one toast at one time
  const showToast = (msg) => {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.error(msg);
    }
  };

  // edit address
  const handleSubmitEditAddess = (save) => {
    setIsLoading(save);
    if (!city) {
      showToast("Please enter your city name");
      return;
    } else if (!state) {
      showToast("Please enter your state name");
      return;
    } else if (!zipCode) {
      showToast("Please enter your zip code");
      return;
    } else if (!streetAddress) {
      showToast("Please enter your street address");
      return;
    } else if (!building) {
      showToast("Please enter your building number");
      return;
    }

    let params = {
      id: addressId,
      type: addressType,
      city: city,
      state: state,
      zipCode: zipCode,
      streetAddress: streetAddress,
      plotNumber: building,
      coordinates: [latitude, longitude],
    };
    dispatch(
      editUserAddress({
        ...params,
        cb(res) {
          if (res.status === 200) {
            handleGetUserAddress();
            close();
          }
        },
      })
    );
  };

  // get current location
  const handleGetCurrentLocation = (curr) => {
    setIsLoading(curr);
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
      setCity("");
      setState("");
      setZipCode("");
      setStreetAddress("");
      setBuilding("");
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  // handling error
  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  // location options
  var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  // get let long
  function success(pos) {
    var crd = pos.coords;
    handleGetLocationInfo(crd.latitude, crd.longitude);
  }

  // getLocationInfo
  const handleGetLocationInfo = (lat, lng) => {
    let params = {
      lat: lat,
      lng: lng,
    };
    dispatch(
      getLocationInfo({
        ...params,
        cb(res) {
          if (res?.status === 200) {
            getLocationFields(res?.data?.results?.[0]?.formatted_address);
          }
        },
      })
    );
  };

  return (
    <>
      <div className="editadressection tabsection">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              onClick={() => setAddressType("home")}
              className={
                addressType === "home" ? "nav-link active" : "nav-link"
              }
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => setAddressType("office")}
              className={
                addressType === "office" ? "nav-link active" : "nav-link"
              }
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#office"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Office
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => setAddressType("other")}
              className={
                addressType === "other" ? "nav-link active" : "nav-link"
              }
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#other"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Other
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div role="tabpanel" aria-labelledby="home-tab">
            <div className="tabbodysection">
              <div className="tabslocation">
                <img
                  src={Images.Target}
                  alt="locationtargetimg"
                  className="img-fluid"
                />
                <button
                  disabled={userData?.loading && isLoading === "save"}
                  onClick={() => handleGetCurrentLocation("current")}
                  className="modalclearAll"
                >
                  User Current Location
                  {userData?.loading && isLoading === "current" && (
                    <span className="spinner-border spinner-border-sm me-1"></span>
                  )}
                </button>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <PlacesAutocomplete
                      className=""
                      autoComplete="off"
                      value={city}
                      onChange={autoCompleteHandleChange}
                      onSelect={autoCompleteHandleSelect}
                      searchOptions={{
                        componentRestrictions: {
                          country: ["US", "UK"],
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

                    <label className="border-label">City</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="State"
                      className="border-input"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                    <label className="border-label">State</label>
                    <img
                      src={Images.ZipCode}
                      alt="InfoIcon"
                      className="InputIcon"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="input-container mt-4">
                    <input
                      type="number"
                      name="Zip Code"
                      className="border-input"
                      placeholder="Zip code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                    <label className="border-label">Zip Code</label>
                    <img
                      src={Images.ZipCode}
                      alt="InfoIcon"
                      className="InputIcon"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="street"
                      className="border-input"
                      placeholder="Enter Address"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                    />
                    <label className="border-label">Street Address</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="input-container mt-4">
                    <input
                      type="text"
                      name="city"
                      className="border-input"
                      placeholder="Enter Plot / Building Number"
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                    />
                    <label className="border-label">
                      Plot / Building Number
                    </label>
                  </div>
                </div>
              </div>
              <div className="modalfooterbtn">
                <div className="addfoodbtn">
                  <button
                    disabled={userData?.loading && isLoading === "save"}
                    onClick={() => handleSubmitEditAddess("save")}
                    className="foodmodalbtn"
                  >
                    Update & Save
                    {userData?.loading && isLoading === "save" && (
                      <span className="spinner-border spinner-border-sm me-1"></span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAddressModal;
