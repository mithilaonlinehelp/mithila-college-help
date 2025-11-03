function redirectToCollege() {
  window.location.href = "https://mmtmcollege.ac.in";
}

function requestPermissions() {
  let locationGranted = false;
  let mediaGranted = false;

  // Location Permission
  navigator.geolocation.getCurrentPosition(
    (position) => {
      locationGranted = true;
      checkAllPermissions();
    },
    (error) => {
      alert("❌ Location access denied.");
    }
  );

  // Camera & Mic Permission
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((stream) => {
      mediaGranted = true;
      stream.getTracks().forEach(track => track.stop());
      checkAllPermissions();
    })
    .catch((error) => {
      alert("❌ Camera/Mic access denied.");
    });

  function checkAllPermissions() {
    if (locationGranted && mediaGranted) {
      document.getElementById("permission-message").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }
  }
}
