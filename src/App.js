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

const MyContext = createContext();

function App() {
  // React.useEffect(() => {
  //   const msg = firebase.messaging();
  //   msg
  //     .requestPermission()
  //     .then(() => {
  //       return msg.getToken();
  //     })
  //     .then((data) => {
  //       console.warn("token", data);
  //     });
  // }, []);

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
