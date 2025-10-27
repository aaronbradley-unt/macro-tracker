import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjHwXVeF9V9qxa_uyNUUqoIWtrZ5VAtSA",
  authDomain: "macro-tracker-b9f29.firebaseapp.com",
  projectId: "macro-tracker-b9f29",
  storageBucket: "macro-tracker-b9f29.firebasestorage.app",
  messagingSenderId: "336874329425",
  appId: "1:336874329425:web:5bfbe517e3e41d9ed22f70",
  measurementId: "G-KT26QMZQDP"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
