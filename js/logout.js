const logout = () => {
    alert('로그아웃 합니다');

    session_del();
    location.href = '../index.html';
};

// 로그아웃 횟수 증가 함수
const logout_count = () => {
    let logout_cnt = getCookie("logout_cnt");
    if (logout_cnt) {
        logout_cnt = parseInt(logout_cnt);
        logout_cnt++;
    } else {
        logout_cnt = 1;
    }
    setCookie("logout_cnt", logout_cnt, 365); // 1년간 유지되는 쿠키
}

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById("logout_btn");
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logout_count();
            logout();
        });
    } else {
        console.error('Logout button not found');
    }
});

// 세션 삭제
function session_del() {
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_id");
        sessionStorage.removeItem("Session_Storage_pass");
        alert("로그아웃 버튼 클릭 확인: 세션 스토리지를 삭제합니다");
    } else {
        alert("세션 스토리지 지원X");
    }
}

// 쿠키 삭제 함수
function cookie_del(){
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
}

// 쿠키 설정 함수 (로그아웃에서 필요할 경우)
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 쿠키 값 가져오기 함수 (로그아웃에서 필요할 경우)
function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}
