<script>
  /* =====================================================================
     MITHILA COLLEGE HELP - STANDARD QUALITY FIREBASE & RTPS ENGINE
     ===================================================================== */

  // --- 1. FIREBASE SETUP & INITIALIZATION ---
  const firebaseConfig = {
    apiKey: "AIzaSyBtLL0yVgt5hQwxokdsSRkeArZab5kyr_Q",
    authDomain: "mithilahelp-4107d.firebaseapp.com",
    projectId: "mithilahelp-4107d",
    storageBucket: "mithilahelp-4107d.firebasestorage.app",
    messagingSenderId: "525345376934",
    appId: "1:525345376934:web:7083c7cecccd26a4a78267"
  };

  let db = null;
  try {
    if (typeof firebase !== "undefined") {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      // Network error bypass (Long Polling)
      firebase.firestore().settings({
        experimentalForceLongPolling: true,
        useFetchStreams: false
      });
      db = firebase.firestore();
    }
  } catch (err) {
    console.warn("Firebase load nahi hua, LocalStorage fallback active hai:", err);
  }

  // --- 2. MULTI-INSTANCE CAPTCHA ENGINE (Har Form Ke Liye Alag Captcha) ---
  const captchaStore = {};

  function generateCaptcha(textId, inputId) {
    const textEl = document.getElementById(textId);
    const inputEl = document.getElementById(inputId);
    if (!textEl || !inputEl) return;

    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    captchaStore[inputId] = num1 + num2;

    textEl.innerText = `${num1} +${num2} = ?`;
    inputEl.value = "";
  }

  function checkCaptcha(inputId) {
    const inputEl = document.getElementById(inputId);
    if (!inputEl) return true;
    const userAns = parseInt(inputEl.value.trim(), 10);
    return userAns === captchaStore[inputId];
  }

  // --- 3. BIHAR 38 DISTRICTS, SUB-DIVISIONS & BLOCKS MASTER DATA ---
  const biharMasterData = {
    "Sitamarhi (सीतामढी)": {
      subDivs: ["Pupri (पूपरी)", "Sitamarhi Sadar (सीतामढी सदर)", "Belsand (बेलसंड)"],
      blocks: ["Bajpatti (बाजपट्टी)", "Pupri (पूपरी)", "Dumra (डुमरा)", "Bathnaha (बथनाहा)", "Riga (रीगा)", "Belsand (बेलसंड)", "Sonbarsa (सोनबरसा)", "Sursand (सुरसंड)", "Parihar (परिहार)", "Majorganj (मेजरगंज)", "Suppi (सुप्पी)", "Bairgania (बैर्गनिया)", "Runnisaidpur (रून्नीसैदपुर)", "Nanpur (नानपुर)", "Bokhra (बोखड़ा)", "Choraut (चोरौत)", "Parsauni (परसौनी)"]
    },
    "Darbhanga (दरभंगा)": {
      subDivs: ["Darbhanga Sadar (दरभंगा सदर)", "Benipur (बेनीपुर)", "Biraul (बिरौल)"],
      blocks: ["Darbhanga Sadar (दरभंगा सदर)", "Bahadurpur (बहादुरपुर)", "Jale (जाले)", "Keoti (केवटी)", "Benipur (बेनीपुर)", "Singhwara (सिंहवाड़ा)", "Hayaghat (हायाघाट)", "Manigachhi (मनीगाछी)", "Tardih (तारडीह)", "Alinagar (अलीनगर)", "Baheri (बहेड़ी)", "Biraul (बिरौल)", "Ghanshyampur (घनश्यामपुर)", "Gaura Bauram (गौड़ाबौराम)", "Kiratpur (किरतपुर)", "Kusheshwar Asthan (कुशेश्वरस्थान)", "Hanumannagar (हनुमाननगर)"]
    },
    "Madhubani (मधुबनी)": {
      subDivs: ["Madhubani (मधुबनी)", "Jhanjharpur (झंझारपुर)", "Benipatti (बेनीपट्टी)", "Jainagar (जयनगर)", "Phulparas (फुलपरास)"],
      blocks: ["Rahika (रहिका)", "Jhanjharpur (झंझारपुर)", "Benipatti (बेनीपट्टी)", "Jainagar (जयनगर)", "Phulparas (फुलपरास)", "Pandaul (पंडौल)", "Rajnagar (राजनगर)", "Khajauli (खजौली)", "Kaluahi (कलुआही)", "Babubarhi (बाबूबरही)", "Andhratharhi (अंधराठाढ़ी)", "Laukahi (लौकही)", "Ladania (लदनिया)", "Basopatti (बासोपट्टी)", "Harlakhi (हरलाखी)", "Madhwapur (मधवापुर)", "Bisfi (बिस्फी)", "Madhepur (मधेपुर)", "Lakhnaur (लखनौर)", "Ghoghardiha (घोघरडीहा)"]
    },
    "Muzaffarpur (मुजफ्फरपुर)": {
      subDivs: ["Muzaffarpur East (मुजफ्फरपुर पूर्वी)", "Muzaffarpur West (मुजफ्फरपुर पश्चिमी)"],
      blocks: ["Mushahari (मुशहरी)", "Kanti (काँटी)", "Kurhani (कुढ़नी)", "Bochaha (बोचहाँ)", "Sakra (सकरा)", "Motipur (मोतीपुर)", "Minapur (मीनापुर)", "Paroo (पारू)", "Sahebganj (साहेबगंज)", "Saraiya (सरैया)", "Marwan (मड़वन)", "Gaighat (गायघाट)", "Bandra (बंदरा)", "Aurai (औराई)", "Katra (कटरा)", "Muraul (मुरौल)"]
    },
    "Patna (पटना)": {
      subDivs: ["Patna Sadar (पटना सदर)", "Patna City (पटना सिटी)", "Danapur (दानापुर)", "Barh (बाढ़)", "Masaurhi (मसौढ़ी)", "Paliganj (पालीगंज)"],
      blocks: ["Patna Sadar (पटना सदर)", "Danapur (दानापुर)", "Phulwari Sharif (फुलवारी शरीफ)", "Barh (बाढ़)", "Masaurhi (मसौढ़ी)", "Bikram (बिक्रम)", "Paliganj (पालीगंज)", "Maner (मनेर)", "Bihta (बिहटा)", "Naubatpur (नौबतपुर)", "Sampatchak (संपतचक)", "Fatuha (फतवा)", "Bakhtiyarpur (बख्तियारपुर)", "Mokama (मोकामा)", "Punpun (पुनपुन)"]
    },
    "Samastipur (समस्तीपुर)": {
      subDivs: ["Samastipur Sadar (समस्तीपुर)", "Rosera (रोसड़ा)", "Dalsinghsarai (दलसिंहसराय)", "Patori (पटोरी)"],
      blocks: ["Samastipur (समस्तीपुर)", "Pusa (पूसा)", "Rosera (रोसड़ा)", "Dalsinghsarai (दलसिंहसराय)", "Kalyanpur (कल्याणपुर)", "Warisnagar (वारिसनगर)", "Sarairanjan (सरायरंजन)", "Tajpur (ताजपुर)", "Morwa (मोरवा)", "Patori (पटोरी)", "Ujiarpur (उजियारपुर)", "Bibhutipur (विभूतिपुर)", "Hasanpur (हसनपुर)"]
    },
    "Vaishali (वैशाली)": {
      subDivs: ["Hajipur (हाजीपुर)", "Mahua (महुआ)", "Mahnar (महनार)"],
      blocks: ["Hajipur (हाजीपुर)", "Mahua (महुआ)", "Lalganj (लालगंज)", "Raghopur (राघोपुर)", "Patepur (पातेपुर)", "Mahnar (महनार)", "Bidupur (बिदुपुर)", "Jandaha (जंदाहा)", "Goraul (गोरौल)", "Bhagwanpur (भगवानपुर)", "Vaishali (वैशाली)"]
    },
    "Gaya (गया)": { subDivs: ["Gaya Sadar", "Bodhgaya", "Sherghati", "Tekari"], blocks: ["Gaya Town", "Bodhgaya", "Tekari", "Sherghati", "Belaganj", "Wazirganj", "Manpur"] },
    "Bhagalpur (भागलपुर)": { subDivs: ["Bhagalpur Sadar", "Kahalgaon", "Naugachhia"], blocks: ["Jagdishpur", "Nathnagar", "Sultanganj", "Kahalgaon", "Naugachhia", "Sabour", "Pirpainti"] },
    "Purnia (पूर्णिया)": { subDivs: ["Purnia Sadar", "Banmankhi", "Dhamdaha", "Baisi"], blocks: ["Purnia East", "Kasba", "Banmankhi", "Dhamdaha", "Baisi", "Amour", "Rupauli"] },
    "Saran (सारण)": { subDivs: ["Chhapra Sadar", "Marhaura", "Sonpur"], blocks: ["Chhapra", "Marhaura", "Sonpur", "Dighwara", "Ekma", "Garkha", "Parsa", "Mashrakh"] },
    "Begusarai (बेगूसराय)": { subDivs: ["Begusarai", "Barauni", "Teghra", "Ballia", "Bakhri"], blocks: ["Begusarai", "Barauni", "Teghra", "Ballia", "Bakhri", "Matihani", "Bachhwara"] },
    "East Champaran (पूर्वी चंपारण)": { subDivs: ["Motihari", "Areraj", "Chakia", "Raxaul", "Dhaka", "Sikrahana"], blocks: ["Motihari", "Areraj", "Chakia", "Raxaul", "Dhaka", "Sugauli", "Kalyanpur"] },
    "West Champaran (पश्चिमी चंपारण)": { subDivs: ["Bettiah", "Bagaha", "Narkatiaganj"], blocks: ["Bettiah", "Bagaha", "Narkatiaganj", "Lauriya", "Chanpatia", "Majhaulia", "Ramnagar"] },
    "Nalanda (नालंदा)": { subDivs: ["Biharsharif", "Rajgir", "Hilsa"], blocks: ["Biharsharif", "Rajgir", "Hilsa", "Asthawan", "Islampur", "Chandi", "Harnaut"] },
    "Rohtas (रोहतास)": { subDivs: ["Sasaram", "Dehri", "Bikramganj"], blocks: ["Sasaram", "Dehri", "Bikramganj", "Nokha", "Chenari", "Kargahar"] },
    "Bhojpur (भोजपुर)": { subDivs: ["Arrah Sadar", "Jagdishpur", "Piro"], blocks: ["Arrah", "Jagdishpur", "Piro", "Koilwar", "Shahpur", "Bihiya"] },
    "Siwan (सीवान)": { subDivs: ["Siwan Sadar", "Maharajganj"], blocks: ["Siwan", "Maharajganj", "Mairwa", "Raghunathpur", "Barharia"] },
    "Saharsa (सहरसा)": { subDivs: ["Saharsa Sadar", "Simri Bakhtiarpur"], blocks: ["Kahara", "Simri Bakhtiarpur", "Saur Bazar", "Sonbarsa", "Mahishi"] },
    "Supaul (सुपौल)": { subDivs: ["Supaul", "Birpur", "Triveniganj", "Nirmali"], blocks: ["Supaul", "Basantpur", "Triveniganj", "Nirmali", "Raghopur", "Chhatapur"] },
    "Madhepura (मधेपुरा)": { subDivs: ["Madhepura", "Udakishunganj"], blocks: ["Madhepura", "Udakishunganj", "Singheshwar", "Bihariganj", "Murliganj"] },
    "Araria (अररिया)": { subDivs: ["Araria", "Forbesganj"], blocks: ["Araria", "Forbesganj", "Jokihat", "Raniganj", "Narpatganj"] },
    "Katihar (कटिहार)": { subDivs: ["Katihar", "Barsoi", "Manihari"], blocks: ["Katihar", "Manihari", "Barsoi", "Kadwa", "Korha", "Barari"] },
    "Kishanganj (किशनगंज)": { subDivs: ["Kishanganj"], blocks: ["Kishanganj", "Bahadurganj", "Thakurganj", "Kochadhaman", "Pothia"] },
    "Munger (मुंगेर)": { subDivs: ["Munger Sadar", "Kharagpur", "Tarapur"], blocks: ["Munger", "Jamalpur", "Kharagpur", "Tarapur", "Bariarpur"] },
    "Lakhisarai (लखीसराय)": { subDivs: ["Lakhisarai"], blocks: ["Lakhisarai", "Suryagarha", "Barahiya", "Halsi"] },
    "Sheikhpura (शेखपुरा)": { subDivs: ["Sheikhpura"], blocks: ["Sheikhpura", "Barbigha", "Ariari", "Shekhopur Sarai"] },
    "Jamui (जमुई)": { subDivs: ["Jamui"], blocks: ["Jamui", "Jhajha", "Sikandra", "Chakai", "Sono", "Khaira"] },
    "Khagaria (खगड़िया)": { subDivs: ["Khagaria", "Gogri"], blocks: ["Khagaria", "Gogri", "Parbatta", "Beldour", "Alauli", "Chautham"] },
    "Banka (बांका)": { subDivs: ["Banka"], blocks: ["Banka", "Amarpur", "Bounsi", "Katoria", "Rajaun", "Dhoraiya"] },
    "Nawada (नवादा)": { subDivs: ["Nawada", "Rajauli"], blocks: ["Nawada", "Rajauli", "Hisua", "Warisaliganj", "Pakribarawan"] },
    "Aurangabad (औरंगाबाद)": { subDivs: ["Aurangabad", "Daudnagar"], blocks: ["Aurangabad", "Daudnagar", "Nabinagar", "Rafiganj", "Obra", "Goh"] },
    "Jehanabad (जहानाबाद)": { subDivs: ["Jehanabad"], blocks: ["Jehanabad", "Makhdumpur", "Kako", "Ghosi", "Hulasganj"] },
    "Arwal (अरवल)": { subDivs: ["Arwal"], blocks: ["Arwal", "Kaler", "Karpi", "Kurtha"] },
    "Kaimur (कैमूर)": { subDivs: ["Bhabua", "Mohania"], blocks: ["Bhabua", "Mohania", "Ramgarh", "Chainpur", "Durgawati", "Kudra"] },
    "Buxar (बक्सर)": { subDivs: ["Buxar", "Dumraon"], blocks: ["Buxar", "Dumraon", "Rajpur", "Itarhi", "Chausa", "Brahmpur"] },
    "Gopalganj (गोपालगंज)": { subDivs: ["Gopalganj", "Hathua"], blocks: ["Gopalganj", "Hathua", "Baikunthpur", "Barauli", "Kuchaikote", "Bhorey"] },
    "Sheohar (शिवहर)": { subDivs: ["Sheohar"], blocks: ["Sheohar", "Piprahi", "Purnahiya", "Tariyani", "Dumri Katsari"] }
  };

  // --- 4. CASTE CATEGORIES & SERIAL NUMBERS (Bihar Act 1991 Format) ---
  const casteDatabase = {
    "BC-2": [
      { name: "कुशवाहा (कोईरी) / Kushwaha (Koiri)", serial: "4", schedule: "पिछड़ा वर्ग (अनुसूची-2)", title: "पिछड़ा वर्ग का जाति प्रमाण-पत्र / Caste Certificate of BC" },
      { name: "यादव (ग्वाला, अहीर) / Yadav", serial: "22", schedule: "पिछड़ा वर्ग (अनुसूची-2)", title: "पिछड़ा वर्ग का जाति प्रमाण-पत्र / Caste Certificate of BC" },
      { name: "कुर्मी / Kurmi", serial: "3", schedule: "पिछड़ा वर्ग (अनुसूची-2)", title: "पिछड़ा वर्ग का जाति प्रमाण-पत्र / Caste Certificate of BC" },
      { name: "बनिया (सूढ़ी, मोदक, मायरा) / Bania", serial: "19", schedule: "पिछड़ा वर्ग (अनुसूची-2)", title: "पिछड़ा वर्ग का जाति प्रमाण-पत्र / Caste Certificate of BC" },
      { name: "सोनार / Sonar", serial: "25", schedule: "पिछड़ा वर्ग (अनुसूची-2)", title: "पिछड़ा वर्ग का जाति प्रमाण-पत्र / Caste Certificate of BC" }
    ],
    "EBC-1": [
      { name: "मल्लाह (निषाद) / Mallah", serial: "40", schedule: "अत्यंत पिछड़ा वर्ग (अनुसूची-1)", title: "अत्यंत पिछड़ा वर्ग का जाति प्रमाण-पत्र / Caste Certificate of EBC" },
      { name: "तेली / Teli", serial: "115", schedule: "अत्यंत पिछड़ा वर्ग (अनुसूची-1)", title: "अत्यंत पिछड़ा वर्ग का जाति प्रमाण-पत्र / Caste Certificate of EBC" },
      { name: "कानू / Kanu", serial: "21", schedule: "अत्यंत पिछड़ा वर्ग (अनुसूची-1)", title: "अत्यंत पिछड़ा वर्ग का जाति प्रमाण-पत्र / Caste Certificate of EBC" },
      { name: "नाई (ठाकुर) / Nai", serial: "34", schedule: "अत्यंत पिछड़ा वर्ग (अनुसूची-1)", title: "अत्यंत पिछड़ा वर्ग का जाति प्रमाण-पत्र / Caste Certificate of EBC" },
      { name: "धानुक / Dhanuk", serial: "33", schedule: "अत्यंत पिछड़ा वर्ग (अनुसूची-1)", title: "अत्यंत पिछड़ा वर्ग का जाति प्रमाण-पत्र / Caste Certificate of EBC" },
      { name: "लोहार / Lohar", serial: "38", schedule: "अत्यंत पिछड़ा वर्ग (अनुसूची-1)", title: "अत्यंत पिछड़ा वर्ग का जाति प्रमाण-पत्र / Caste Certificate of EBC" }
    ],
    "SC": [
      { name: "चमार, मोची, रविदास / Chamar", serial: "6", schedule: "अनुसूचित जाति", title: "अनुसूचित जाति का प्रमाण-पत्र / Caste Certificate of SC" },
      { name: "दुसाध, पासवान / Dusadh (Paswan)", serial: "11", schedule: "अनुसूचित जाति", title: "अनुसूचित जाति का प्रमाण-पत्र / Caste Certificate of SC" },
      { name: "मुसहर / Musahar", serial: "18", schedule: "अनुसूचित जाति", title: "अनुसूचित जाति का प्रमाण-पत्र / Caste Certificate of SC" },
      { name: "धोबी (रजक) / Dhobi", serial: "9", schedule: "अनुसूचित जाति", title: "अनुसूचित जाति का प्रमाण-पत्र / Caste Certificate of SC" }
    ],
    "ST": [
      { name: "संथाल / Santhal", serial: "28", schedule: "अनुसूचित जनजाति", title: "अनुसूचित जनजाति का प्रमाण-पत्र / Caste Certificate of ST" },
      { name: "गोंड / Gond", serial: "12", schedule: "अनुसूचित जनजाति", title: "अनुसूचित जनजाति का प्रमाण-पत्र / Caste Certificate of ST" },
      { name: "थारू / Tharu", serial: "31", schedule: "अनुसूचित जनजाति", title: "अनुसूचित जनजाति का प्रमाण-पत्र / Caste Certificate of ST" }
    ]
  };

  // --- 5. NAVIGATION & SECTION TOGGLING ---
  function switchTab(tabId, el) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    const targetPanel = document.getElementById(tabId);
    if (targetPanel) targetPanel.classList.add('active');
    if (el) el.classList.add('active');

    if (tabId === 'user-tab') generateCaptcha('capLogText', 'capLogInput');
    if (tabId === 'dept-tab') generateCaptcha('capDeptText', 'capDeptInput');
    if (tabId === 'admin-tab') generateCaptcha('capAdmText', 'capAdmInput');
  }

  function toggleUserSections(sec) {
    ['user-reg', 'user-log', 'user-app'].forEach(s => {
      const box = document.getElementById(s);
      if (box) box.classList.add('hidden');
    });
    const activeSec = document.getElementById(sec);
    if (activeSec) activeSec.classList.remove('hidden');

    if (sec === 'user-reg') generateCaptcha('capRegText', 'capRegInput');
    if (sec === 'user-log') generateCaptcha('capLogText', 'capLogInput');
    if (sec === 'user-app') {
      generateCaptcha('capAppText', 'capAppInput');
      populateDistrictsDropdown();
    }
  }

  // --- 6. DYNAMIC DROPDOWNS (DISTRICTS -> SUBDIV -> BLOCK -> PANCHAYAT) ---
  function populateDistrictsDropdown() {
    const distEl = document.getElementById('vDistrict');
    if (!distEl || distEl.options.length > 2) return;

    distEl.innerHTML = '<option value="">-- जिला चुनें (Select District) --</option>';
    Object.keys(biharMasterData).forEach(dist => {
      const opt = document.createElement('option');
      opt.value = dist;
      opt.textContent = dist;
      distEl.appendChild(opt);
    });
  }

  function loadSubDivisions() {
    const dist = document.getElementById('vDistrict')?.value;
    const subDivEl = document.getElementById('vSubDiv');
    const blockEl = document.getElementById('vBlock');

    if (!subDivEl || !blockEl) return;
    subDivEl.innerHTML = '<option value="">-- अनुमंडल चुनें --</option>';
    blockEl.innerHTML = '<option value="">-- प्रखंड / अंचल चुनें --</option>';

    if (dist && biharMasterData[dist]) {
      biharMasterData[dist].subDivs.forEach(sd => {
        const opt = document.createElement('option');
        opt.value = sd;
        opt.textContent = sd;
        subDivEl.appendChild(opt);
      });

      biharMasterData[dist].blocks.forEach(blk => {
        const opt = document.createElement('option');
        opt.value = blk;
        opt.textContent = blk;
        blockEl.appendChild(opt);
      });
    }
  }

  function loadCastes() {
    const cat = document.getElementById('vCategory')?.value;
    const casteEl = document.getElementById('vCaste');
    if (!casteEl) return;

    casteEl.innerHTML = '';
    if (cat && casteDatabase[cat]) {
      casteDatabase[cat].forEach(c => {
        const opt = document.createElement('option');
        opt.value = `${c.name}\vert{}${c.serial}|${c.schedule}\vert{}${c.title}`;
        opt.textContent = `${c.name} (अनुक्रमांक: ${c.serial})`;
        casteEl.appendChild(opt);
      });
    } else {
      casteEl.innerHTML = '<option value="">-- पहले वर्ग (Category) चुनें --</option>';
    }
  }

  function updateFormDynamicFields() {
    const t = document.getElementById('appType')?.value;
    const casteBox = document.getElementById('caste-fields');
    const incomeBox = document.getElementById('income-fields');
    const resPhotoBox = document.getElementById('residence-photo-box');

    if (casteBox) casteBox.className = t === 'BCCCO' ? 'visible' : 'hidden';
    if (incomeBox) incomeBox.className = t === 'BICCO' ? 'visible' : 'hidden';
    if (resPhotoBox) resPhotoBox.className = t === 'BRCCO' ? 'visible' : 'hidden';
  }

  function sumIncome() {
    const g = parseInt(document.getElementById('incGov')?.value, 10) || 0;
    const b = parseInt(document.getElementById('incBiz')?.value, 10) || 0;
    const a = parseInt(document.getElementById('incAgri')?.value, 10) || 0;
    const o = parseInt(document.getElementById('incOther')?.value, 10) || 0;
    const totalEl = document.getElementById('incTotal');
    if (totalEl) totalEl.value = g + b + a + o;
  }

  // --- 7. AUTO ENGLISH TO HINDI TRANSLITERATION HELPER ---
  async function autoHindiTranslate(sourceId, targetId) {
    const srcEl = document.getElementById(sourceId);
    const destEl = document.getElementById(targetId);
    if (!srcEl || !destEl || !srcEl.value.trim()) return;

    try {
      const text = srcEl.value.trim();
      const url = `https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=hi-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8`;
      const res = await fetch(url);
      const data = await res.json();
      if (data[0] === "SUCCESS" && data[1]?.[0]?.[1]?.[0]) {
        destEl.value = data[1][0][1][0];
      }
    } catch (err) {
      if (!destEl.value) destEl.value = srcEl.value.trim();
    }
  }

  // --- 8. APPLICANT REGISTRATION & LOGIN HANDLERS ---
  async function handleRegistration(e) {
    e.preventDefault();
    if (!checkCaptcha('capRegInput')) {
      alert("गलत कैप्चा (Wrong Captcha)! कृपया सही जोड़ लिखें।");
      generateCaptcha('capRegText', 'capRegInput');
      return;
    }

    const mob = document.getElementById('regMob')?.value?.trim() || "";
    const email = document.getElementById('regEmail')?.value?.trim() || "";
    const pass = document.getElementById('regPass')?.value?.trim() || "";

    const userData = { mobile: mob, email: email, pass: pass, createdAt: new Date().toISOString() };

    // Save locally + Firebase
    const localUsers = JSON.parse(localStorage.getItem('mch_users') || '[]');
    localUsers.push(userData);
    localStorage.setItem('mch_users', JSON.stringify(localUsers));

    if (db) {
      try { await db.collection("Applicants").add(userData); } catch (e) { console.warn(e); }
    }

    alert("आवेदक अकाउंट सफलतापूर्वक बन गया! अब लॉगिन करें।");
    toggleUserSections('user-log');
  }

  function handleUserLogin(e) {
    e.preventDefault();
    if (!checkCaptcha('capLogInput')) {
      alert("गलत कैप्चा (Wrong Captcha)!");
      generateCaptcha('capLogText', 'capLogInput');
      return;
    }
    toggleUserSections('user-app');
  }

  // --- 9. APPLICATION SUBMISSION (SAVES FULL BIHAR GOVT CERTIFICATE DATA) ---
  async function handleApplication(e) {
    e.preventDefault();
    if (!checkCaptcha('capAppInput')) {
      alert("गलत कैप्चा (Wrong Captcha)!");
      generateCaptcha('capAppText', 'capAppInput');
      return;
    }

    const type = document.getElementById('appType')?.value || "BRCCO";
    const year = new Date().getFullYear();
    const randDigits = Math.floor(1000000 + Math.random() * 9000000);
    const certNo = `${type}/${year}/${randDigits}`;

    const now = new Date();
    const issueDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${year}`;
    const tokenNo = Math.random().toString(16).substring(2, 10).toUpperCase();

    const appRecord = {
      certNo: certNo,
      type: type,
      name: document.getElementById('vName')?.value?.trim() || "",
      nameHi: document.getElementById('vNameHi')?.value?.trim() || document.getElementById('vName')?.value?.trim() || "",
      father: document.getElementById('vFather')?.value?.trim() || "",
      fatherHi: document.getElementById('vFatherHi')?.value?.trim() || document.getElementById('vFather')?.value?.trim() || "",
      mother: document.getElementById('vMother')?.value?.trim() || "",
      motherHi: document.getElementById('vMotherHi')?.value?.trim() || document.getElementById('vMother')?.value?.trim() || "",
      district: document.getElementById('vDistrict')?.value || "सीतामढी",
      subDiv: document.getElementById('vSubDiv')?.value || "पूपरी",
      block: document.getElementById('vBlock')?.value || "बाजपट्टी",
      village: document.getElementById('vVillage')?.value?.trim() || "",
      ward: document.getElementById('vWard')?.value?.trim() || "05",
      post: document.getElementById('vPost')?.value?.trim() || "",
      thana: document.getElementById('vThana')?.value?.trim() || document.getElementById('vBlock')?.value || "",
      pincode: document.getElementById('vPin')?.value?.trim() || "843314",
      category: document.getElementById('vCategory')?.value || "BC-2",
      casteInfo: document.getElementById('vCaste')?.value || "कुशवाहा (कोईरी)|4|पिछड़ा वर्ग (अनुसूची-2)|पिछड़ा वर्ग का जाति प्रमाण-पत्र / Caste Certificate of BC",
      incGov: document.getElementById('incGov')?.value || "0",
      incBiz: document.getElementById('incBiz')?.value || "0",
      incAgri: document.getElementById('incAgri')?.value || "0",
      incOther: document.getElementById('incOther')?.value || "0",
      incTotal: document.getElementById('incTotal')?.value || "0",
      designation: document.getElementById('vDesignation')?.value || "हस्ताक्षर राजस्व अधिकारी / Signature Revenue Officer",
      issueDate: issueDate,
      tokenNo: tokenNo,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    // Save in LocalStorage for instant reliability
    const localApps = JSON.parse(localStorage.getItem('mch_applications') || '[]');
    localApps.unshift(appRecord);
    localStorage.setItem('mch_applications', JSON.stringify(localApps));

    // Save in Firebase Firestore
    if (db) {
      try {
        await db.collection("Applications").add(appRecord);
      } catch (error) {
        console.warn("Firebase save warning (saved locally):", error);
      }
    }

    alert(`आवेदन सफलतापूर्वक सबमिट हो गया!\nआपका Reference / Certificate No है: ${certNo}`);
    e.target.reset();
    toggleUserSections('user-log');
  }

  // --- 10. DEPARTMENT / OFFICER LOGIN & VERIFICATION DASHBOARD ---
  let activeOfficerName = "ABHISHEK ANAND";

  async function handleDeptLogin(e) {
    e.preventDefault();
    if (!checkCaptcha('capDeptInput')) {
      alert("गलत कैप्चा (Wrong Captcha)!");
      generateCaptcha('capDeptText', 'capDeptInput');
      return;
    }

    const enteredId = document.getElementById('deptId')?.value?.trim();
    const enteredPass = document.getElementById('deptPass')?.value?.trim();

    // 1. Default Built-in Officer Check (shreyajha / shreyajha821337)
    if (enteredId === "shreyajha" && enteredPass === "shreyajha821337") {
      loginOfficerSuccess("SHREYA JHA");
      return;
    }

    // 2. Check Firebase DepartmentUsers Collection
    if (db) {
      try {
        const snap = await db.collection("DepartmentUsers")
          .where("id", "==", enteredId)
          .where("pass", "==", enteredPass)
          .get();

        if (!snap.empty) {
          loginOfficerSuccess(snap.docs[0].data().name);
          return;
        }
      } catch (err) {
        console.warn("Firebase officer check fallback:", err);
      }
    }

    // 3. Check LocalStorage Officers
    const localOfficers = JSON.parse(localStorage.getItem('mch_officers') || '[]');
    const foundOff = localOfficers.find(o => o.id === enteredId && o.pass === enteredPass);
    if (foundOff) {
      loginOfficerSuccess(foundOff.name);
    } else {
      alert("अमान्य अधिकारी User ID या Password!");
      generateCaptcha('capDeptText', 'capDeptInput');
    }
  }

  function loginOfficerSuccess(officerName) {
    activeOfficerName = officerName.toUpperCase();
    const offNameEl = document.getElementById('officerName');
    if (offNameEl) offNameEl.innerText = activeOfficerName;

    document.getElementById('dept-login-box')?.classList.add('hidden');
    document.getElementById('dept-dash')?.classList.remove('hidden');
    loadDepartmentApplications();
  }

  async function loadDepartmentApplications() {
    let appList = JSON.parse(localStorage.getItem('mch_applications') || '[]');

    if (db) {
      try {
        const snap = await db.collection("Applications").get();
        if (!snap.empty) {
          appList = snap.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
          localStorage.setItem('mch_applications', JSON.stringify(appList));
        }
      } catch (err) {
        console.warn("Using cached applications:", err);
      }
    }

    const listContainer = document.getElementById('deptAppList') || document.getElementById('adminTableBody');
    if (!listContainer) return;

    listContainer.innerHTML = "";
    if (appList.length === 0) {
      listContainer.innerHTML = `<tr><td colspan="5" style="text-align:center;">कोई आवेदन पेंडिंग नहीं है।</td></tr>`;
      return;
    }

    appList.forEach((app, index) => {
      listContainer.innerHTML += `
