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



const login_check = () => {
    const login_fail_cnt = parseInt(getCookie("login_fail_cnt")) || 0;
    if (login_fail_cnt >= 3) {
        document.getElementById("login_status").innerText = "로그인 제한 상태입니다.";
        return false;
    }
    return true;
    
};
    
 function addJavascript(jsname){    // 자바스크립트 외부 연동
    var th = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', jsname);
    th.appendChild(s);
 }   

 addJavascript('/js/security.js');  // 암복호화 함수
 addJavascript('/js/cookie.js');  // 쿠키 함수
 addJavascript('/js/security.js');  // 세션 함수


