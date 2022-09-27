// @ts-nocheck
let form = document.getElementById("form");
let tasks = document.getElementById("todos");
//
let titleInput = document.getElementById("titleInput");
let dateInput = document.getElementById("dateInput");
let descrInput = document.getElementById("descrInput");
let statusInput = document.getElementById("statusInput");
let msg = document.getElementById("msg");
//
let btnAllTasks = document.getElementById("allTasks");
let btnCompleteTasks = document.getElementById("completeTasks");
let btnPendingTasks = document.getElementById("pendingTasks");

// instantiate the data object
let data = {};
// instantiate the rendered tasks array
let renderedTasks = []
// instantiate the UI state
let state = {
	completed: false,
	pending: false,
}

// accepts data on submit
const acceptData = () => {
	data.push({
		text: titleInput.value,
		date: dateInput.value,
		description: descrInput.value,
		complete: false,
	});

	localStorage.setItem("data", JSON.stringify(data));
	createTasks();
};

// reset form fields on submit
const resetForm = () => {
	titleInput.value = "";
	dateInput.value = "";
	descrInput.value = "";
}

// create a new todo task
const createTasks = () => {
	tasks.innerHTML = "";
	renderedTasks.map((x, y) => {
		return (tasks.innerHTML += `
			<div id=${ y }>
				<span class="fw-bold">${ x.text }</span>
				<span class="small text-secondary">${ x.date }</span>
				<p>${ x.description }</p>

				<span class="options">
					<i onClick= "editTask(this)" class="fas fa-edit"></i>
					<i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
					<input id="completeInput" type="checkbox" onClick ="completeTask(this)" />
				</span>
			</div>
    	`);
	});

	console.log(data);

	resetForm();
};

// load tasks from local storage on reload
(() => {
	data = JSON.parse(localStorage.getItem("data")) || [];
	state = JSON.parse(localStorage.getItem("data")) || {};

	// render all tasks
	if (!state.completed && !state.pending) {
		renderedTasks = data;
	}

	// render completed tasks
	if (state.completed && !state.pending) {
		// filter for tasks with a completed status of true
		renderedTasks = data.filter(task => task.complete === true);
	}

	// render pending tasks
	if (!state.completed && state.pending) {
		// filter for tasks with a completed status of false
		renderedTasks = data.filter(task => task.complete === false);
	}
	//
	createTasks();
})();

// delete todo task
const deleteTask = (e) => {
	e.parentElement.parentElement.remove();
	data.splice(e.parentElement.parentElement.id, 1);
	localStorage.setItem("data", JSON.stringify(data));
};

// edit todo task
const editTask = (e) => {
	let selectedTask = e.parentElement.parentElement;
	//TODO: select a guard clause for completed tasks
	// pre-populate the input(s) with previous values
	titleInput.value = selectedTask.children[0].innerHTML;
	dateInput.value = selectedTask.children[1].innerHTML;
	descrInput.value = selectedTask.children[2].innerHTML;
	// remove the task from local storage
	deleteTask(e);
};

// complete todo task
const completeTask = (e) => {}

// submit event listener for the form
form?.addEventListener("submit", (event) => {
	event.preventDefault();

	formValidation();
});

// validate the form fields on submit
const formValidation = () => {
	// every task should have a title at the very least
	if (titleInput?.value === "") {
		document.getElementById("msg").innerText = "Task cannot be blank";
	} else {
		document.getElementById("msg").innerText = "";
		acceptData();
	}
};

// render completed tasks
const renderCompletedTasks = () => {
	state.completed = true;
	state.pending = false;

	localStorage.setItem("state", JSON.stringify(state));
}

btnCompleteTasks?.addEventListener("click", (event) => {
	event.preventDefault();
	renderCompletedTasks();
	// location.reload();
});

// render pending tasks
const renderPendingTasks = () => {
	state.pending = true;
	state.completed = false;

	localStorage.setItem("state", JSON.stringify(state));
}

btnPendingTasks?.addEventListener("click", (event) => {
	event.preventDefault();
	renderPendingTasks();
	// location.reload();
});

// render all tasks
const renderAllTasks = () => {
	state.pending = false;
	state.completed = false;

	localStorage.setItem("state", JSON.stringify(state));
};

btnAllTasks?.addEventListener("click", (event) => {
	event.preventDefault();
	renderAllTasks();
	// location.reload();
});
