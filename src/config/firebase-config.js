import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAq5qyr5Ro2va8nAoj0sMXTtjMXsdM2BSo",
  authDomain: "serveritlocal.firebaseapp.com",
  projectId: "serveritlocal",
  storageBucket: "serveritlocal.appspot.com",
  messagingSenderId: "1058208585599",
  appId: "1:1058208585599:web:410f925b657e2ee7122c4a",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
