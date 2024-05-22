const check_xss = (input) => {
    const DOMPurify = window.DOMPurify;
    const sanitizedInput = DOMPurify.sanitize(input);
    if (sanitizedInput !== input) {
        alert('XXS 공격 가능성이 있는 입력값을 발견했습니다.');
        return false;
    }
    return sanitizedInput;
};

let logoutTimer;    // 전역 변수로 로그아웃 타이머 선언
function maintainLogin(){
    logoutTimer = setTimeout(logout, 5*60*1000);    // 5분 후에 logout함수 호출
}

// 로그아웃 함수
function logout(){
    sessionStorage.clear(); // 세션 스토리지 초기화
    alert("5분이 지나 자동 로그아웃되었습니다.")
    location.href = '../index.html';
}

// 로그아웃 타이머 재설정 함수
function resetLogoutTimer(){
    clearTimeout(logoutTimer);  // 이전 타이머 클리어
    maintainLogin();
}


function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

const init = () => {
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    const get_id = getCookie("id");
    if (get_id) {
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
    session_check();
};

const login_count = () => {
    let login_cnt = getCookie("login_cnt");
    login_cnt = login_cnt ? parseInt(login_cnt) + 1 : 1;
    setCookie("login_cnt", login_cnt, 365);
};

const login_failed = () => {
    let login_fail_cnt = getCookie("login_fail_cnt");
    login_fail_cnt = login_fail_cnt ? parseInt(login_fail_cnt) + 1 : 1;
    if (login_fail_cnt >= 3) {
        alert("로그인을 3회 실패하여 로그인이 제한되었습니다.");
        document.getElementById("login_status").innerText = "로그인 제한 상태입니다.";
        return;
    }
    setCookie("login_fail_cnt", login_fail_cnt, 365);
};

const check_input = () => {
    const loginForm = document.getElementById('login_form');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    const idsave_check = document.getElementById('idSaveCheck');

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue === '' && passwordValue === '') {
        alert('아이디와 비밀번호를 모두 입력해주세요');
        return false;
    } else {
        session_set();
    }

    if (emailValue === '') {
        alert('아이디를 입력하세요');
        return false;
    }

    if (passwordValue === '') {
        alert('비밀번호를 입력하세요');
        return false;
    }

    if (idsave_check.checked) {
        setCookie("id", emailValue, 1);
        alert("쿠키 값 : " + emailValue);
    } else {
        setCookie("id", "", 0);
    }

    if (!login_check(emailValue, passwordValue)) {
        login_failed();
        return false;
    }

    login_count();
    if (emailValue.length < 5) {
        alert('아이디는 최소 5글자 이상 입력해야 합니다.');
        return false;
    }

    if (emailValue.length > 20) {
        alert('아이디는 20글자 이하로 입력해야 합니다.');
    }

    if (passwordValue.length < 10) {
        alert('비밀번호는 반드시 10글자 이상 입력해야 합니다.');
        return false;
    }

    if (passwordValue.length > 30) {
        alert('패스워드는 30글자 이하로 입력해야 합니다.');
    }

    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
        return false;
    }

    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        return false;
    }

    const pattern1 = /(\w)\1\1/;
    if (pattern1.test(passwordValue)) {
        alert('비밀번호에 3글자 이상 반복되는 문자를 사용할 수 없습니다.');
        return false;
    }

    const pattern2 = /(0{2,}|1{2,}|2{2,}|3{2,}|4{2,}|5{2,}|6{2,}|7{2,}|8{2,}|9{2,})/;
    if (pattern2.test(passwordValue)) {
        alert('비밀번호에 연속된 숫자를 2개 이상 반복하여 사용할 수 없습니다.');
        return false;
    }

    const sanitizedPassword = check_xss(passwordValue);
    const sanitizedEmail = check_xss(emailValue);

    if (!sanitizedEmail || !sanitizedPassword) {
        return false;
    }

    window.location.href = 'index_login.html';
    maintainLogin();
};

const login_check = () => {
    const login_fail_cnt = parseInt(getCookie("login_fail_cnt")) || 0;
    if (login_fail_cnt >= 3) {
        document.getElementById("login_status").innerText = "로그인 제한 상태입니다.";
        return false;
    }
    return true;
    
};

function session_set() {
    let session_id = document.querySelector("#typeEmailX");       // DOM 트리에서 id 검색
    let session_pass = document.querySelector('#typePasswordX');    // DOM트리에서 pass 검색
    if (sessionStorage) {
        sessionStorage.setItem("Session_Storage_id", session_id.value);
        sessionStorage.setItem("Session_Storage_pass", encrypt_text);
    } else {
        alert("로컬 스토리지 지원X");
    }
}

function session_get() {
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_pass");
    } else {
        alert("세션 스토리지 지원 X");
    }
}

function session_check() {
    if (sessionStorage.getItem("Session_Storage_id")) {
        alert("이미 로그인 되었습니다.");
        location.href = '../login/index_login.html';
    }
}

function encodeByAES256(key, data){
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(""),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

function decodeByAES256(key, data){
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(""),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}
    
function encrypt_text(password){
    const k = "key"; // 클라이언트 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
    console.log(eb);
}

function decrypt_text(){
    const k = "key"; // 서버의 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb);
    console.log(b);
}

function init_logined(){
    if(sessionStorage){
        decrypt_text(); // 복호화 함수
    } else {
        alert("세션 스토리지 지원X");
    }
}
    
    

document.getElementById("login_btn").addEventListener('click', check_input);
window.onload = function(){
    init();     // 기존 초기화 함수 호출
    maintainLogin();    // 로그인 시 로그인 유지 시작
};