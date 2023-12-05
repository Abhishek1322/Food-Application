import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABE4akAtb_B2yFfCFbu1pLoxL_L1VF6lk",
  authDomain: "tokyo-baton-401811.firebaseapp.com",
  projectId: "tokyo-baton-401811",
  storageBucket: "tokyo-baton-401811.appspot.com",
  messagingSenderId: "696838990663",
  appId: "1:696838990663:web:09170bb002f3089a943a62"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {db, auth, provider}