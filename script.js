// =================================================================
// 3. ID CARD GENERATOR LOGIC (FIXED)
// =================================================================

// 1. Photo Data Variable
let photoData = '';

document.addEventListener('DOMContentLoaded', () => {
    // 2. Event Listeners को DOM लोड होने के बाद सेट करें

    const idPhotoInput = document.getElementById('id_photo');
    const previewBtn = document.getElementById('previewBtn');
    const printBtn = document.getElementById('printBtn');
    const idPreviewDiv = document.getElementById('id_preview');

    // ** Photo Load Logic **
    if (idPhotoInput) {
        idPhotoInput.addEventListener('change', e => {
            const file = e.target.files[0]; 
            if (!file) return;
            const reader = new FileReader(); 
            reader.onload = () => photoData = reader.result;
            reader.readAsDataURL(file);
        });
    }

    // ** Preview Button Logic **
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            // Get Input Values (Ensure all IDs exist in your HTML)
            const n = document.getElementById('id_name')?.value || 'Student Name';
            const r = document.getElementById('id_roll')?.value || 'Roll No.';
            const fn = document.getElementById('id_father')?.value || 'Father Name';
            const s = document.getElementById('id_session')?.value || 'Session';
            const cr = document.getElementById('id_course')?.value || 'Course';
            const m = document.getElementById('id_mobile')?.value || 'Mobile No.';
            const a = document.getElementById('id_address')?.value || 'Address';
            
            const prev = idPreviewDiv;

            // ID Card HTML Structure 
            prev.innerHTML = `
              <div id="printArea" style="width:350px;border:4px solid var(--tiranga-green);border-radius:10px;padding:10px;background:#fff;box-shadow:0 4px 10px rgba(0, 0, 0, 0.2);">
                <div style="text-align:center;padding-bottom:5px;border-bottom:2px solid var(--tiranga-orange);margin-bottom:8px;">
                    <div style="display:flex;align-items:center;justify-content:center;gap:8px;">
                        <img src="https://mmtmcollege.ac.in/assets/img/logo.png" style="height:35px;width:35px;">
                        <div>
                            <h4 style="color:#c00;margin:0;">MAHARAJ MAHESH THAKUR MITHILA COLLEGE</h4>
                            <small style="display:block;font-size:11px;color:#555;">Darbhanga, Bihar - 846004 | Affiliated to L.N.M.U.</small>
                        </div>
                    </div>
                    <h4 style="margin-top:5px;font-size:16px;background:var(--tiranga-orange);color:white;padding:3px 0;border-radius:4px;">IDENTITY CARD</h4>
                </div>
                
                <div style="display:flex;gap:15px;align-items:flex-start;font-size:13px;">
                    <div style="width:85px;height:100px;border:1px solid var(--tiranga-orange);border-radius:5px;overflow:hidden;flex-shrink:0;">
                        ${photoData ? `<img src="${photoData}" style="width:100%;height:100%;object-fit:cover">` : `<small style="font-size:10px;">Paste Photo</small>`}
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
                    <div style="width:100px;text-align:center;"><br><small style="border-top:1px solid #333;padding-top:2px;display:block;">Student's Signature</small></div>
                    <div style="width:100px;text-align:right;"><br><small style="border-top:1px solid #333;padding-top:2px;display:block;">Principal's Signature & Seal</small></div>
                </div>

              </div>`;
            prev.style.display='block';
        });
    }

    // ** Print/Save Button Logic **
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            const area = document.getElementById('printArea');
            if (!area) {
                alert('कृपया पहले ID कार्ड का Preview (प्रीव्यू) करें।');
                return;
            }

            const w = window.open('', '', 'height=600,width=800');
            if (!w) {
                alert('पॉप-अप विंडो ब्लॉक है। कृपया इसे अनब्लॉक करें।');
                return;
            }
            
            // Print Logic
            const printContent = `
                <!DOCTYPE html>
                <html>
                <head>
                  <title>Print ID Card</title>
                  <style>
                    @page { margin: 10mm; }
                    body { font-family: Poppins, sans-serif; display: flex; justify-content: center; align-items: center; }
                    .id-card-preview { width: 350px; border: 4px solid #138808; border-radius: 10px; padding: 10px; background: #fff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); }
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
    }
}); // DOMContentLoaded end
