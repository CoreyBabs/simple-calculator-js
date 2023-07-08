function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return +(a / b).toFixed(2);
}

function operate(a, b, op) {
	switch(op) {
		case "+": return add(a,b);
		case "-": return subtract(a,b);
		case "*": return multiply(a,b);
		case "/": {
			if (b === 0) return "This calculator is not smart enough to divide by 0";
			return divide(a, b);
		}
	}
}

function addToDisplay(txt) {
	let display = document.querySelector("#display");
	display.textContent += txt;
}

function removeFromDisplay() {
	let display = document.querySelector("#display");
	let idx = -1;

	// if a space is detected, that means we need to delete an op which has whitespace
	if (display.textContent.slice(-1) === " ") lastDisplayMode = "op";

	// operators are surrouned by a space so include that in the delete.
	if (lastDisplayMode === "op") {
		idx = -3;
		lastDisplayMode = "num";
	}

	display.textContent = display.textContent.slice(0, idx);
}

function clearDisplay() {
	let display = document.querySelector("#display");
	display.textContent = "";
}

let firstValue = null;
let secondValue = null;
let operator = null;
let lastDisplayMode = "None";

let numbers = document.querySelectorAll(".number");
numbers.forEach(n => n.addEventListener("click", (e) => { 
	addToDisplay(e.target.textContent);
	lastDisplayMode = "num";
}));

let ops = document.querySelectorAll(".op");
ops.forEach(o => o.addEventListener("click", (e) => {
	if (lastDisplayMode !== "op") {
		addToDisplay(` ${e.target.textContent} `);
		lastDisplayMode = "op";
	}
}));

let clear = document.querySelector("#clear");
clear.addEventListener("click", clearDisplay);

let del = document.querySelector("#delete");
del.addEventListener("click", removeFromDisplay);
