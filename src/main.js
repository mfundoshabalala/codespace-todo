// @ts-nocheck
let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let tasks = document.getElementById("todos");

let data = {};

// accepts data on submit
let acceptData = () => {};

// create a new todo task
let createTask = () => {
	tasks.innerHTML += `
		<div>
			<p>${ data.text }</p>
			<span class="options">
			<i onClick="editTask(this)" class="fas fa-edit"></i>
			<i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
			</span>
		</div>
	`;
	input.value = "";
};

// delete todo task
let deleteTask = (e) => { };

// edit todo task
let editTask = (e) => { };

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