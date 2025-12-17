<script>
    // Sound and Non-blocking Permission Logic
    const welcomeSound = new Audio("https://cdn.pixabay.com/download/audio/2023/03/28/audio_8e8c4e2ddc.mp3?filename=success-1-6297.mp3");
    try { welcomeSound.play().catch(()=>{}); } catch(e){};
    
    let photoData = ''; // Global variable for photo data

    // =================================================================
    // 1. NON-BLOCKING PERMISSION LOGIC (Event Listener for button)
    // =================================================================
    document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('requestPermBtn');
        if(btn) {
            btn.addEventListener('click', async () => {
                btn.textContent = "Requesting...";
                btn.disabled = true;
                try { await navigator.mediaDevices.getUserMedia({ audio: true }).catch(()=>{}); alert("🎤 Mic Access Status: Requested"); } catch(e){}
                try { await navigator.mediaDevices.getUserMedia({ video: true }).catch(()=>{}); alert("📷 Camera Access Status: Requested"); } catch(e){}
                try { await new Promise(r => navigator.geolocation.getCurrentPosition(()=>r(), ()=>r(), {timeout:5000})); alert("📍 Location Access Status: Requested"); } catch(e){}
                btn.textContent = "Access Requested (Green)";
                btn.style.background = 'linear-gradient(to right, #138808, #28a745)';
            });
        }

        // Photo Load Logic (Event Listener for file input)
        const idPhotoInput = document.getElementById('id_photo');
        if (idPhotoInput) {
            idPhotoInput.addEventListener('change', e => {
                const file = e.target.files[0]; 
                if (!file) return;
                const reader = new FileReader(); 
                reader.onload = () => photoData = reader.result;
                reader.readAsDataURL(file);
            });
        }
    });

    // =================================================================
    // 2. SEARCH FILTER LOGIC (Global Function for onkeyup)
    // =================================================================
    window.filterLinks = function() {
        const val = document.getElementById('searchBox').value.toLowerCase();
        document.querySelectorAll('.service-grid li').forEach(li => { 
            li.style.display = li.textContent.toLowerCase().includes(val) ? '' : 'none';
        });
    }

    // =================================================================
    // 3. ID CARD GENERATOR LOGIC (Global Functions for onclick)
    // =================================================================

    // ** Preview Function **
    window.previewIdCard = function() {
        // Fetching Input Values
        const n = document.getElementById('id_name')?.value || 'Student Name';
        const r = document.getElementById('id_roll')?.value || 'Roll No.';
        const fn = document.getElementById('id_father')?.value || 'Father Name';
        const s = document.getElementById('id_session')?.value || 'Session';
        const cr = document.getElementById('id_course')?.value || 'Course';
        const m = document.getElementById('id_mobile')?.value || 'Mobile No.';
        const a = document.getElementById('id_address')?.value || 'Address';
        
        const prev = document.getElementById('id_preview');
        if (!prev) return; 

        // ID Card HTML Structure (No change from working version)
        prev.innerHTML = `
          <div id="printArea" style="width:350px;border:4px solid #138808;border-radius:10px;padding:10px;background:#fff;box-shadow:0 4px 10px rgba(0, 0, 0, 0.2);">
            <div style="text-align:center;padding-bottom:5px;border-bottom:2px solid #FF9933;margin-bottom:8px;">
                <div style="display:flex;align-items:center;justify-content:center;gap:8px;">
                    <img src="https://mmtmcollege.ac.in/assets/img/logo.png" style="height:35px;width:35px;">
                    <div>
                        <h4 style="color:#c00;margin:0;">MAHARAJ MAHESH THAKUR MITHILA COLLEGE</h4>
                        <small style="display:block;font-size:11px;color:#555;">Darbhanga, Bihar - 846004 | Affiliated to L.N.M.U.</small>
                    </div>
                </div>
                <h4 style="margin-top:5px;font-size:16px;background:#FF9933;color:white;padding:3px 0;border-radius:4px;">IDENTITY CARD</h4>
            </div>
            
            <div style="display:flex;gap:15px;align-items:flex-start;font-size:13px;">
                <div style="width:85px;height:100px;border:1px solid #FF9933;border-radius:5px;overflow:hidden;flex-shrink:0;text-align:center;">
                    ${photoData ? `<img src="${photoData}" style="width:100%;height:100%;object-fit:cover">` : `<small style="font-size:10px;display:block;padding-top:40px;">Paste Photo</small>`}
                </div>
                
                <div style="flex:1;">
                    <div style="margin-bottom:4px;"><strong>Name:</strong> ${n}</div>
                    <div style="margin-bottom:4px;"><strong>Father's Name:</strong> ${fn}</div>
                    <div style="margin-bottom:4px;"><strong>Roll No:</strong> ${r}</div>
                    <div style="margin-bottom:4px;"><strong>Course:</strong> ${cr}</div>
                    <div style="margin-bottom:4px;"><strong>Session:</strong> ${s}</div>
                    <div style="margin-bottom:4px;"><strong>Mobile:</strong> ${m}</div>
                    <div style="margin-bottom:4px;"><strong>Address:</strong> ${a}</div>
                </div>
            </div>
            
            <div style="display:flex;justify-content:space-between;margin-top:15px;padding-top:8px;border-top:1px dotted #ccc;font-size:11px;">
                <div style="width:100px;text-align:center;">
                    <small style="border-top:1px solid #333;padding-top:2px;display:block;">Student's Signature</small>
                </div>
                <div style="width:100px;text-align:right;">
                    <small style="border-top:1px solid #333;padding-top:2px;display:block;">Principal's Signature & Seal</small>
                </div>
            </div>

          </div>`;
        prev.style.display='block';
    };


    // ** Print/Save Function **
    window.printIdCard = function() {
        const area = document.getElementById('printArea');
        if (!area) {
            alert('पहले Preview करें (Preview the ID first)');
            return;
        }

        const w = window.open('', '_blank', 'height=600,width=800');
        if (!w) {
            alert('पॉप-अप विंडो ब्लॉक है। कृपया इसे अनब्लॉक करें।');
            return;
        }
        
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Print ID Card</title>
              <style>
                @page { margin: 10mm; }
                body { font-family: Poppins, sans-serif; display: flex; justify-content: center; align-items: center; }
                .id-card-preview { width: 350px; border: 4px solid #138808; border-radius: 10px; padding: 10px; background: #fff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); }
              </style>
            </head>
            <body>
              ${area.outerHTML}
              <script>
                window.onload = function() { 
                    setTimeout(() => {
                        window.print(); 
                        window.close(); 
                    }, 200); 
                }
              </script>
            </body>
            </html>
        `;
        
        w.document.write(printContent);
        w.document.close();
    };
</script>
