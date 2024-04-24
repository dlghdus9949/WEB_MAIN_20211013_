const check_xss = (input) => {
    //DOMPurify 라이브러리 로드 (CND 사용)
    const DOMPurify = window.DOMPurify;

    //입력 값을 DOMPurify로 sanitize
    const sanitizedInput = DOMPurify.sanitize(input);

    //Sanitized된 값과 원본 입력 값 비교
    if(sanitizedInput !== input){
        //XXS 공격 가능성 발견 시 에러 처리
        alert('XXS 공격 가능성이 있는 입력값을 발견했습니다.')
        return false;
    }

    //Sanitized된 값 반환
    return sanitizedInput;
}

const check_input = () => {
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');

    const c = '아이디, 패스워드를 체크합니다';
    alert(c);

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if(emailValue === ''){
        alert('이메일을 입력하세요');
        return false;
    }

    if(passwordValue ===''){
        alert('비밀번호를 입력하세요');
        return false;
    }

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);
    loginForm.submit();

    if(emailValue.length < 5){
        alert('아이디는 최소 5글자 이상 입력해야 합니다.')
        return false;
    }

    if(emailValue.length > 10){
        alert('아이디는 10글자 이하로 입력해야 합니다.')
    }


    if(passwordValue.length < 12){
        alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.')
        return false;
    }

    if(passwordValue.length > 15){
        alert('패스워드는 15글자 이하로 입려해야 합니다.')
    }

    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if(!hasSpecialChar){
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
        return false;
    }

    const hasUpperCase = passwordValue.match(/[A-Z]+/) !==null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !==null;
    if(!hasUpperCase || !hasLowerCase){
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        return false;
    }

    const pattern1 = /(\w)\1\1/; // 3글자 이상 반복되는 문자열을 검사하는 정규표현식
    if(pattern1.test(passwordValue)){
        alert('비밀번호에 3글자 이상 반복되는 문자를 사용할 수 없습니다.');
        return false;
    }

    const pattern2 = /(0{2,}|1{2,}|2{2,}|3{2,}|4{2,}|5{2,}|6{2,}|7{2,}|8{2,}|9{2,})/; // 연속된 숫자를 검사하는 정규표현식
    if(pattern2.test(passwordValue)){
        alert('비밀번호에 연속된 숫자를 2개 이상 반복하여 사용할 수 없습니다.');
        return false;
    }


    const sanitizedPassword = check_xss(passwordValue);
    //chech_xss 함수로 비밀번호 Sanitize
    const sanitizedEmail = check_xss(emailValue);
    //chech_xss 함수로 이메일 Sanitize

    if (!sanitizedEmail) {
        //Sanitize된 비밀번호 사용
        return false;
    }

    if(!sanitizedPassword){
        //Sanitize된 비밀번호 사용
        return false;
    }
};

document.getElementById("login_btn").addEventListener('click', check_input);