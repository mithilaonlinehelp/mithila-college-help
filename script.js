<script>
let photoData = "";

/* ================= PREVIEW ================= */
function previewIdCard() {
    const v = id => document.getElementById(id).value || "";
    const cardNo = "MMTM-" + v("id_univroll");

    document.getElementById("id_preview").style.display = "block";
    document.getElementById("id_preview").innerHTML = `

<div id="printArea" style="display:flex;gap:20px;flex-wrap:wrap">

<!-- ================= FRONT ================= -->
<div style="width:360px;border:4px solid #198754;border-radius:14px;
padding:12px;font-family:Poppins;background:#fff">

<div style="text-align:center;border-bottom:2px solid #ff9933">
<h3 style="margin:0;color:#c00">MAHARAJ MAHESH THAKUR</h3>
<h4 style="margin:0">MITHILA COLLEGE, DARBHANGA</h4>
<small>(Affiliated to L.N.M.U.)</small>
<div style="background:#ff9933;color:#fff;border-radius:6px;margin:6px 0">
STUDENT IDENTITY CARD
</div>
</div>

<div style="display:flex;gap:10px;margin-top:10px;font-size:13px">
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
<div><b>University Roll:</b> ${v("id_univroll")}</div>
<div><b>Card No:</b> ${cardNo}</div>
</div>
</div>

<p style="margin-top:8px;font-size:11px;text-align:center;color:#333">
यह पहचान पत्र <b>महाराज महेश ठाकुर मिथिला कॉलेज, दरभंगा</b> द्वारा जारी किया गया है।
</p>
</div>

<!-- ================= BACK ================= -->
<div style="width:360px;border:4px solid #0d6efd;border-radius:14px;
padding:12px;font-family:Poppins;background:#f8f9fa">

<h4 style="margin:0;text-align:center">OFFICIAL INFORMATION</h4>
<hr>

<p style="font-size:13px">
<b>Address:</b><br>${v("id_address")}
</p>

<p style="font-size:13px">
<b>University Roll:</b> ${v("id_univroll")}<br>
<b>Card No:</b> ${cardNo}
</p>

<div id="qrBox" style="margin:auto;width:120px;height:120px"></div>

<small style="display:block;text-align:center;margin-top:6px">
Scan QR for verification
</small>

<p style="font-size:11px;text-align:center;margin-top:8px">
This ID card is officially issued by<br>
<b>Maharaj Mahesh Thakur Mithila College, Darbhanga</b>
</p>

</div>
</div>
`;

    setTimeout(() => generateQR(cardNo), 200);
}

/* ================= QR ================= */
function generateQR(cardNo) {
    document.getElementById("qrBox").innerHTML = "";
    new QRCode(document.getElementById("qrBox"), {
        text:
`Issued by Maharaj Mahesh Thakur Mithila College, Darbhanga
Name: ${id_name.value}
University Roll: ${id_univroll.value}
Card No: ${cardNo}`,
        width: 120,
        height: 120
    });
}

/* ================= PDF ================= */
function downloadPDF() {
    const area = document.getElementById("printArea");
    if (!area) return alert("पहले Preview करें");

    html2pdf().from(area).set({
        margin: 5,
        filename: "MMTM_College_ID_Card.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
    }).save();
}

/* ================= PHOTO ================= */
document.getElementById("id_photo").addEventListener("change", e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => { photoData = r.result; previewIdCard(); };
    r.readAsDataURL(f);
});
</script>
