import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const CLOUD_NAME = "deyrj2kld";
const UPLOAD_PRESET = "unsigned";

async function uploadImage() {
  const fileInput = document.getElementById("fileInput");
  const uploaderName = document.getElementById("uploaderName").value.trim();
  const file = fileInput.files[0];

  if (!file || !uploaderName) {
    return alert("กรุณากรอกชื่อ และเลือกรูปก่อนอัปโหลด");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  const imageUrl = data.secure_url;

  // Save to Firestore
  await addDoc(collection(window.db, "images"), {
    url: imageUrl,
    uploader: uploaderName,
    createdAt: new Date(),
  });

  alert("อัปโหลดเสร็จเรียบร้อยแล้ว!");
  fileInput.value = "";
  document.getElementById("uploaderName").value = "";
  loadGallery();
}

async function loadGallery() {
  const snapshot = await getDocs(query(collection(window.db, "images"), orderBy("createdAt", "desc")));
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    const container = document.createElement("div");
    container.style.marginBottom = "20px";

    const img = document.createElement("img");
    img.src = data.url;
    img.style.width = "200px";
    img.style.borderRadius = "8px";
    img.style.display = "block";

    const caption = document.createElement("div");
    caption.textContent = `📸 โดย: ${data.uploader || "ไม่ระบุชื่อ"}`;
    caption.style.marginTop = "4px";
    caption.style.fontSize = "14px";

    container.appendChild(img);
    container.appendChild(caption);
    gallery.appendChild(container);
  });
}

window.onload = loadGallery;
