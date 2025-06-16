import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const CLOUD_NAME = "deyrj2kld";
const UPLOAD_PRESET = "unsigned";

async function uploadImage() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) return alert("Please select a file");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  const imageUrl = data.secure_url;

  // Save URL to Firestore
  const docRef = await addDoc(collection(window.db, "images"), {
    url: imageUrl,
    createdAt: new Date(),
  });

  alert("Upload complete!");
  loadGallery(); // refresh gallery
}

async function loadGallery() {
  const snapshot = await getDocs(collection(window.db, "images"));
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    const img = document.createElement("img");
    img.src = data.url;
    img.style.width = "200px";
    img.style.margin = "10px";
    gallery.appendChild(img);
  });
}

window.onload = loadGallery;
