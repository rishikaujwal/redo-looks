import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Correct Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD_e7WZRPwwFe3MsE8MYgHdSsvJbcnhRxc",
  authDomain: "resale-clothes-app.firebaseapp.com",
  projectId: "resale-clothes-app",
  storageBucket: "resale-clothes-app.appspot.com",  // ✅ Fixed this line
  messagingSenderId: "989342550796",
  appId: "1:989342550796:web:ecd34b4bad73ccb9031729",
  measurementId: "G-2VEC38BZ2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
