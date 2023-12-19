import React, { useEffect, createContext, useContext, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import "./public/css/custom.css";
import "./public/css/customNew.css";
import "./public/css/login.css";
import "./public/css/responsive.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux";
import { persistor } from "./redux";
import { PersistGate } from "redux-persist/integration/react";
import "./public/css/style.css";
import { messaging, VAPID_KEY } from "./config/firebase-config";
import { getToken } from "firebase/messaging";
import Notifications from "./config/Notification";

function App() {
  // Get FCM token
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
      });
      localStorage.setItem("fcmToken", token);
      console.log("Token Gen", token);
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  // Req user for notification permission
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </PersistGate>
      </Provider>
      <ToastContainer />
      <Notifications />
    </>
  );
}

export default App;
