// Firebase config
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAadMR9VTflpHzsfXleAe9eHdVF2UwyO-Y",
  authDomain: "photo-gallery-a2dec.firebaseapp.com",
  projectId: "photo-gallery-a2dec",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db; // export ให้ script.js ใช้งาน
