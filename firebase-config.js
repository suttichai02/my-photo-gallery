// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmdR9VT1fplzsfXfeAe9eHdYF2Uv9o-Y",
  authDomain: "photo-gallery-e2dec.firebaseapp.com",
  projectId: "photo-gallery-e2dec",
  storageBucket: "photo-gallery-e2dec.appspot.com",
  messagingSenderId: "163307931322",
  appId: "1:163307931322:web:90e290b72543fd8ab92483",
  measurementId: "G-ZB2RDRQKRR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
