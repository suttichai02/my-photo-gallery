// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
