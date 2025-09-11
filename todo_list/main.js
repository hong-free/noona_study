let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
addButton.addEventListener("click", addTask);
addButton.addEventListener('click', addTask);
//입력창에 내용을 넣고 엔터를 치면 내용이 추가된다
taskInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});


function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  }
  let taskContent = taskInput.value
  if (taskContent.length > 0) {
    taskList.push(task)
  }
  console.log(taskContent)

  //할일작성후 입력창 비우고, 입력값이 없을시 알림창 띄우기
  if (taskContent !== '') {
    taskInput.value = '';
    taskInput.focus();
  } else {
    alert('할 일을 입력해주세요!');
  }
  render();
}


function render() {

  let resultHtml = '';
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHtml +=
        `<div class="task task-bg">
      <div class="task-done">${taskList[i].taskContent}</div>
        <div>
          <button class="btn" onclick="toggleComplete('${taskList[i].id}')"> <i class="fa-sharp fa-solid fa-rotate-left"></i></button>
          <button class="btn"  onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div >
        </div > `;
    } else {
      resultHtml += `<div class="task">
      <div>${taskList[i].taskContent}</div>
        <div>
          <button class="btn"  onclick="toggleComplete('${taskList[i].id}')"> <i class="fa-solid fa-check"></i></i></button>
          <button  class="btn" onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div >
        </div > `
    }
  }

  document.getElementById("task-board").innerHTML = resultHtml;
}
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  } render()
}