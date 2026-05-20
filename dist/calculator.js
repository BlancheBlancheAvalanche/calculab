"use strict";
const DISPLAY_ID = 'display';
const BUTTONS_CONTAINER_ID = 'buttons';
const ERROR_MESSAGE = 'Ошибка';
class Calculator {
    constructor() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.display = document.getElementById(DISPLAY_ID);
        this.initEventListeners();
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
    }
    initEventListeners() {
        const buttonsContainer = document.getElementById(BUTTONS_CONTAINER_ID);
        buttonsContainer.addEventListener('click', this.handleButtonClick.bind(this));
    }
    handleButtonClick(event) {
        const target = event.target;
        const action = target.dataset.action;
        const value = target.dataset.value;
        if (!(target instanceof HTMLButtonElement))
            return;
        if (!action)
            return;
        switch (action) {
            case 'digit':
                this.appendDigit(value);
                break;
            case 'operator':
                this.chooseOperator(value);
                break;
            case 'calculate':
                this.compute();
                break;
            case 'clear':
                this.clear();
                break;
        }
    }
    handleKeyboard(event) {
        const key = event.key;
        if (key >= '0' && key <= '9' || key === '.') {
            this.appendDigit(key);
        }
        else if (key === '+' || key === '-' || key === '*' || key === '/') {
            this.chooseOperator(key);
        }
        else if (key === 'Enter' || key === '=') {
            this.compute();
        }
        else if (key === 'Escape' || key === 'c' || key === 'C') {
            this.clear();
        }
    }
    appendDigit(digit) {
        if (digit === '.' && this.currentInput.includes('.')) {
            return;
        }
        if (this.currentInput === '0' && digit !== '.') {
            this.currentInput = digit;
        }
        else {
            this.currentInput += digit;
        }
        this.updateDisplay();
    }
    updateDisplay() {
        this.display.value = this.currentInput;
    }
    chooseOperator(op) {
        if (this.operator !== null) {
            this.compute();
        }
        this.previousInput = this.currentInput;
        this.operator = op;
        this.currentInput = '0';
    }
    compute() {
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        if (isNaN(prev) || isNaN(current))
            return;
        let result;
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.currentInput = ERROR_MESSAGE;
                    this.updateDisplay();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        this.currentInput = result.toString();
        this.operator = null;
        this.previousInput = '';
        this.updateDisplay();
    }
    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.updateDisplay();
    }
}
const calculator = new Calculator();
//# sourceMappingURL=calculator.js.map