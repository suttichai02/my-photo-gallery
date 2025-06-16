import { db } from './firebase-config.js';
import {
  collection, addDoc, getDocs, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const fileInput = document.getElementById('file-input');
const uploadBtn = document.getElementById('upload-btn');
const gallery = document.getElementById('gallery');
const nicknameInput = document.getElementById('nickname');

uploadBtn.onclick = async () => {
  const file = fileInput.files[0];
  const nickname = nicknameInput.value.trim();

  if (!file || !nickname) {
    return alert("❌ กรุณาเลือกไฟล์ และใส่ชื่อเล่นก่อน");
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'unsigned'); // ต้องตั้งค่าไว้ใน Cloudinary
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
    fileInput.value = '';
    loadImages();
  } else {
    alert("❌ Upload ไม่สำเร็จ");
  }
};

async function loadImages() {
  gallery.innerHTML = "⏳ Loading...";
  const snapshot = await getDocs(collection(db, 'images'));
  const nickname = nicknameInput.value.trim();
  gallery.innerHTML = "";

  snapshot.forEach(docSnap => {
    const { url, uploader } = docSnap.data();
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${url}" />
      <p>👤 ${uploader}</p>
      ${uploader === nickname ? `<button data-id="${docSnap.id}" class="delete-btn">🗑️ ลบ</button>` : ''}
    `;
    gallery.appendChild(card);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.getAttribute('data-id');
      const confirmDelete = confirm("คุณต้องการลบรูปนี้หรือไม่?");
      if (confirmDelete) {
        await deleteDoc(doc(db, 'images', id));
        alert("🗑️ ลบสำเร็จ");
        loadImages();
      }
    };
  });
}

// โหลดรูปทุกครั้งที่ชื่อเล่นเปลี่ยน
nicknameInput.addEventListener('input', loadImages);
loadImages();
