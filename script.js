// script.js
import { db } from './firebase-config.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const gallery = document.getElementById('gallery');
const nicknameInput = document.getElementById('nickname');

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/deyrj2kld/image/upload';
const UPLOAD_PRESET = 'unsigned'; // ตรงกับในภาพที่คุณแนบมา

uploadBtn.onclick = async () => {
  const file = fileInput.files[0];
  const nickname = nicknameInput.value.trim();

  if (!file || !nickname) {
    return alert("❌ กรุณาเลือกไฟล์ และกรอกชื่อเล่นก่อน");
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const res = await fetch(CLOUDINARY_URL, {
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
      alert("✅ อัปโหลดสำเร็จ");
      loadImages();
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    alert("❌ เกิดข้อผิดพลาด: " + error.message);
  }
};

async function loadImages() {
  gallery.innerHTML = "⏳ กำลังโหลด...";
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

// โหลดภาพเมื่อเปิดหน้า
loadImages();
