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
import { messaging } from "./config/firebase-config";
import { getToken } from "firebase/messaging";

const MyContext = createContext();

function App() {
  // Get FCM token
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const currentToken = await getToken(messaging);
          console.log("FCM Token:", currentToken);
          localStorage.setItem("fcmToken", currentToken);
        } else {
          console.log("Notification permission denied.");
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    };
    requestNotificationPermission();
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
    </>
  );
}

export default App;
