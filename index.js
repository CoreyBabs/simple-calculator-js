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

function updateDisplay() {
	let display = document.querySelector("#display");
	display.textContent = displayValue;
}
function addToDisplay(txt) {
	displayValue += txt;
	updateDisplay();
}

function removeFromDisplay() {
	// eq and err displays cannot be deleted
	if (lastDisplayMode === "eq" || lastDisplayMode === "err") return;

	let idx = -1;

	// if a space is detected, that means we need to delete an op which has whitespace
	if (displayValue.slice(-1) === " ") lastDisplayMode = "op";

	// if a decimal is deleted, a new one can be added
	if (displayValue.slice(-1) === ".") hasDecimal = false;

	// operators are surrouned by a space so include that in the delete.
	if (lastDisplayMode === "op") {
		idx = -3;
		lastDisplayMode = "num";
	}

	displayValue = displayValue.slice(0, idx);
	updateDisplay();
}

function clearDisplay() {
	displayValue = "";
	updateDisplay();
	hasDecimal = false;
}

function calculate() {
	let vals = displayValue.trim().split(" ").reverse();	
	// if only one value is present, we have nothing to calculate so return
	if (vals.length === 1) return;

	// if we have a value and an op but no second value, return the first value
	if (vals.length === 2) {
		displayValue = vals[0];
		updateDisplay();
		return;
	}

	lastDisplayMode = "eq";

	// run first calculation
	let first = +vals.pop();
	let op = vals.pop();
	let second = +vals.pop();
	let	total =	operate(first, second, op);

	// there was an error so set to error mode
	if (typeof total === "string") {
		lastDisplayMode = "err";
	}

	// there are more calculations to do if vals still has values in it	
	while (vals.length > 0) {
		// there was an error so set to error mode
		if (typeof total === "string") {
			lastDisplayMode = "err";
		}

		let op = vals.pop();
		let second = +vals.pop();
		if (isNaN(second)) break;
		total = operate(total, second, op);
	}

	displayValue = total;
	updateDisplay();
}

let displayValue = "";
let lastDisplayMode = "None";
let hasDecimal = false;

let numbers = document.querySelectorAll(".number");
numbers.forEach(n => n.addEventListener("click", (e) => { 
	// if last button press was eq or error, start new calculation
	if (lastDisplayMode === "eq" || lastDisplayMode === "err") displayValue = "";

	addToDisplay(e.target.textContent);
	lastDisplayMode = "num";
}));

let ops = document.querySelectorAll(".op");
ops.forEach(o => o.addEventListener("click", (e) => {
	if (lastDisplayMode !== "op" && lastDisplayMode !== "err") {
		// if first button press is an op, add a 0 value
		if (displayValue.length === 0) displayValue = "0";	

		addToDisplay(` ${e.target.textContent} `);
		lastDisplayMode = "op";
		hasDecimal = false; // reset decimal
	}
}));

let clear = document.querySelector("#clear");
clear.addEventListener("click", clearDisplay);

let del = document.querySelector("#delete");
del.addEventListener("click", removeFromDisplay);

let eq = document.querySelector("#equals");
eq.addEventListener("click", calculate);

// Known bug in corner case: if you have a decimal number and delete an op, you can add a second decimal to a number
let decimal = document.querySelector("#decimal");
decimal.addEventListener("click", () => {
	// only allow decimal in number mode and if there is no decimal already
	if (!hasDecimal && (lastDisplayMode === "num" || lastDisplayMode === "op")) {
		addToDisplay(".");
		hasDecimal = true;
	}
})
