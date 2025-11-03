// ===========================
// 🔐 Permissions Access Script
// ===========================
async function requestPermissions() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log("🎤 Mic Access Granted");
  } catch (err) {
    console.warn("Mic Access Denied");
  }

  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
    console.log("📷 Camera Access Granted");
  } catch (err) {
    console.warn("Camera Access Denied");
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      () => console.log("📍 Location Access Granted"),
      () => console.warn("Location Denied")
    );
  }

  try {
    await window.showOpenFilePicker();
    console.log("💾 Storage Access Granted");
  } catch (err) {
    console.warn("Storage Access Denied");
  }
}

// ===========================
// 🔍 Search Filter Script
// ===========================
function filterLinks() {
  const val = document.querySelector("#searchBox").value.toLowerCase();
  const allLinks = document.querySelectorAll(".serviceList li");

  allLinks.forEach((li) => {
    if (li.textContent.toLowerCase().includes(val)) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  });
}

// ===========================
// 🆔 College ID Card Generator
// ===========================
let photoData = "";

document.getElementById("id_photo")?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => (photoData = reader.result);
  reader.readAsDataURL(file);
});

document.getElementById("previewBtn")?.addEventListener("click", () => {
  const n = document.getElementById("id_name").value || "Name";
  const r = document.getElementById("id_roll").value || "Roll No.";
  const c = document.getElementById("id_college").value || "College";
  const cr = document.getElementById("id_course").value || "Course";
  const prev = document.getElementById("id_preview");

  prev.innerHTML = `
    <div id="printArea" style="width:350px;border:2px solid #007BFF;border-radius:10px;padding:12px;background:#fff;font-family:Poppins;">
      <div style="display:flex;align-items:center;gap:10px;">
        <img src='gandhi.logo.png' style="height:50px;width:50px;border-radius:50%;border:2px solid #ddd;">
        <div><b>MITHILA COLLEGE HELP</b><br><small>${c}</small></div>
      </div>
      <hr>
      <div style="display:flex;gap:12px;">
        <div style="width:95px;height:115px;border:1px solid #ddd;border-radius:8px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#f8f8f8;">
          ${photoData ? `<img src="${photoData}" style="width:100%;height:100%;object-fit:cover">` : `<small>No Photo</small>`}
        </div>
        <div style="flex:1;">
          <div style="font-weight:700;font-size:16px">${n}</div>
          <div>Roll: <b>${r}</b></div>
          <div>Course: <b>${cr}</b></div>
          <div style="font-size:12px;color:#777;">Valid: 2025</div>
        </div>
      </div>
      <div style="text-align:center;margin-top:8px;font-size:12px;color:#777;">Issued by Mithila College Help</div>
    </div>`;
  prev.style.display = "block";
});

document.getElementById("printBtn")?.addEventListener("click", () => {
  const area = document.getElementById("printArea");
  if (!area) {
    alert("पहले Preview करें!");
    return;
  }
  const w = window.open();
  w.document.write(area.outerHTML);
  w.print();
});

// ===========================
// ✨ Header Animation (Optional)
// ===========================
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 30) {
    header.style.boxShadow = "0 3px 10px rgba(0,0,0,0.2)";
  } else {
    header.style.boxShadow = "none";
  }
});
