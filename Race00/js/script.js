class AdvancedCalculator {
    constructor() {
        this.currentValue = "0";
        this.historyValue = "";
        this.operator = null;
        this.memory = 0;
        this.resetNext = false;
        this.outputElement = document.getElementById("output");
        this.historyElement = document.getElementById("history");
        this.initializeButtons();
        this.updateDisplay();
        document.addEventListener("keydown", (event) => this.handleKeyPress(event));
    }

    initializeButtons() {
        document.querySelectorAll(".number").forEach(button => {
            button.addEventListener("click", () => this.appendNumber(button.id));
        });

        document.getElementById("clear").addEventListener("click", () => this.clear());
        document.getElementById("sign").addEventListener("click", () => this.toggleSign());
        document.getElementById("percent").addEventListener("click", () => this.percent());
        document.getElementById("decimal").addEventListener("click", () => this.appendDecimal());

        document.querySelectorAll(".operator").forEach(button => {
            button.addEventListener("click", () => this.chooseOperator(button.id));
        });

        document.getElementById("equals").addEventListener("click", () => this.calculate());
        document.getElementById("sqrt").addEventListener("click", () => this.sqrt());
        document.getElementById("power").addEventListener("click", () => this.power());
        document.getElementById("factorial").addEventListener("click", () => this.factorial());
        document.getElementById("memory-add").addEventListener("click", () => this.memoryAdd());
        document.getElementById("memory-subtract").addEventListener("click", () => this.memorySubtract());
        document.getElementById("memory-recall").addEventListener("click", () => this.memoryRecall());
        document.getElementById("memory-clear").addEventListener("click", () => this.memoryClear());
        document.getElementById("length").addEventListener("click", () => this.convertLength("centimeters", "meters"));
        document.getElementById("weight").addEventListener("click", () => this.convertWeight("grams", "kilograms"));
        document.getElementById("area").addEventListener("click", () => this.convertArea("squareCentimeters", "squareMeters"));
        document.getElementById("numeral").addEventListener("click", () => this.convertNumeralSystem(10, 2)); // Convert to binary
        document.getElementById("copy").addEventListener("click", () => this.copyHistory());
        document.getElementById("paste").addEventListener("click", () => this.pasteHistory());
    }

    handleKeyPress(event) {
        const key = event.key;

        if (!isNaN(key)) {
            this.appendNumber(key);
        } else if (key === ".") {
            this.appendDecimal();
        } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {
            this.chooseOperator(this.getOperatorIdFromKey(key));
        } else if (key === "Enter" || key === "=") {
            this.calculate();
        } else if (key === "Backspace") {
            this.clear();
        } else if (key === "Escape") {
            this.clear();
        } else if (key === "!") {
            this.factorial();
        } else if (key === "^") {
            this.power();
        }
    }
    getOperatorIdFromKey(key) {
        switch (key) {
            case "+":
                return "add";
            case "-":
                return "subtract";
            case "*":
                return "multiply";
            case "/":
                return "divide";
            case "%":
                return "divide";
            default:
                return null;
        }
    }

    convertLength(unitFrom, unitTo) {
        const lengthConversions = {
            "centimeters": 1,
            "meters": 100,
            "kilometers": 100000,
        };
        const fromValue = parseFloat(this.currentValue);
        if (!isNaN(fromValue)) {
            const toValue = fromValue * lengthConversions[unitFrom] / lengthConversions[unitTo];
            this.currentValue = toValue.toString();
            this.updateDisplay();
        }
    }
    
    convertWeight(unitFrom, unitTo) {
        const weightConversions = {
            "grams": 1,
            "kilograms": 1000,
            "tonnes": 1000000,
        };
        const fromValue = parseFloat(this.currentValue);
        if (!isNaN(fromValue)) {
            const toValue = fromValue * weightConversions[unitFrom] / weightConversions[unitTo];
            this.currentValue = toValue.toString();
            this.updateDisplay();
        }
    }
    
    convertArea(unitFrom, unitTo) {
        const areaConversions = {
            "squareCentimeters": 1,
            "squareMeters": 10000,
            "hectares": 1000000,
            "squareKilometers": 10000000000,
        };
        const fromValue = parseFloat(this.currentValue);
        if (!isNaN(fromValue)) {
            const toValue = fromValue * areaConversions[unitFrom] / areaConversions[unitTo];
            this.currentValue = toValue.toString();
            this.updateDisplay();
        }
    }
    
    convertNumeralSystem(fromBase, toBase) {
        const value = parseInt(this.currentValue, fromBase);
        if (!isNaN(value)) {
            this.currentValue = value.toString(toBase).toUpperCase();
            this.updateDisplay();
        }
    }
    
    // Add copy and paste functionality
    copyHistory() {
        navigator.clipboard.writeText(this.historyValue);
    }
    
    pasteHistory() {
        navigator.clipboard.readText().then(text => {
            this.currentValue = text;
            this.updateDisplay();
        });
    }
    formatValue(value) {
        const maxLength = 13;
    
        let stringValue = value.toString();
    
        if (stringValue.length <= maxLength) {
            return stringValue;
        }
    
        if (stringValue.includes('.')) {
            const integerPart = stringValue.split('.')[0];
            const decimalPart = stringValue.split('.')[1];
            const allowedDecimalLength = maxLength - integerPart.length - 1; // -1 для точки

            const roundedValue = Number(value).toFixed(allowedDecimalLength);

            if (roundedValue.length > maxLength) {
                return roundedValue.substring(0, maxLength);
            }

            return roundedValue;
        } else {
            const expValue = Number(stringValue).toExponential(maxLength - 5); // -5 для "e+xx"
            const parts = expValue.split('e');
            const mantissa = parts[0];
            const exponent = parts[1];
            
            if (mantissa.length > maxLength - exponent.length - 2) {
                const adjustedMantissa = Number(mantissa).toFixed(maxLength - exponent.length - 3);
                return adjustedMantissa + 'e' + exponent;
            }
            
            return expValue;
        }
    }
    
    updateDisplay() {
        this.outputElement.innerText = this.formatValue(this.currentValue);
        this.historyElement.innerText = this.historyValue;
    }

    appendNumber(number) {
        if (this.resetNext) {
            this.currentValue = number;
            this.resetNext = false;
        } else {
            this.currentValue = this.currentValue === "0" ? number : this.currentValue + number;
        }
        this.updateDisplay();
    }

    appendDecimal() {
        if (this.resetNext) {
            this.currentValue = "0.";
            this.resetNext = false;
        } else if (!this.currentValue.includes(".")) {
            this.currentValue += ".";
        }
        this.updateDisplay();
    }

    clear() {
        this.currentValue = "0";
        this.historyValue = "";
        this.operator = null;
        this.resetNext = false;
        this.updateDisplay();
    }

    toggleSign() {
        this.currentValue = this.currentValue.startsWith("-") ? this.currentValue.slice(1) : "-" + this.currentValue;
        this.updateDisplay();
    }

    percent() {
        this.currentValue = (parseFloat(this.currentValue) / 100).toString();
        this.updateDisplay();
    }

    chooseOperator(operator) {
        if (this.currentValue === "0" && operator === "subtract") {
            this.currentValue = "-";
            this.updateDisplay();
            return;
        }

        if (this.operator !== null) {
            this.calculate();
        }

        this.operator = operator;
        // this.historyValue = this.formatValue(this.currentValue) + " " + this.getOperatorSymbol(operator);
        this.historyValue = this.currentValue + " " + this.getOperatorSymbol(operator);
        this.resetNext = true;
        this.updateDisplay();
    }

    getOperatorSymbol(operator) {
        switch (operator) {
            case "add":
                return "+";
            case "subtract":
                return "-";
            case "multiply":
                return "x";
            case "divide":
                return "÷";
            case "power":
                return "^";
            default:
                return "";
        }
    }

    calculate() {
        if (this.operator === null || this.resetNext) return;

        const prev = parseFloat(this.historyValue);
        const current = parseFloat(this.currentValue);

        let result;

        switch (this.operator) {
            case "add":
                result = prev + current;
                break;
            case "subtract":
                result = prev - current;
                break;
            case "multiply":
                result = prev * current;
                break;
            case "divide":
                result = prev / current;
                break;
            case "power":
                result = Math.pow(prev, current);
                break;
            default:
                return;
        }

        this.currentValue = result.toString();
        this.historyValue = "";
        this.operator = null;
        this.resetNext = true;
        this.updateDisplay();
    }

    sqrt() {
        const value = parseFloat(this.currentValue);
        if (value < 0) return;
        this.currentValue = Math.sqrt(value).toString();
        this.updateDisplay();
    }

    power() {
        this.operator = "power";
        this.historyValue = this.currentValue + " ^";
        this.resetNext = true;
        this.updateDisplay();
    }

    factorial() {
        const value = parseInt(this.currentValue);
        if (value < 0) return;
        this.currentValue = this.factorialRecursive(value).toString();
        this.updateDisplay();
    }

    factorialRecursive(n) {
        return n <= 1 ? 1 : n * this.factorialRecursive(n - 1);
    }

    memoryAdd() {
        this.memory += parseFloat(this.currentValue);
    }

    memorySubtract() {
        this.memory -= parseFloat(this.currentValue);
    }

    memoryRecall() {
        this.currentValue = this.memory.toString();
        this.updateDisplay();
    }

    memoryClear() {
        this.memory = 0;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new AdvancedCalculator();
});
