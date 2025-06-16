// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAadMR9TVflpHzsfXIeAe9eHdVF2UwyO-Y",
  authDomain: "photo-gallery-a2dec.firebaseapp.com",
  projectId: "photo-gallery-a2dec",
  storageBucket: "photo-gallery-a2dec.firebasestorage.app",
  messagingSenderId: "163307931322",
  appId: "1:163307931322:web:90e290b72543fd8ab92483",
  measurementId: "G-Z002RQDKRR"
};
// firebase-config.js

// Firebase SDK แบบ CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

// ✅ Config ที่ถูกต้อง
const firebaseConfig = {
  apiKey: "AIzaSyAadMR9TVflpHzsfXIeAe9eHdVF2UwyO-Y",
  authDomain: "photo-gallery-a2dec.firebaseapp.com",
  projectId: "photo-gallery-a2dec",
  storageBucket: "photo-gallery-a2dec.appspot.com",
  messagingSenderId: "163307931322",
  appId: "1:163307931322:web:90e290b72543fd8ab92483",
  measurementId: "G-Z002RQDKRR"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
