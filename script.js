import { db, auth, provider } from './firebase-config.js';
import {
  collection, addDoc, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  signInWithPopup, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const gallery = document.getElementById('gallery');

let currentUser = null;

loginBtn.onclick = async () => {
  const result = await signInWithPopup(auth, provider);
  currentUser = result.user;
  updateUI();
};

logoutBtn.onclick = async () => {
  await signOut(auth);
  currentUser = null;
  updateUI();
};

function updateUI() {
  if (auth.currentUser) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline';
    userInfo.textContent = `👤 Logged in as ${auth.currentUser.displayName}`;
    currentUser = auth.currentUser;
  } else {
    loginBtn.style.display = 'inline';
    logoutBtn.style.display = 'none';
    userInfo.textContent = '';
    currentUser = null;
  }
}

uploadBtn.onclick = async () => {
  const file = fileInput.files[0];
  if (!file || !currentUser) return alert("❌ ต้องเลือกไฟล์ และล็อกอินก่อน");

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'unsigned'); // ใส่ชื่อ Upload Preset ของ Cloudinary

  const res = await fetch('https://api.cloudinary.com/v1_1/deyrj2kld/image/upload', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  if (data.secure_url) {
    await addDoc(collection(db, 'images'), {
      url: data.secure_url,
      uploader: currentUser.displayName,
      created: Date.now()
    });
    alert("✅ Uploaded!");
    loadImages();
  } else {
    alert("❌ Upload failed");
  }
};

async function loadImages() {
  gallery.innerHTML = "⏳ Loading...";
  const snapshot = await getDocs(collection(db, 'images'));
  gallery.innerHTML = "";
  snapshot.forEach(doc => {
    const { url, uploader } = doc.data();
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<img src="${url}" /><p>👤 ${uploader}</p>`;
    gallery.appendChild(card);
  });
}

// โหลดข้อมูลตอนเริ่ม
onAuthStateChanged(auth, () => {
  updateUI();
  loadImages();
});
