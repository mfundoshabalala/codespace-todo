// On app load, get all tasks from localStorage
window.onload = loadTasks;

const form = document.querySelector("form");
// On form submit add task
form && form.addEventListener("submit", (event) => {
			event.preventDefault();
			addTask();
		});

// load tasks from localStorage
function loadTasks () {
	if (localStorage.getItem("tasks") === null) return;

	let tasks = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));

	console.log("localStorage", tasks);
}

// add a task
function addTask () {
	const task = document.querySelector("form input");

	// return if task is empty
	if (task?.value === "") {
		alert("Task is empty!");
		return false;
	}

	// check if the task already exist


	// add task to localStorage
	localStorage.setItem("tasks", JSON.stringify([
		...JSON.parse(localStorage.getItem("tasks") || "[]"),
		{
			id: Date.now(),
			task: task?.value,
			completed: false,
			date: Date.now()
		}
	]));
}

// complete a task
function completeTask() {}

// remove a task
function removeTask() {}

//
function getCurrentTask() {}

// edit a task and update local storage
function editTask() {}