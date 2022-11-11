"use strict";

class Calculator {
  previousBtn = "";
  constructor(previousOperand, currentOperand, operator) {
    this.previousOperand = previousOperand.innerHTML;

    this.currentOperand = currentOperand.innerHTML;
    this.operator = operator.innerHTML;
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operator = "";
    this.updateUI();
  }

  clearEntry() {
    this.currentOperand = "0";
    this.updateUI();
  }

  appendNumber(number) {
    if (Number(this.currentOperand) === 0) {
      this.currentOperand = "";
    }
    if (number === "." && this.currentOperand.indexOf(".") !== -1) return;
    this.currentOperand += number;
    this.updateUI();
  }

  updateUI() {
    currentOperand.innerHTML = this.currentOperand;
    previousOperand.innerHTML = this.previousOperand;
    operator.innerHTML = this.operator;
  }

  operation(operator) {
    if (this.previousOperand === "" && this.currentOperand === "0") return;
    if (this.currentOperand == -"0") {
      this.operator = operator;
      this.updateUI();
      return;
    }
    if (this.previousOperand !== "" && this.currentOperand !== "0") {
      this.calculate();
    }
    this.previousOperand = this.currentOperand;
    this.currentOperand = "0";

    this.operator = operator;
    this.updateUI();
  }
  calculate() {
    this.answer = 0;

    if (
      this.previousOperand === "" ||
      (this.previousOperand === "" && this.currentOperand === "0") ||
      this.operator === ""
    )
      return;
    if (this.operator === "+") {
      this.answer = Number(this.previousOperand) + Number(this.currentOperand);
    }
    if (this.operator === "-") {
      this.answer = Number(this.previousOperand) - Number(this.currentOperand);
    }
    if (this.operator === "*") {
      this.answer = Number(this.previousOperand) * Number(this.currentOperand);
    }
    if (this.operator === "/") {
      this.answer = Number(this.previousOperand) / Number(this.currentOperand);
    }
    this.currentOperand = this.answer.toString();
    this.previousOperand = "";
    this.operator = "";
    this.updateUI();
  }
}

const previousOperand = document.querySelector("[data-previous-operand]");
const currentOperand = document.querySelector(".number");
const operator = document.querySelector(".operator");

const btnNumbers = document.querySelectorAll("[data-number]");
const btnOperators = document.querySelectorAll("[data-operator]");
const btnClear = document.querySelector("[data-clear-all]");
const btnClearEntry = document.querySelector("[data-clear]");
const btnEquals = document.querySelector("[data-equals]");
const btnBack = document.querySelector(".btn-backspace");

console.log(operator.innerHTML);

const calculator = new Calculator(previousOperand, currentOperand, operator);

btnNumbers.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    if (calculator.previousBtn === "=") {
      calculator.clearAll();
    }
    calculator.appendNumber(btn.innerHTML);
    calculator.previousBtn = btn.innerHTML;
    console.log(calculator.previousBtn);
  })
);

btnOperators.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    calculator.operation(btn.innerHTML);
    calculator.previousBtn = btn.innerHTML;
  })
);

btnClear.addEventListener("click", (e) => {
  calculator.clearAll();
  calculator.previousBtn = btnClear.innerHTML;
});

btnClearEntry.addEventListener("click", (e) => {
  calculator.clearEntry();
  calculator.previousBtn = btnClearEntry.innerHTML;
});

btnEquals.addEventListener("click", (e) => {
  calculator.calculate();
  calculator.previousBtn = btnEquals.innerHTML;
  console.log(calculator.previousBtn);
});

btnBack.addEventListener("click", (e) => {
  // if (calculator.currentOperand.split("").length === 0) {
  //   calculator.currentOperand === "0";
  //   calculator.updateUI();
  //   return;
  // }
  const reducedArr = calculator.currentOperand.split("").slice(0, -1).join("");
  console.log(reducedArr);
  calculator.currentOperand = reducedArr ? reducedArr : "0";

  calculator.updateUI();
});
