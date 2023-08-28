import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import './public/css/custom.css';
import './public/css/login.css';
import './public/css/responsive.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import store from './redux';
import { persistor } from './redux';
import { PersistGate } from 'redux-persist/integration/react';
import './public/css/style.css';
function App() {

  return (
    <>
      {/* <React.StrictMode> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </PersistGate>
      </Provider>
      <ToastContainer
      // position="top-right"
      // autoClose={5000}
      // hideProgressBar={false}
      // newestOnTop={true}
      // closeOnClick
      // rtl={false}
      // pauseOnFocusLoss
      // draggable
      // pauseOnHover
      />
      {/* </React.StrictMode> */}
      
    </>
  );
}

export default App;
