import React, { useEffect } from "react";
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
import { getToken, onMessage } from "firebase/messaging";
import * as Images from "../src/utilities/images";
import { toast } from "react-toastify";

function App() {
  // Get FCM token , Generate Token
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
      });
      localStorage.setItem("fcmToken", token);
      onMessage(messaging, (payload) => {
        const { title, body } = payload.notification;
        new Notification(title, {
          body,
          icon: payload?.data?.profile_image
            ? payload?.data?.profile_image
            : Images.Logo,
        });
      });
    } else if (permission === "denied") {
      // toast.error("You denied for the notification");
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
      <ToastContainer position="top-center" theme="dark" />
    </>
  );
}

export default App;
