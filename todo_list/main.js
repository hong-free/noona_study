let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
addButton.addEventListener("click", addTask);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false
  }
  taskList.push(task);

  render();
}

function render() {
  let resultHtml = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHtml += `<div class="task">
      <div class="task-done">${taskList[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete(`${ taskList[i].id } `)">Check</button>
          <button onclick="deleteTask(`${ taskList[i].id } `) ">Delete</button>
        </div >
        </div > `
    } else {
      resultHtml += `< div class="task" >
      <div>${taskList[i].taskContent}</div>
        <div>
          <button onclick= "toggleComplete(`${ taskList[i].id } ` )">Check</button>
          <button onclick="deleteTask(`${ taskList[i].id } `)">Delete</button>
        </div>
        <div/ > `
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
  render()
}
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
    }
  }
  render()
}
function randomIDGenerate() {
  return '_' + Math.random().toString(36).substring(2, 9);
}
