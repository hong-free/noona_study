let computerNum = 0;

let inputArea = document.getElementById("input-area");
let buttonGo = document.getElementById("play-button");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");

let buttonReset = document.getElementById("reset-button");
let chance = 3;
let gameOver = false;
let history = []


buttonGo.addEventListener("click", play);
buttonReset.addEventListener("click", reset);
inputArea.addEventListener("focus", function () { inputArea.value = "" })


function pickRandomnum() {
  computerNum = Math.floor(Math.random() * 100 + 1);
  console.log(computerNum)
}

function play() {
  let userValue = inputArea.value;
  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100사이 숫자를 입력해주세요!";
    return;
  }
  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자입니다. 다시 입력해주세요!";
    return;
  }
  chance--;
  chanceArea.textContent = `남은 기회는: ${chance}번`;

  if (userValue > computerNum) {
    resultArea.textContent = "Down!";
  } else if (userValue < computerNum) {
    resultArea.textContent = "Up!";
  } else {
    resultArea.textContent = "맞췄습니다.!";
    gameOver = true;
  }

  history.push(userValue);
  if (chance < 1) {
    gameOver = true;
  }

  if (gameOver == true) {
    buttonGo.disabled = true;
  }
}

function reset() {
  inputArea.value = "";
  pickRandomnum();

  buttonGo = false;
  chance = 3

  chanceArea.textContent = `남은 기회는: ${chance}번`;
  history = []
  resultArea.textContent = "결과값이 여기 나옵니다."


}
pickRandomnum()
