function pop_up() {
    window.open("../popup/popup.html", "팝업테스트", "width=400, height=300, top=10 left=10");
}

function show_clock(){
    //현재 시스템 날짜 객체 생성
    let currentDate = new Date();
    let divClock = document.getElementById(`divClock`);
    let msg = "현재시간: ";

    // 12시보다 크면 오후, 작으면 오전
    if(currentDate.getHours() > 12){
        msg += "오후";
        msg += currentDate.getHours()-12+ "시"; 
    }
    else{
        msg += "오전";
        msg += currentDate.getHours()+ "시";
    }

    msg += currentDate.getMinutes() + "분";
    msg += currentDate.getSeconds() + "초";
    divClock.innerText = msg;

    // 정각 1분 전 빨간색 출력
    if(currentDate.getMinutes()>58){
        divClock.style.color="red";
    }

    // 1초마다 갱신
    setTimeout(show_clock, 1000);
}

function over(obj){
    obj.src="image/LOGO.svg";
}

function out(obj){
    obj.src="image/LOGO_2.png";
}