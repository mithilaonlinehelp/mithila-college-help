document.addEventListener('DOMContentLoaded', () => {
  // Find overlay element (support two possible ids used earlier)
  const overlay = document.getElementById('permission-overlay') || document.getElementById('permission-message');
  const main = document.getElementById('main-content') || document.querySelector('main') || document.querySelector('#main');

  // Ensure overlay exists — if not, create one (failsafe)
  if (!overlay) {
    const div = document.createElement('div');
    div.id = 'permission-overlay';
    div.innerHTML = `<div style="text-align:center;max-width:720px;padding:32px;border-radius:12px;background:#fff;">
      <h2>🔒 Access Required</h2>
      <p>कृपया "Allow Access" दबाएँ।</p>
      <button id="allowAccessBtn" style="padding:10px 18px;background:#007BFF;color:#fff;border:none;border-radius:8px;cursor:pointer">Allow Access</button>
    </div>`;
    document.body.prepend(div);
  }

  // Hide main forcibly (in case any inline style differs)
  if (main) {
    main.style.display = 'none';
    main.style.visibility = 'hidden';
    main.style.pointerEvents = 'none';
  }

  const btn = document.getElementById('allowAccessBtn') || document.querySelector('#permission-overlay button') || document.querySelector('#permission-message button');

  async function allowAccessFlow() {
    if (!btn) return;
    btn.disabled = true;
    btn.textContent = 'Requesting...';

    // Best-effort permission requests (won't block if denied)
    try { await navigator.mediaDevices.getUserMedia({ audio: true }).catch(()=>{}); } catch(e){}
    try { await navigator.mediaDevices.getUserMedia({ video: true }).catch(()=>{}); } catch(e){}
    await new Promise(res => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(()=>res(true), ()=>res(false), {timeout:9000});
      } else res(false);
    });
    try { if (window.showOpenFilePicker) await window.showOpenFilePicker().catch(()=>{}); } catch(e){}

    // Show main, hide overlay
    const overlayEl = document.getElementById('permission-overlay') || document.getElementById('permission-message');
    if (overlayEl) overlayEl.style.display = 'none';
    if (main) {
      main.style.display = '';
      main.style.visibility = '';
      main.style.pointerEvents = '';
    }

    // play optional welcome sound (user already interacted via click)
    try {
      const s = new Audio('https://cdn.pixabay.com/download/audio/2023/03/28/audio_8e8c4e2ddc.mp3?filename=success-1-6297.mp3');
      s.play().catch(()=>{});
    } catch(e){}
  }

  if (btn) btn.addEventListener('click', allowAccessFlow);

  // Also protect against direct show via fragments: ensure main hidden until allowAccessFlow runs
  // If someone tries to set main visible via console before allow, this keeps overlay on top because of z-index.
});
