import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIfHdv-rC1fhADwn12njpF_hlfd517Bcs",
  authDomain: "chat-app-fb33f.firebaseapp.com",
  projectId: "chat-app-fb33f",
  storageBucket: "chat-app-fb33f.appspot.com",
  messagingSenderId: "163744644930",
  appId: "1:163744644930:web:c8b3e1ce479ac6aaca52db",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider(app);
export const db = getFirestore(app);
