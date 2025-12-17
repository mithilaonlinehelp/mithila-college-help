<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

<script>
let photoData = "";

/* ================= PHOTO ================= */
document.getElementById("id_photo")?.addEventListener("change", e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
        photoData = r.result;
        previewIdCard();
    };
    r.readAsDataURL(f);
});

/* ================= PREVIEW ================= */
function previewIdCard() {
    const v = id => document.getElementById(id)?.value || "";
    const cardNo = "MMTM-" + (v("id_univroll") || "0000");

    document.getElementById("id_preview").style.display = "block";
    document.getElementById("id_preview").innerHTML = `

<div id="printArea" style="display:flex;gap:20px;flex-wrap:wrap">

<!-- FRONT -->
<div style="width:360px;border:4px solid #198754;border-radius:14px;padding:12px;background:#fff;font-family:Poppins">

<h4 style="text-align:center;margin:0;color:#c00">
MAHARAJ MAHESH THAKUR MITHILA COLLEGE
</h4>
<small style="display:block;text-align:center">Darbhanga, Bihar</small>

<hr>

<div style="display:flex;gap:10px;font-size:13px">
<div style="width:95px;height:120px;border:1px solid #ff9933">
${photoData
? `<img src="${photoData}" style="width:100%;height:100%;object-fit:cover">`
: `<small style="display:block;text-align:center;margin-top:50px">Photo</small>`}
</div>

<div>
<div><b>Name:</b> ${v("id_name")}</div>
<div><b>Father:</b> ${v("id_father")}</div>
<div><b>Course:</b> ${v("id_course")}</div>
<div><b>Session:</b> ${v("id_session")}</div>
<div><b>Mobile:</b> ${v("id_mobile")}</div>
<div><b>Univ Roll:</b> ${v("id_univroll")}</div>
<div><b>Card No:</b> ${cardNo}</div>
</div>
</div>
</div>

<!-- BACK -->
<div style="width:360px;border:4px solid #0d6efd;border-radius:14px;padding:12px;background:#f8f9fa;font-family:Poppins">

<h4 style="text-align:center;margin:0">OFFICIAL INFO</h4>
<hr>

<p style="font-size:13px"><b>Address:</b><br>${v("id_address")}</p>

<div id="qrBox" style="width:120px;height:120px;margin:auto"></div>
<small style="display:block;text-align:center">Scan QR</small>

</div>
</div>
`;

    setTimeout(() => generateQR(cardNo), 200);
}

/* ================= QR ================= */
function generateQR(text) {
    const box = document.getElementById("qrBox");
    if (!box) return;
    box.innerHTML = "";
    new QRCode(box, {
        text: text,
        width: 120,
        height: 120
    });
}

/* ================= PDF ================= */
function downloadPDF() {
    const area = document.getElementById("printArea");
    if (!area) return alert("पहले Preview करें");

    html2pdf().from(area).set({
        filename: "MMTM_College_ID_Card.pdf",
        html2canvas: { scale: 3 }
    }).save();
}
</script>
