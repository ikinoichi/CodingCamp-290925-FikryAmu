const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterBtn = document.getElementById("filterBtn");
const filterStatus = document.getElementById("filterStatus");
const taskList = document.getElementById("taskList");

let tasks = [];
let editIndex = null; // untuk menandai task mana yang sedang di-edit

function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  let filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
    return;
  }

  filteredTasks.forEach((task, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.text}</td>
      <td>${task.date}</td>
      <td class="${task.status === "pending" ? "status-pending" : "status-done"}">${task.status}</td>
      <td>
        <button class="action-btn done-btn" onclick="markDone(${index})">Done</button>
        <button class="action-btn" style="background:#facc15;color:black;" onclick="editTask(${index})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    taskList.appendChild(row);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;
  if (!text) return alert("Please enter a task!");

  if (editIndex !== null) {
    // sedang dalam mode edit
    tasks[editIndex].text = text;
    tasks[editIndex].date = date;
    editIndex = null;
    addBtn.textContent = "Add";
  } else {
    // mode tambah task
    tasks.push({ text, date, status: "pending" });
  }

  taskInput.value = "";
  dateInput.value = "";
  renderTasks(filterStatus.value);
}

function editTask(index) {
  const task = tasks[index];
  taskInput.value = task.text;
  dateInput.value = task.date;
  editIndex = index;
  addBtn.textContent = "Up"; // ubah tombol jadi update
}

function markDone(index) {
  tasks[index].status = "done";
  renderTasks(filterStatus.value);
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(filterStatus.value);
}

function deleteAll() {
  tasks = [];
  renderTasks();
}

function filterTasks() {
  renderTasks(filterStatus.value);
}

addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", deleteAll);
filterBtn.addEventListener("click", filterTasks);

// render awal
renderTasks();
