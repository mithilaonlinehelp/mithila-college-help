async function requestPermissions() {
  try { await navigator.mediaDevices.getUserMedia({ audio: true }); } catch {}
  try { await navigator.mediaDevices.getUserMedia({ video: true }); } catch {}
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(()=>console.log("📍 Location Access Granted!"));
  }
  try { await window.showOpenFilePicker(); } catch {}
  document.getElementById('permission-message').style.display = 'none';
  document.getElementById('main-content').style.display = 'block';
}

// Search Function
function searchLinks() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const lists = document.querySelectorAll(".searchable li");

  lists.forEach(li => {
    const text = li.textContent.toLowerCase();
    li.style.display = text.includes(input) ? "" : "none";
  });
}
