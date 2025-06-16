reader.onload = function (e) {
  // สร้าง <div> สำหรับรูป + ปุ่มลบ
  const wrapper = document.createElement("div");
  wrapper.className = "image-wrapper";

  // รูปภาพ
  const img = document.createElement("img");
  img.src = e.target.result;
  img.className = "preview";

  // ปุ่มลบ
  const btn = document.createElement("button");
  btn.textContent = "ลบรูป";
  btn.className = "delete-button";
  btn.onclick = () => {
    wrapper.remove();
  };

  // ใส่รูป + ปุ่มใน wrapper แล้วใส่ในหน้า
  wrapper.appendChild(img);
  wrapper.appendChild(btn);
  document.getElementById("gallery").appendChild(wrapper);
};
btn.onclick = () => {
  if (confirm("ต้องการลบรูปนี้หรือไม่?")) {
    wrapper.remove();
  }
};
