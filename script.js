const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector(".clear-button");
const backspaceButton = document.querySelector(".backspace-button");
const equalsButton = document.querySelector(".equals-button");
const decimalButton = document.querySelector(".decimal-button");
const topDisplay = document.querySelector(".display-top-text");
const bottomDisplay = document.querySelector(".display-bottom-text");
let displayValue =  "";

const calculateFunctions = {
    "+": (a, b) => Number(a) + Number(b),
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => {
        if(b == 0) {
            alert("Lmao nice try")
            return 0;
        }
        return a / b;
    },    
}

const keyDownEvents = {
    "+": () =>document.querySelector(".plus-button").click(),
    "-": () => document.querySelector(".minus-button").click(),
    "/": () => document.querySelector(".divide-button").click(),
    "*": () => document.querySelector(".multiply-button").click(),
    "x": () => document.querySelector(".multiply-button").click(),
    "=": () => document.querySelector(".equals-button").click(),
    "Enter": () => document.querySelector(".equals-button").click(),
    ".": () => document.querySelector(".decimal-button").click(),
    "+": () => document.querySelector(".plus-button").click(),
    "Backspace": () => document.querySelector(".backspace-button").click(),
}

function operate(operator, a, b) {
    return calculateFunctions[operator](a, b);
}

function splitAndCalculate() {
    let splitValues = displayValue.split(" ");
    displayValue = calculateFunctions[splitValues[1]](splitValues[0], splitValues[2]);
}

function handleClearButton() {
    displayValue = "";
    topDisplay.textContent = "";
    bottomDisplay.textContent = "";
}

function handleBackspaceButton() {
    displayValue = displayValue.toString().slice(0, -1);
    bottomDisplay.textContent = bottomDisplay.textContent.toString().slice(0, -1);
    updateFontSize();
}


function handleNumberButton() {
    displayValue += this.textContent;
    bottomDisplay.textContent += this.textContent;
    updateFontSize();
}

function handleOperatorButton() {
    if (displayValue === "" || /[^\d]/.test(displayValue.toString().slice(-1))) {
        return;
    }
    if (/[^\d.]/.test(displayValue)) {
        splitAndCalculate();
    }
    displayValue += ` ${this.value} `;
    topDisplay.textContent = displayValue;
    bottomDisplay.textContent = "";
}


function handleDecimalButton() {
    if (bottomDisplay.textContent.includes(".")) {
        return;
    }
    displayValue += ".";
    bottomDisplay.textContent += ".";
    updateFontSize();
}

function handleEqualsButton() {
    if ((displayValue === "") || (/[^\d.]/.test(displayValue.toString().slice(-1))) || (!(/[^\d]/.test(displayValue.toString())))) {
        return;
    }
    splitAndCalculate();
    topDisplay.textContent = "";
    bottomDisplay.textContent = displayValue;
    updateFontSize();
}

function updateFontSize() {
    bottomDisplay.textContent.length > 8 ? bottomDisplay.style.fontSize = "18px" : bottomDisplay.style.fontSize = "32px";
}0

function handleKeyPress(event) {
    const key = event.key;
    if (key in keyDownEvents) {
        keyDownEvents[key]();
    }
    else if (key >= 0 && key <= 9) {
        displayValue += key;
        bottomDisplay.textContent += key;
    }
}

numberButtons.forEach((button) => button.addEventListener("click", handleNumberButton));
operatorButtons.forEach((button) => button.addEventListener("click", handleOperatorButton));
clearButton.addEventListener("click", handleClearButton);
backspaceButton.addEventListener("click", handleBackspaceButton);
equalsButton.addEventListener("click", handleEqualsButton);
decimalButton.addEventListener("click", handleDecimalButton);
document.addEventListener("keydown", handleKeyPress);
