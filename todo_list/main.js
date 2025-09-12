let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let underline = document.getElementById("underline");
let taskList = []
let tabs = document.querySelectorAll(".tasks-tabs div")
addButton.addEventListener("click", addTask);
let mode = 'all'
let filterList = []

tabs.forEach(menu => menu.addEventListener("click", (e) => indicator(e)))
function indicator(e) {

  underline.style.left = e.currentTarget.offsetLeft + "px";
  underline.style.width = e.currentTarget.offsetWidth + "px";
  underline.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";

}

//tab 클릭시
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) { filter(event) }
  )
}


//입력창에 내용을 넣고 엔터를 치면 내용이 추가된다
taskInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});



//추가버튼클릭시 내용추가
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
  reRender();
}

//렌더
function render() {
  let list = []
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing") {
    list = filterList;
  }
  else if (mode === "done") {
    list = filterList;
  }
  let resultHtml = '';
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHtml +=
        `<div class="task task-bg">
      <div class="task-done">${list[i].taskContent}</div>
        <div>
          <button class="btn" onclick="toggleComplete('${list[i].id}')"> <i class="fa-sharp fa-solid fa-rotate-left"></i></button>
          <button class="btn"  onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div >
        </div > `;
    } else {
      resultHtml += `<div class="task">
      <div>${list[i].taskContent}</div>
        <div>
          <button class="btn"  onclick="toggleComplete('${list[i].id}')"> <i class="fa-solid fa-check"></i></i></button>
          <button  class="btn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
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
  reRender();
}

//삭제버튼
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  } reRender();
}

// console.log(taskList);

//필터
function filter(event) {
  mode = event.target.id
  reRender();
}
function reRender() {
  filterList = []
  if (mode === "all") {
    render()
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i])
      }

    }
    render()
    console.log("진행중", filterList)

  } else if (mode === "done") {

    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i])
      }
    }
    render()
  }
}
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}
