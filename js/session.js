/* function session_set() {
    let session_id = document.querySelector("#typeEmailX");       // DOM 트리에서 id 검색
    let session_pass = document.querySelector('#typePasswordX');    // DOM트리에서 pass 검색
    if (sessionStorage) {
        sessionStorage.setItem("Session_Storage_id", session_id.value);
        sessionStorage.setItem("Session_Storage_pass", encrypt_text(session_pass.value));
    } else {
        alert("로컬 스토리지 지원X");
    }
}

const sanitizedPassword = check_xss(passwordValue); 
const sanitizedEmail = check_xss(emailValue);*/

function session_set(){
    let id = document.querySelector("#typeEmailX");
    let password = document.querySelector("#typePasswordX");
    let random = new Date();    // 랜덤 타임스탬프

    const obj = {
        id: id.value,
        otp: random
    }

    if(sessionStorage){
        const objString = JSON.stringify(obj);  // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString);  // 암호화
        sessionStorage.setItem("Session_Storag_object", objString);
        sessionStorage.setItem("Session_Storage_encrypted", en_text);
    } else {
        alert("세션 스토리지 지원 X");
    }
}

function session_get() {
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_encrypted");
    } else {
        alert("세션 스토리지 지원 X");
        return null;
    }
}

function session_check() {
    if (sessionStorage.getItem("Session_Storage_id")) {
        alert("이미 로그인 되었습니다.");
        location.href = '../login/index_login.html';
    }
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


    /* if (!sanitizedEmail || !sanitizedPassword) {
        return false;
    } */

    window.location.href = 'index_login.html';
    maintainLogin();
};

window.onload = function(){
    init();     // 기존 초기화 함수 호출
    maintainLogin();    // 로그인 시 로그인 유지 시작
    document.getElementById("login_btn").addEventListener('click', check_input);
};

function decrypt_text(encryptedData) {
    const k = "key"; // 서버의 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const b = decodeByAES256(rk, encryptedData);
    return b;
}

function init_logined(){
    if(sessionStorage){
        const encryptedData = session_get();
        if (encryptedData) {
            const decryptedData = decrypt_text(encryptedData);
            console.log(decryptedData);
        } else {
            console.log("No encrypted data found in session storage.");
        }
    } else {
        alert("세션 스토리지 지원X");
    }
}



function session_join_set(){ //세션 저장(객체)    
        let f_name = document.querySelector("#firstName").value;
        let l_name = document.querySelector("#lastName").value;
        let b_day = document.querySelector("#birthdayDate").value;
        let gender = document.querySelector("#inlineRadioOptions");
        let email = document.querySelector("#emailAddress").value;
        let p_number = document.querySelector("#phoneNumber").value;
        let class_check = document.querySelector(".select form-control-lg");
        let random = new Date(); // 랜덤 타임스탬프

        const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
        console.log(newSignUp.fullName); // John Doe
        console.log(newSignUp.contactInfo); // johndoe@email.com 123-456-7890

        if (sessionStorage) {
            const objString = JSON.stringify(newSignUp); // 객체 -> JSON 문자열 변환
            let en_text = encrypt_text(objString); // 암호화
            sessionStorage.setItem("Session_Storage_new_user", objString);
            sessionStorage.setItem("Session_Storage_new_user_encryted", en_text);
        } else {
            alert("세션 스토리지 지원 x");
        }  
    }

    function session_join_get() {
        const encryptedData = sessionStorage.getItem("Session_Storage_new_user_encryted");
        if (encryptedData) {
            const decryptedData = decrypt_text(encryptedData);
            if (decryptedData) {
                const userData = JSON.parse(decryptedData);
                console.log(userData);
            } else {
                console.log("Failed to decrypt data.");
            }
        } else {
            console.log("No user data found in session storage.");
        }
    }