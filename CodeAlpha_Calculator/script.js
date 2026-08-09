const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let expression = "";

function updateDisplay() {
    display.value = expression || "0";
}
function isOperator(char) {
    return ["+", "-", "*", "/", "%"].includes(char);
}

// Single structured button interaction processing engine
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (value === "C") {
            expression = "";
            updateDisplay();
        } else if (value === "backspace") {
            expression = expression.slice(0, -1);
            updateDisplay();
        } else if (value === "=") {
            executeMath();
        } else {
            // Prevent double operator insertions row anomalies
            if (isOperator(value) && expression.length > 0 && isOperator(expression.slice(-1))) {
                expression = expression.slice(0, -1) + value;
            } else {
                expression += value;
            }
            updateDisplay();
        }
    });
});

function executeMath() {
    try {
        if (expression.trim() === "") return;
        // Strict operational sandbox execution mapping
        let output = Function('"use strict";return (' + expression + ')')();
        expression = Number(output.toFixed(4)).toString();
        updateDisplay();
    } catch (error) {
        display.value = "Error";
        expression = "";
    }
}
// Keyboard support matrix bindings
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        expression += key;
        updateDisplay();
    } else if (["+", "-", "*", "/", "%", "."].includes(key)) {
        if (isOperator(key) && expression.length > 0 && isOperator(expression.slice(-1))) {
            expression = expression.slice(0, -1) + key;
        } else {
            expression += key;
        }
        updateDisplay();
    } else if (key === "Enter") {
        event.preventDefault();
        executeMath();
    } else if (key === "Backspace") {
        expression = expression.slice(0, -1);
        updateDisplay();
    } else if (key === "Delete" || key === "Escape") {
        expression = "";
        updateDisplay();
    }
});

// Primary initial rendering check trigger
updateDisplay();
