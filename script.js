// ========================
// SEARCH FUNCTIONALITY
// ========================
const searchBox = document.getElementById("searchBox");
const serviceItems = document.querySelectorAll("ul li");

searchBox.addEventListener("keyup", function() {
  const query = searchBox.value.toLowerCase();
  serviceItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

// ========================
// LOCATION PERMISSION CHECK
// ========================
const permissionMessage = document.getElementById("permission-message");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
  permissionMessage.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
}

function showPosition(position) {
  permissionMessage.innerHTML = `
    <h3>📍 Location Access Granted</h3>
    <p><b>Latitude:</b> ${position.coords.latitude.toFixed(4)}<br>
    <b>Longitude:</b> ${position.coords.longitude.toFixed(4)}</p>
  `;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      permissionMessage.innerHTML = `
        <p>❌ Location access denied.<br>
        Please enable location permission in your browser settings.</p>
        <button onclick="requestLocation()">Try Again</button>
      `;
      break;
    case error.POSITION_UNAVAILABLE:
      permissionMessage.innerHTML = "<p>⚠️ Location information is unavailable.</p>";
      break;
    case error.TIMEOUT:
      permissionMessage.innerHTML = "<p>⏳ Location request timed out.</p>";
      break;
    default:
      permissionMessage.innerHTML = "<p>⚠️ An unknown error occurred.</p>";
  }
}

function requestLocation() {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
}

// ========================
// ANIMATED PAGE LOAD
// ========================
window.addEventListener("load", () => {
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease-in";
    document.body.style.opacity = 1;
  }, 100);
});

// ========================
// AUTO DATE FOOTER UPDATE
// ========================
const footer = document.querySelector("footer");
const year = new Date().getFullYear();
footer.innerHTML = `© ${year} MMTM College Portal | Developed by Vikram Bhagat 🙌`;
