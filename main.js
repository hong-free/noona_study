let computerNum = 0;

let inputArea = document.getElementById("input-area");
let buttonGo = document.getElementById("play-button");
let resultArea = document.getElementById("result-area");


buttonGo.addEventListener("click", play);


function pickRandomnum() {
  computerNum = Math.floor(Math.random() * 100 + 1);
  console.log(computerNum)
}

function play() {
  let userValue = inputArea.value;
  console.log(userValue);
  if (userValue > computerNum) {
    resultArea.textContent = "Down!";
  } else if (userValue < computerNum) {
    resultArea.textContent = "Up!";
  } else {
    resultArea.textContent = "맞췄습니다.!";
  }

}

pickRandomnum()
