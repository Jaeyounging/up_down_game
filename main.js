
let randomNum = 0;
let checkButton = document.getElementById("check-button");
let userInput = document.getElementById("user-input");
let result = document.getElementById("result");
let resetButton = document.getElementById("reset");
let chanceArea = document.getElementById("chance");
let userNumList = [];

let chances = 5;
let gameOver = false;

checkButton.addEventListener("click", checkNum); // checkButton을 클릭했을 때, paly함수 실행
resetButton.addEventListener("click", reset); // resetButton을 클릭했을 때, reset함수 실행
userInput.addEventListener("focus", function () {userInput.value = "";}) // 입력칸에 마우스를 클릭하면 뒤에 함수 실행(익명함수)

// 1~100까지의 랜덤 번호 생성
function makeRandomNum() {
    randomNum = Math.floor(Math.random()*100) + 1; 
    console.log("정답: ", randomNum);
}

makeRandomNum();

// 입력 받은 숫자 확인
function checkNum() {
    let userValue = userInput.value;

    // 유효성 검사
    if (userValue < 1 || userValue > 100) {
        result.textContent = "Please enter a answer between 1 and 100"
        return;
    }
    
    // 동일한 값 입력 시, 처리
    if (userNumList.includes(userValue)) {
        result.textContent = "This value has already been entered. Please enter a different number.";
        return;
    }

    if (userValue < randomNum) {
        result.textContent = "UP!";
    } else if (userValue > randomNum) {
        result.textContent = "DOWN!";
    } else {
        result.textContent = "CORRECT!";    
        checkButton.disabled = true;
    }

    userNumList.push(userValue);
    
    chances--; // 숫자를 확인할 때 마다 기회가 1씩 감소
    chanceArea.textContent = `CHACNE : ${chances}`;

    if (chances < 1) {
        gameOver = true;
        result.textContent = "Game Over"
    }

    if (gameOver) {
        checkButton.disabled = true;
    }

}

// 게임을 다시 시작(초기화)
function reset() {
    userInput.value = ""; // userInput 창을 깨끗하게 비워줌
    makeRandomNum(); // 새로운 번호 생성
    checkButton.disabled = false; // 체크버튼이 비활성화 된 경우 풀어줌
    chanceArea.textContent = "CHANCE : 5" // 기회 초기화
    result.textContent = "Geuss the answer"
}