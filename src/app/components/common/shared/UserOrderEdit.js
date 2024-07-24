import React, { useEffect, useState } from "react";
import * as Images from "../../../../utilities/images";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { addAddress, onErrorStopLoad } from "../../../../redux/slices/user";
import { useDispatch } from "react-redux";

const UserOrderEdit = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressType, setAddressType] = useState("home");
  const [building, setBuilding] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

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

  // select city
  const autoCompleteHandleSelect = (city) => {
    setCity(city);
    geocodeByAddress(city)
      .then((results) => {
        setLatitude(results[0].geometry.location.lat());
        setLongitude(results[0].geometry.location.lng());
        if (results.length > 0) {
          // Extract the state from the results
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

  // stop loader on page load
  useEffect(() => {
    dispatch(onErrorStopLoad());
  }, [dispatch]);

  // submit addresss
  const handleSubmitAddess = () => {
    let params = {
      type: addressType,
      city: city,
      state: state,
      zipCode: zipCode,
      streetAddress: streetAddress,
      plotNumber: building,
    };
    dispatch(
      addAddress({
        ...params,
        cb(res) {
          if (res.status === 200) {
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
              className="nav-link active"
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
              className="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
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
              className="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
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
          <div
            className="tab-pane fade show active"
            id={
              addAddress === "home"
                ? "home"
                : addAddress === "office"
                ? "office"
                : "other"
            }
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="tabbodysection">
              <div className="tabslocation">
                <img
                  src={Images.Target}
                  alt="locationtargetimg"
                  className="img-fluid"
                />
                <span className="modalclearAll">User Current Location</span>
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
                  <button onClick={handleSubmitAddess} className="foodmodalbtn">
                    Save
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

export default UserOrderEdit;
