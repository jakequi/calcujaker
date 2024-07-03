const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector(".clear-button");
const backspaceButton = document.querySelector(".backspace-button");
const equalsButton = document.querySelector(".equals-button");
const decimalButton = document.querySelector(".decimal-button");
const topDisplay = document.querySelector(".display-top-text");
const bottomDisplay = document.querySelector(".display-bottom-text");
const styleSelect = document.querySelector(".style-selector");
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

const styleChanges = [".calculator-body", ".calculator-button", ".clear-button", ".display"]

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
    if (bottomDisplay.textContent === "") {
        return;
    }
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
    if (this.value == "-" &&  bottomDisplay.textContent === "") {
        displayValue += "-";
        bottomDisplay.textContent += "-";
        return;
    }
    if (displayValue === "" || bottomDisplay.textContent === "-" || 
        /[^\d]/.test(bottomDisplay.textContent.slice(1,-1))) {
        return;
    }
    if (/[^\d.]/.test(displayValue.toString().slice(1))) {
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
    if ((displayValue === "") || 
    topDisplay.textContent === "" ||
    /[^\d.]/.test(displayValue.toString().slice(-1))) {
        return;
    }
    splitAndCalculate();
    topDisplay.textContent = "";
    bottomDisplay.textContent = displayValue;
    updateFontSize();
}

function updateFontSize() {
    bottomDisplay.textContent.length > 8 ? 
    bottomDisplay.style.fontSize = "18px" : 
    bottomDisplay.style.fontSize = "32px";
}0

function handleKeyPress(event) {
    const key = event.key;
    if (key === "Enter") {
        event.preventDefault();
    }
    if (key in keyDownEvents) {
        keyDownEvents[key]();
    }
    else if (key >= 0 && key <= 9) {
        displayValue += key;
        bottomDisplay.textContent += key;
    }
}

function changeStyle() {
    let append;
    if (this.value === "retro") {
        for (let i in styleChanges) {
            styledElements = document.querySelectorAll(styleChanges[i]);
            styledElements.forEach((element) => {
                element.classList.add(styleChanges[i].toString().slice(1) + "-" + "style2")
            })
        }
    }
    else {
        for (let i in styleChanges) {
            styledElements = document.querySelectorAll(styleChanges[i]);
            styledElements.forEach((element) => {
                element.classList.remove(styleChanges[i].toString().slice(1) + "-" + "style2")
            });
        }
    }

}



numberButtons.forEach((button) => button.addEventListener("click", handleNumberButton));
operatorButtons.forEach((button) => button.addEventListener("click", handleOperatorButton));
clearButton.addEventListener("click", handleClearButton);
backspaceButton.addEventListener("click", handleBackspaceButton);
equalsButton.addEventListener("click", handleEqualsButton);
decimalButton.addEventListener("click", handleDecimalButton);
styleSelect.addEventListener("change", changeStyle);
document.addEventListener("keydown", handleKeyPress);