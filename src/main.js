// @ts-nocheck

let form = document.getElementById("form");
let tasks = document.getElementById("todos");
//
let titleInput = document.getElementById("titleInput");
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
// error or success status
let status = {
	isSuccess: null,
	message: "",
};

//
document.getElementById("reset").addEventListener("click", () => {
	localStorage.removeItem("data");
	location.reload();
});

//
document.getElementById("openModal").addEventListener("click", () => {
	document.getElementById("backdrop").className = "show";
	document.getElementById("modal").setAttribute("open", true);
});

//
document.getElementById("closeModal").addEventListener("click", () => {
	document.getElementById("backdrop").className = "hide";
	document.getElementById("modal").removeAttribute("open");
});

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
	dateInput.value = null;
	descrInput.value = "";
}

// create a new todo task
const createTasks = () => {
	tasks.innerHTML = "";
	renderedTasks.map((task, index) => {
		tasks.innerHTML += (`
			<li key=${ index+1 }>
				<div>
					<span>${ task.text }</span>
				 	<span>${ task.date }</span>
				</div>
				<p>${ task.description }</p>

				<span class="options">
					<button onClick= "editTask(this)">Edit
						<i class="fas fa-edit"></i>
					</button>
					<button onClick ="deleteTask(this);createTasks()">
						Delete
						<i  class="fas fa-trash-alt"></i>
					</button>
					<input type="checkbox" onClick ="completeTask(this)" ${ task.complete ? "checked" : ""} />
				</span>
			</li>
    	`);
	});

	console.log(data);
	resetForm();
};

// load tasks from local storage on reload
(() => {
	data = JSON.parse(localStorage.getItem("data")) || [];
	state = JSON.parse(localStorage.getItem("state")) || {};

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
	document.getElementById("backdrop").className = "show";
	document.getElementById("modal").setAttribute("open", true);
	// pre-populate the input(s) with previous values
	titleInput.value = selectedTask.children[0].children[0].innerHTML;
	dateInput.value = selectedTask.children[0].children[1].innerHTML;
	descrInput.value = selectedTask.children[1].innerHTML;
	// remove the task from local storage
	deleteTask(e);
};

// complete todo task
const completeTask = (e) => {
	let tasks = Array.from(JSON.parse(localStorage.getItem("data") || "[]"));
	tasks.forEach((task) => {
		if (task.text === e.parentElement.parentElement.children[0].children[0].innerHTML) {
			task.complete = !task.complete;
		}
	});
	localStorage.setItem("data", JSON.stringify(tasks));
}

// submit event listener for the form
form?.addEventListener("submit", (event) => {
	event.preventDefault();

	formValidation();
});

// validate the form fields on submit
const formValidation = () => {
	// Get the snackbar DIV
	var x = document.getElementById("snackbar");
	// every task should have a title at the very least
	if (titleInput?.value === "") {
		status.isSuccess = false;
		document.getElementById("snackbar").innerHTML = "An error has occured!";
	} else {
		status.isSuccess = true;
		document.getElementById("modal").removeAttribute("open");
		document.getElementById("backdrop").className = "hide";
		document.getElementById("snackbar").innerHTML = "Task successfully saved";
		acceptData();
	}

	// Add the "show" class to DIV
	x.className = `show ${ status.isSuccess ? "success" : "error" }`;

	// After 3 seconds, remove the snackbar show class from DIV
	setTimeout(() => x.className = x.className.replace("show", "hide"), 3000);
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
	location.reload();
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
	location.reload();
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
	location.reload();
});

