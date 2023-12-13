import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBatQyYtqdAmcDPaSOdRrHUDrURaTdQdIc",
  authDomain: "silocal-5f20d.firebaseapp.com",
  projectId: "silocal-5f20d",
  storageBucket: "silocal-5f20d.appspot.com",
  messagingSenderId: "124892551306",
  appId: "1:124892551306:web:4947f7371f0c2ccefef573",
  measurementId: "G-FLQNWMWV6Q",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = getMessaging(app);

export { db, storage, app, messaging };

