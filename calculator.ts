
const DISPLAY_ID = 'display';
const BUTTONS_CONTAINER_ID = 'buttons';
const ERROR_MESSAGE = 'Ошибка';

class Calculator {
  private display: HTMLInputElement;
  private currentInput: string = '0';
  private previousInput: string = '';
  private operator: string | null = null;

  constructor() {
    this.display = document.getElementById(DISPLAY_ID) as HTMLInputElement;
    
    this.initEventListeners();
    document.addEventListener('keydown', this.handleKeyboard.bind(this));
	}

  private initEventListeners(): void {
    const buttonsContainer = document.getElementById(BUTTONS_CONTAINER_ID) as HTMLDivElement;
    buttonsContainer.addEventListener('click', this.handleButtonClick.bind(this));
  }

  private handleButtonClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  const action = target.dataset.action;
  const value = target.dataset.value;
  
  if (!(target instanceof HTMLButtonElement)) return;
  if (!action) return;

  switch (action) {
    case 'digit':
      this.appendDigit(value!);
      break;
    case 'operator':
      this.chooseOperator(value!);
      break;
    case 'calculate':
      this.compute();
      break;
    case 'clear':
      this.clear();
      break;
    }
  }

  private handleKeyboard(event: KeyboardEvent): void {
    const key = event.key;
    if (key >= '0' && key <= '9' || key === '.') {
      this.appendDigit(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      this.chooseOperator(key);
    } else if (key === 'Enter' || key === '=') {
      this.compute();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      this.clear();
    }
  }

  appendDigit(digit: string): void {
     if (digit === '.' && this.currentInput.includes('.')) {
      return; 
    }
    if (this.currentInput === '0' && digit !== '.') {
      this.currentInput = digit;
    } else {
      this.currentInput += digit;
    }
   this.updateDisplay();
  }

  updateDisplay(): void {
    this.display.value = this.currentInput;
  }

  chooseOperator(op: string): void {
  if (this.operator !== null) {
    this.compute();
  }
  this.previousInput = this.currentInput;
  this.operator = op;
  this.currentInput = '0';
  }

  compute(): void {
  const prev = parseFloat(this.previousInput);
  const current = parseFloat(this.currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  let result: number;
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

  clear(): void {
    this.currentInput = '0';
    this.previousInput = '';
    this.operator = null;
    this.updateDisplay();
  }

  
}

interface CalculatorState {
  currentInput: string;
  previousInput: string;
  operator: string | null;
}


const calculator = new Calculator();