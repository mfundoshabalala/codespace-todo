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

	// Loop through the tasks and add them to the list
	tasks.forEach((task) => {
		const list = document.querySelector("ul");
		const li = document.createElement("li");
		li.innerHTML = `
			<input
				type="checkbox"
				onclick="completeTask(this)"
				class="check"
				${ task?.completed ? "checked" : ""}
			>
			<input
				type="text"
				onblur="editTask(this)"
				onfocus="getCurrentTask(this)"
				value="${ task?.task }"
				class="task ${ task?.completed ? "completed" : ""}"
			>
			<button onclick="removeTask(this)">&plus;</button>
			`;
			// <i class="fa fa-trash" onclick=""></i>
		list && list.insertBefore(li, list.children[0]);
	});
}

// add a task
function addTask () {
	const task = document.querySelector("form input");
	const list = document.querySelector("ul");

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
	// reload browser
	location.reload();
}

// complete a task
function completeTask (event) {
	let tasks = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));
	tasks.forEach((task) => {
		if (task.task === event.nextElementSibling.value) {
			task.completed = !task.completed;
		}
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
	event.nextElementSibling.classList.toggle("completed");
}

// remove a task
function removeTask (event) {
	let tasks = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));
	tasks.forEach((task) => {
		if (task.task === event.parentNode.children[1].value) {
			tasks.splice(tasks.indexOf(task), 1);
		}
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
	event.parentElement.remove();
}

// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask (event) {
	currentTask = event.value;
}

// edit the task and update local storage
function editTask (event) {
	let tasks = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));
	// check if task is empty
	if (event.value === "") {
		alert("Task is empty!");
		event.value = currentTask;
		return;
	}
	// task already exist
	// tasks.forEach((task) => {
	// 	if (task.task === event.value) {
	// 		// alert("Task already exist!");
	// 		event.value = currentTask;
	// 		return;
	// 	}
	// });
	// update task
	tasks.forEach((task) => {
		if (task.task === currentTask) {
			task.task = event.value;
		}
	});
	// update local storage
	localStorage.setItem("tasks", JSON.stringify(tasks));
}
