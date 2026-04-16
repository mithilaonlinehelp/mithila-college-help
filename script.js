<script>
    // --- FIREBASE SETUP ---
    const firebaseConfig = {
      apiKey: "AIzaSyBtLL0yVgt5hQwxokdsSRkeArZab5kyr_Q",
      authDomain: "mithilahelp-4107d.firebaseapp.com",
      projectId: "mithilahelp-4107d",
      storageBucket: "mithilahelp-4107d.firebasestorage.app",
      messagingSenderId: "525345376934",
      appId: "1:525345376934:web:7083c7cecccd26a4a78267"
    };
    
    // 1. Firebase Initialize karein
    firebase.initializeApp(firebaseConfig);

    // 2. Network error bypass (Long Polling)
    firebase.firestore().settings({
        experimentalForceLongPolling: true, 
        useFetchStreams: false 
    });

    // 3. Database reference
    const db = firebase.firestore();

    // --- CAPTCHA ENGINE ---
    let n1, n2;
    function generateCaptcha(textId, inputId) {
        n1 = Math.floor(Math.random() * 9) + 1;
        n2 = Math.floor(Math.random() * 9) + 1;
        document.getElementById(textId).innerText = `${n1} + ${n2} = ?`;
        document.getElementById(inputId).value = "";
    }
    function checkCaptcha(inputId) {
        return parseInt(document.getElementById(inputId).value) === (n1 + n2);
    }

    // --- NAVIGATION ---
    function switchTab(tabId, el) {
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
        el.classList.add('active');
        if(tabId === 'user-tab') generateCaptcha('capLogText', 'capLogInput');
        if(tabId === 'dept-tab') generateCaptcha('capDeptText', 'capDeptInput');
        if(tabId === 'admin-tab') generateCaptcha('capAdmText', 'capAdmInput');
    }

    function toggleUserSections(sec) {
        ['user-reg', 'user-log', 'user-app'].forEach(s => document.getElementById(s).classList.add('hidden'));
        document.getElementById(sec).classList.remove('hidden');
        if(sec === 'user-reg') generateCaptcha('capRegText', 'capRegInput');
        if(sec === 'user-log') generateCaptcha('capLogText', 'capLogInput');
        if(sec === 'user-app') generateCaptcha('capAppText', 'capAppInput');
    }

    // --- DYNAMIC DATA ---
    function loadSubDivisions() {
        let dist = document.getElementById('vDistrict').value;
        let s = document.getElementById('vSubDiv');
        s.innerHTML = dist === 'Sitamarhi' ? '<option>Pupri</option><option>Sadar</option>' : '<option>Sadar</option>';
        document.getElementById('vBlock').innerHTML = '<option>Bajpatti</option><option>Riga</option>';
    }

    function loadCastes() {
        let cat = document.getElementById('vCategory').value;
        let c = document.getElementById('vCaste');
        if(cat === 'BC-2') c.innerHTML = '<option>Kushwaha (Koiri)</option><option>Yadav</option><option>Kurmi</option>';
        else if(cat === 'EBC-1') c.innerHTML = '<option>Mallah</option><option>Teli</option><option>Kanu</option>';
        else c.innerHTML = '<option>-- All Castes --</option>';
    }

    function updateFormDynamicFields() {
        let t = document.getElementById('appType').value;
        document.getElementById('caste-fields').className = t === 'BCCCO' ? 'visible' : 'hidden';
        document.getElementById('income-fields').className = t === 'BICCO' ? 'visible' : 'hidden';
    }

    function sumIncome() {
        let g = parseInt(document.getElementById('incGov').value) || 0;
        let a = parseInt(document.getElementById('incAgri').value) || 0;
        let b = parseInt(document.getElementById('incBiz').value) || 0;
        document.getElementById('incTotal').value = g + a + b;
    }

    // --- CORE HANDLERS ---
    function handleRegistration(e) {
        e.preventDefault();
        if(!checkCaptcha('capRegInput')) { alert("Wrong Captcha!"); generateCaptcha('capRegText', 'capRegInput'); return; }
        alert("Account Created!"); toggleUserSections('user-log');
    }

    function handleUserLogin(e) {
        e.preventDefault();
        if(!checkCaptcha('capLogInput')) { alert("Wrong Captcha!"); generateCaptcha('capLogText', 'capLogInput'); return; }
        toggleUserSections('user-app');
    }

    function handleApplication(e) {
        e.preventDefault();
        if(!checkCaptcha('capAppInput')) { alert("Wrong Captcha!"); generateCaptcha('capAppText', 'capAppInput'); return; }
        let type = document.getElementById('appType').value;
        let name = document.getElementById('vName').value;
        
        db.collection("Applications").add({ 
            name: name, 
            type: type, 
            status: "Pending" 
        }).then(() => {
            alert("Submitted to Department!"); 
            toggleUserSections('user-log');
        }).catch((error) => {
            console.error("Error submitting app: ", error);
            alert("Error: Database se connect nahi ho paya. Kripya apna internet connection check karein.");
        });
    }

    function handleDeptLogin(e) {
        e.preventDefault();
        if(!checkCaptcha('capDeptInput')) { alert("Wrong Captcha!"); generateCaptcha('capDeptText', 'capDeptInput'); return; }
        db.collection("DepartmentUsers").where("id", "==", document.getElementById('deptId').value)
          .where("pass", "==", document.getElementById('deptPass').value).get().then(snap => {
            if(!snap.empty) {
                document.getElementById('officerName').innerText = snap.docs[0].data().name;
                document.getElementById('dept-login-box').classList.add('hidden');
                document.getElementById('dept-dash').classList.remove('hidden');
            } else alert("Invalid Login!");
        }).catch((error) => {
            alert("Network Error! " + error.message);
        });
    }

    function handleAdminLogin(e) {
        e.preventDefault();
        if(!checkCaptcha('capAdmInput')) { alert("Wrong Captcha!"); generateCaptcha('capAdmText', 'capAdmInput'); return; }
        if(document.getElementById('admId').value === "shreyasingh" && document.getElementById('admPass').value === "shreyarani@#") {
            document.getElementById('admin-login-box').classList.add('hidden');
            document.getElementById('admin-dash').classList.remove('hidden');
        } else alert("Access Denied!");
    }

    function addDeptUser(e) {
        e.preventDefault();
        db.collection("DepartmentUsers").add({
            name: document.getElementById('addOffName').value,
            id: document.getElementById('addOffId').value,
            pass: document.getElementById('addOffPass').value
        }).then(() => { 
            alert("New Officer Created!"); 
            e.target.reset(); 
        }).catch((error) => {
            console.error("Error adding user: ", error);
            alert("Error: Internet block hone ki wajah se ID create nahi hui. " + error.message);
        });
    }

    function generateFinalCert() {
        let prefix = document.getElementById('appType').value || "CERT";
        let year = new Date().getFullYear();
        let rand = Math.floor(1000000 + Math.random() * 9000000);
        
        document.getElementById('certNoFinal').innerText = `${prefix}/${year}/${rand}`;
        document.getElementById('certTimeFinal').innerText = new Date().toLocaleString() + " +05:30";
        document.getElementById('certDesigFinal').innerText = `(${document.getElementById('vDesignation').value})`;
        document.getElementById('finalCertView').classList.remove('hidden');
    }

    window.onload = () => generateCaptcha('capLogText', 'capLogInput');
</script>
