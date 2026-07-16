const previousOpElement = document.getElementById("previous-op");
const currentOpElement = document.getElementById("current-op");

let currentOperand = "0";
let previousOperand = "";
let operation;

function getOperatorSymbol(operator) {
    switch (operator) {
        case "*":
            return "×";
        case "/":
            return "÷";
        default:
            return operator;
    }
}

function updateDisplay() {
    currentOpElement.textContent = currentOperand;

    previousOpElement.textContent = operation
        ? `${previousOperand} ${getOperatorSymbol(operation)}`
        : "";
}

function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) {
        return;
    }

    if (currentOperand === "0" && number !== ".") {
        currentOperand = number;
    } else {
        currentOperand += number;
    }

    updateDisplay();
}

function chooseOperation(operator) {
    if (currentOperand === "" || currentOperand === "Erro") {
        return;
    }

    if (previousOperand !== "") {
        compute();
    }

    operation = operator;
    previousOperand = currentOperand;
    currentOperand = "";

    updateDisplay();
}

function compute() {
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(previous) || isNaN(current)) {
        return;
    }

    let result;

    switch (operation) {
        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":
            if (current === 0) {
                currentOperand = "Erro";
                previousOperand = "";
                operation = undefined;

                updateDisplay();

                setTimeout(clearDisplay, 1200);
                return;
            }

            result = previous / current;
            break;

        default:
            return;
    }

    currentOperand = Number(result.toFixed(10)).toString();
    previousOperand = "";
    operation = undefined;

    updateDisplay();
}

function clearDisplay() {
    currentOperand = "0";
    previousOperand = "";
    operation = undefined;

    updateDisplay();
}

function deleteNumber() {
    if (currentOperand === "Erro") {
        clearDisplay();
        return;
    }

    if (currentOperand.length <= 1) {
        currentOperand = "0";
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }

    updateDisplay();
}

document.querySelectorAll(".btn-number").forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.textContent);
    });
});

document.querySelectorAll(".btn-operator").forEach(button => {
    button.addEventListener("click", () => {
        chooseOperation(button.dataset.op);
    });
});

document.getElementById("equals").addEventListener("click", compute);
document.getElementById("clear").addEventListener("click", clearDisplay);
document.getElementById("delete").addEventListener("click", deleteNumber);

updateDisplay();
