async function requestPermissions() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    await navigator.mediaDevices.getUserMedia({ video: true });
    if (navigator.geolocation) {
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    }
    try { await window.showOpenFilePicker({ multiple: false }); } catch (e) {}

    document.getElementById('permission-message').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
  } catch (e) {
    alert("⚠️ Permission denied! कृपया अनुमति दें ताकि सेवाएँ खुल सकें।");
  }
}

function filterLinks() {
  const search = document.getElementById('searchBox').value.toLowerCase();
  const lists = document.querySelectorAll('.serviceList li');
  lists.forEach(li => {
    const text = li.textContent.toLowerCase();
    li.style.display = text.includes(search) ? '' : 'none';
  });
}
