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

let firstValue = null;
let secondValue = null;
let operator = null;


