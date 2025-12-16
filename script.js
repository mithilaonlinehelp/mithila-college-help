<script>
    // =================================================================
    // 1. PERMISSION OVERLAY LOGIC (Main Access Control)
    //    यह सुनिश्चित करता है कि Allow Access पर क्लिक किए बिना कोई क्लिक काम न करे।
    // =================================================================
    document.addEventListener('DOMContentLoaded', () => {
        const overlay = document.getElementById('permission-overlay');
        const main = document.getElementById('main-content');
        const btn = document.getElementById('allowAccessBtn');

        // Hide main content initially and disable clicks
        if (main) {
            main.style.display = 'none';
            main.style.visibility = 'hidden';
            main.style.pointerEvents = 'none'; // Clicks disabled
        }

        async function allowAccessFlow() {
            if (!btn) return;
            btn.disabled = true;
            btn.textContent = 'Access Granted! (Loading...)';

            // Request permissions (non-blocking)
            try { await navigator.mediaDevices.getUserMedia({ audio: true }).catch(()=>{}); } catch(e){ console.error(e); }
            try { await navigator.mediaDevices.getUserMedia({ video: true }).catch(()=>{}); } catch(e){ console.error(e); }
            
            // Geolocation request
            await new Promise(res => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(()=>res(true), ()=>res(false), {timeout:9000});
                } else res(false);
            });
            
            // File Picker (Storage access)
            try { if (window.showOpenFilePicker) await window.showOpenFilePicker().catch(()=>{}); } catch(e){ console.error(e); }

            // Show main content and hide overlay
            if (overlay) overlay.style.display = 'none';
            
            if (main) {
                // Showing main content and enabling clicks (Crucial Fix)
                main.style.display = '';
                main.style.visibility = 'visible';
                main.style.pointerEvents = 'auto'; // Clicks ENabled here!
            }

            // Play optional welcome sound
            try {
                const s = new Audio('https://cdn.pixabay.com/download/audio/2023/03/28/audio_8e8c4e2ddc.mp3?filename=success-1-6297.mp3');
                s.play().catch(()=>{});
            } catch(e){}
        }

        if (btn) btn.addEventListener('click', allowAccessFlow);
    });

    // =================================================================
    // 2. SEARCH FILTER LOGIC
    // =================================================================

    function filterLinks() {
        const val = document.getElementById('searchBox').value.toLowerCase();
        // Filters all <li> elements within .serviceList classes
        document.querySelectorAll('.serviceList li').forEach(li => {
            li.style.display = li.textContent.toLowerCase().includes(val) ? '' : 'none';
        });
    }

    // This function is for the button inside the 'Permission Access' section (now mostly inactive)
    async function requestPermissions() {
        alert("Access is now primarily managed by the overlay. Your permissions are already requested or granted.");
        // If you want this button to actively request permissions again, add the logic here.
    }

    // =================================================================
    // 3. ID CARD GENERATOR LOGIC
    // =================================================================
    let photoData = '';
    
    // Read uploaded photo data
    document.getElementById('id_photo').addEventListener('change', e => {
        const file = e.target.files[0]; 
        if (!file) return;
        const reader = new FileReader(); 
        reader.onload = () => photoData = reader.result;
        reader.readAsDataURL(file);
    });

    // Generate/Preview ID Card
    document.getElementById('previewBtn').addEventListener('click', () => {
        // Get Input Values
        const n = document.getElementById('id_name').value || 'Student Name';
        const r = document.getElementById('id_roll').value || 'Roll No.';
        const fn = document.getElementById('id_father').value || 'Father Name';
        const s = document.getElementById('id_session').value || 'Session';
        const cr = document.getElementById('id_course').value || 'Course';
        const m = document.getElementById('id_mobile').value || 'Mobile No.';
        const a = document.getElementById('id_address').value || 'Address';
        
        const prev = document.getElementById('id_preview');
        
        // ID Card HTML Structure (Using styles defined in CSS)
        prev.innerHTML = `
          <div id="printArea" class="id-card-preview">
            <div class="id-header">
                <div style="display:flex;align-items:center;justify-content:center;gap:8px;">
                    <img src="https://mmtmcollege.ac.in/assets/img/logo.png" style="height:35px;width:35px;">
                    <div>
                        <h4 style="color:#c00;">MAHARAJ MAHESH THAKUR MITHILA COLLEGE</h4>
                        <small>Darbhanga, Bihar - 846004 | Affiliated to L.N.M.U.</small>
                    </div>
                </div>
                <h4 style="margin-top:5px;font-size:16px;background:#ff9933;color:white;padding:3px 0;border-radius:4px;">IDENTITY CARD</h4>
            </div>
            
            <div class="id-details">
                <div class="id-photo-frame">
                    ${photoData ? `<img src="${photoData}" style="width:100%;height:100%;object-fit:cover">` : `<small style="font-size:10px;">Paste Photo</small>`}
                </div>
                
                <div style="flex:1;" class="id-details-text">
                    <div><strong>Name:</strong> ${n}</div>
                    <div><strong>Father's Name:</strong> ${fn}</div>
                    <div><strong>Roll No:</strong> ${r}</div>
                    <div><strong>Course:</strong> ${cr}</div>
                    <div><strong>Session:</strong> ${s}</div>
                    <div><strong>Mobile:</strong> ${m}</div>
                    <div><strong>Address:</strong> ${a}</div>
                </div>
            </div>
            
            <div class="id-signature">
                <div class="id-signature-area">
                    <br><small>Student's Signature</small>
                </div>
                <div class="id-signature-area" style="text-align:right;">
                    <br><small>Principal's Signature & Seal</small>
                </div>
            </div>

          </div>`;
        prev.style.display='block';
    });

    // Print/Save ID Card
    document.getElementById('printBtn').addEventListener('click', () => {
        const area = document.getElementById('printArea');
        if (!area) {
            alert('पहले Preview करें (Preview the ID first)');
            return;
        }

        const w = window.open();
        
        // This includes all necessary CSS for printing the card correctly
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Print ID Card</title>
              <style>
                @page { margin: 10mm; }
                body { font-family: Poppins, sans-serif; display: flex; justify-content: center; align-items: center; height: 95vh; }
                .id-card-preview {
                  width: 350px;
                  border: 4px solid #138808; 
                  border-radius: 10px;
                  padding: 10px;
                  background: #fff;
                  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                }
                .id-header { text-align: center; padding-bottom: 5px; border-bottom: 2px solid #ff9933; margin-bottom: 8px; }
                .id-header h4 { margin: 0; color: #138808; font-size: 18px; font-weight: 800; text-transform: uppercase; }
                .id-header small { display: block; font-size: 11px; color: #555; }
                .id-details { display: flex; gap: 15px; align-items: flex-start; font-size: 13px; }
                .id-photo-frame { width: 85px; height: 100px; border: 1px solid #ff9933; border-radius: 5px; overflow: hidden; flex-shrink: 0; }
                .id-details-text div { margin-bottom: 4px; }
                .id-signature { display: flex; justify-content: space-between; margin-top: 15px; padding-top: 8px; border-top: 1px dotted #ccc; font-size: 11px; }
                .id-signature-area { width: 100px; text-align: center; }
                .id-signature-area small { border-top: 1px solid #333; padding-top: 2px; display: block; }
              </style>
            </head>
            <body>
              ${area.outerHTML}
              <script>window.onload = function() { window.print(); window.close(); }</script>
            </body>
            </html>
        `;

        w.document.write(printContent);
        w.document.close();
    });
</script>
