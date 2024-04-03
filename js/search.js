// document.getElementById("search_btn").addEventListener('click', search_message);

// function search_message(){
//     alert("검색을 수행합니다.");
// }


/*document.getElementById("search_button_msg").addEventListener('click', search_message);

function search_message(){
    alert("입력되었습니다");
    let message = "검색을 수행합니다";
    alert(message);
}*/




/*function googleSearch(){
    const searchTerm = document.getElementById("search_input").value; //검색어로 설정
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    window.open(googleSearchUrl, "_blank");
    return false;
}*/

function googleSearch(){
    const searchTerm = document.getElementById("search_input").value.trim(); // 검색어로 설정 및 양 끝의 공백 제거
    const forbiddenWords = ['바보', '멍청이', 'ㅅㅂ', '씨발', '개새끼']; // 비속어 배열
    
    // 검색어 공백 검사
    if (searchTerm.length === 0) {
        alert("검색어를 입력해주세요.");
        return false; // 함수 중단
    }
    
    // 비속어 검사
    for (let i = 0; i < forbiddenWords.length; i++) {
        if (searchTerm.includes(forbiddenWords[i])) {
            alert("비속어가 포함되어 있습니다.");
            return false; // 함수 중단
        }
    }
    
    // 비속어가 없으면 Google 검색 실행
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    window.open(googleSearchUrl, "_blank");
    return false;
}