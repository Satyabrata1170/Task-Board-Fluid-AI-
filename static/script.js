const API_URL = "/tasks";

async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    renderTasks(tasks);
}

async function addTask() {
    const input = document.getElementById("taskInput");
    if (!input.value) return;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input.value })
    });

    input.value = "";
    fetchTasks();
}

async function toggleTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "PUT" });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

function renderTasks(tasks) {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    const completedCount = tasks.filter(t => t.completed).length;
    const progress = tasks.length
        ? (completedCount / tasks.length) * 100
        : 0;

    document.getElementById("progressBar").style.width = `${progress}%`;
    document.getElementById("progressText").innerText =
        `Progress: ${Math.round(progress)}%`;

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.title}
            </span>
            <div>
                <input type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask('${task.id}')">
                <button onclick="deleteTask('${task.id}')">❌</button>
            </div>
        `;
        list.appendChild(li);
    });
}

fetchTasks();




// =========UI===========

const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");

const progressBar = document.getElementById("progress-bar");
const progressPercent = document.getElementById("progress-percent");
const completedCount = document.getElementById("completed-count");
const totalCount = document.getElementById("total-count");
const streakCount = document.getElementById("streak-count");

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});

async function fetchTasks() {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderTasks(data.tasks, data.streak);
}

async function addTask() {
    if (!input.value.trim()) return;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input.value })
    });

    input.value = "";
    fetchTasks();
}

async function toggleTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "PUT" });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

function renderTasks(tasks, streak) {
    taskList.innerHTML = "";
    streakCount.innerText = `${streak} Day Streak`;

    if (tasks.length === 0) {
        emptyState.classList.remove("hidden");
    } else {
        emptyState.classList.add("hidden");
    }

    let completed = 0;

    tasks.forEach(task => {
        if (task.completed) completed++;

        const taskEl = document.createElement("div");
        taskEl.className =
            "task-item bg-white rounded-xl shadow-md p-4 flex justify-between items-center";

        taskEl.innerHTML = `
            <div class="flex items-center gap-3">
                <input type="checkbox" ${task.completed ? "checked" : ""}
                    onchange="toggleTask('${task.id}')"
                    class="w-5 h-5">
                <span class="${task.completed ? "line-through text-gray-400" : "text-gray-700"}">
                    ${task.title}
                </span>
            </div>
            <button onclick="deleteTask('${task.id}')" class="text-red-500 hover:text-red-700">
                🗑
            </button>
        `;

        taskList.appendChild(taskEl);
    });

    updateProgress(completed, tasks.length);
}

function updateProgress(done, total) {
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    progressBar.style.width = `${percent}%`;
    progressPercent.innerText = `${percent}%`;
    completedCount.innerText = `✅ ${done} completed`;
    totalCount.innerText = `📝 ${total} total`;

    if (percent === 100 && total > 0) {
        setTimeout(() => {
            alert("Great!!! All tasks completed! Keep the streak going ! 🚀");
        }, 300);
    }
}

fetchTasks();
