const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector(".clear-button");
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

function operate(operator, a, b) {
    return calculateFunctions[operator](a, b);
}

function handleClearButton() {
    displayValue = "";
    topDisplay.textContent = "";
    bottomDisplay.textContent = "";
}

function handleNumberButton() {
    displayValue += this.textContent;
    bottomDisplay.textContent += this.textContent;
    updateFontSize();
}

function handleOperatorButton() {
    if (displayValue === "" || /[^\d.]/.test(displayValue.toString().substring(displayValue.length-1))) {
        return;
    }
    if (/[^\d.]/.test(displayValue)) {
        let splitValues = displayValue.split(" ");
        displayValue = calculateFunctions[splitValues[1]](splitValues[0], splitValues[2]);
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
    if (displayValue === "" || /[^\d.]/.test(displayValue.toString().substring(displayValue.length-1))) {
        return;
    }
    let splitValues = displayValue.split(" ");
    displayValue = calculateFunctions[splitValues[1]](splitValues[0], splitValues[2]);
    topDisplay.textContent = "";
    bottomDisplay.textContent = displayValue;
    updateFontSize();
}

function updateFontSize() {
    bottomDisplay.textContent.length > 8 ? bottomDisplay.style.fontSize = "18px" : bottomDisplay.style.fontSize = "32px";
}

numberButtons.forEach((button) => button.addEventListener("click", handleNumberButton));
operatorButtons.forEach((button) => button.addEventListener("click", handleOperatorButton));
clearButton.addEventListener("click", handleClearButton);
equalsButton.addEventListener("click", handleEqualsButton);
decimalButton.addEventListener("click", handleDecimalButton);
