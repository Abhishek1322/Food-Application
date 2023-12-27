import React, { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "85vh",
  marginTop: "20px",
};

const center = {
  lat: 30.7630356,
  lng: 76.6528225,
};

const ChooseLocation = () => {
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDL9J82iDhcUWdQiuIvBYa0t5asrtz3Swk",
  });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default ChooseLocation;
