// @ts-nocheck
let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let tasks = document.getElementById("todos");

let data = {};

// accepts data on submit
let acceptData = () => {};

// create a new todo task
let createTask = () => {};

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
let formValidation = () => {};