// @ts-nocheck
let form = document.getElementById("form");
let input = document.getElementById("input");
let titleInput = document.getElementById("titleInput");
let dateInput = document.getElementById("dateInput");
let descrInput = document.getElementById("descrInput");
let msg = document.getElementById("msg");
let tasks = document.getElementById("todos");

let data = {};
let state = {
	completed: false,
	pending: false,
}

// accepts data on submit
let acceptData = () => {
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
let resetForm = () => {
	titleInput.value = "";
	dateInput.value = "";
	descrInput.value = "";
}

// create a new todo task
let createTasks = () => {
	tasks.innerHTML = "";
	data.map((x, y) => {
		return (tasks.innerHTML += `
			<div id=${ y }>
				<span class="fw-bold">${ x.text }</span>
				<span class="small text-secondary">${ x.date }</span>
				<p>${ x.description }</p>

				<span class="options">
					<i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
					<i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
					<input type="checkbox" />
				</span>
			</div>
    	`);
	});

	resetForm();
};

// load tasks from local storage on reload
(() => {
  	data = JSON.parse(localStorage.getItem("data")) || [];
	const tasks = createTasks();

	// render all tasks
	if (!state.completed && !state.pending) {
		return tasks;
	}

	// render completed tasks
	if (state.completed && !state.pending) {
		return tasks.filter((task) => {
			return task.complete === true;
		});
	}

	// render pending tasks
	if (!state.completed && state.pending) {
		return tasks.filter((task) => {
			return task.complete === false;
		});
	}

	console.log(data);
})();

// delete todo task
let deleteTask = (e) => {
	e.parentElement.parentElement.remove();
	data.splice(e.parentElement.parentElement.id, 1);
	localStorage.setItem("data", JSON.stringify(data));
};

// edit todo task
let editTask = (e) => {
	let selectedTask = e.parentElement.parentElement;

	titleInput.value = selectedTask.children[0].innerHTML;
	dateInput.value = selectedTask.children[1].innerHTML;
	descrInput.value = selectedTask.children[2].innerHTML;

	deleteTask(e);
};

// submit event listener for the form
form?.addEventListener("submit", (event) => {
	event.preventDefault();
	console.log("button clicked");

	formValidation();
});

// validate the form fields on submit
let formValidation = () => {
	if (input?.value === "") {
		document.getElementById("msg").innerText = "Task cannot be blank";
		console.log("failure");
	} else {
		document.getElementById("msg").innerText = "";
		console.log("successs");
		acceptData();
	}
};