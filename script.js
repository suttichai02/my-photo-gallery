import { db } from './firebase-config.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const nicknameInput = document.getElementById('nickname');
const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const gallery = document.getElementById('gallery');

uploadBtn.onclick = async () => {
  const nickname = nicknameInput.value.trim();
  const file = fileInput.files[0];

  if (!nickname || !file) {
    alert("❌ ต้องกรอกชื่อเล่นและเลือกรูปก่อน");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'unsigned'); // ← ตรงกับในภาพ
  const res = await fetch('https://api.cloudinary.com/v1_1/deyrj2kld/image/upload', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  if (data.secure_url) {
    await addDoc(collection(db, 'images'), {
      url: data.secure_url,
      uploader: nickname,
      created: Date.now()
    });
    alert("✅ อัปโหลดสำเร็จ!");
    loadImages();
  } else {
    alert("❌ Upload failed");
    console.error(data);
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

// โหลดภาพเมื่อเปิดเว็บ
loadImages();
