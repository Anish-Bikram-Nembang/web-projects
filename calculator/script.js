var screen = document.getElementsByClassName("screen")[0];

//precedence of operators
let precedence = new Map();
precedence.set("*", 1);
precedence.set("/", 1);
precedence.set("%", 1);
precedence.set("+", 0);
precedence.set("-", 0);

//array to store HISTORY
let history = [];

//function to setup data structures for "Shunting yard algorithm" and display result
function calc() {
  if (checkSyntax(screen.value)) {
    clearScreen();
    displayError();
    return;
  }
  let nums = parseInput(screen.value);
  let output = [];
  let operatorStack = [];
  history.push(screen.value);
  clearScreen();
  let length = nums.length;
  for (let i = 0; i < length; i++) {
    if (typeof nums[i] === "number") {
      output.push(nums[i]);
    } else {
      //if operator stack is empty
      if (operatorStack.length < 1) {
        operatorStack.push(nums[i]);
      } else {
        //check precedence of operators
        //while precedence is lower
        while (
          operatorStack.length > 0 &&
          precedence.get(nums[i]) <=
            precedence.get(operatorStack[operatorStack.length - 1])
        ) {
          output.push(operatorStack.pop());
        }
        operatorStack.push(nums[i]);
      }
    }
  }
  pushOperatorToQueue(operatorStack, output);
  let result = calcResult(output);
  history.push(history.pop() + " = " + result);
  appendNewResultToHistory(history[history.length - 1]);
  screen.value = result;
  console.log(history);
}

//calculate the postfix output, main calculation logic
function calcResult(queue) {
  let result = [];
  let operand1, operand2;
  for (let i = 0; i < queue.length; i++) {
    if (typeof queue[i] === "number") {
      result.push(queue[i]);
    } else {
      operand1 = result.pop();
      operand2 = result.pop();
      switch (queue[i]) {
        case "+":
          result.push(operand2 + operand1);
          break;
        case "-":
          result.push(operand2 - operand1);
          break;
        case "*":
          result.push(operand2 * operand1);
          break;
        case "/":
          result.push(operand2 / operand1);
          break;
        case "%":
          result.push(operand2 % operand1);
          break;
      }
    }
  }
  return Number.isInteger(result[0])
    ? result[0].toString()
    : result[0].toFixed(4).toString();
}

//function to parse input
function parseInput(input) {
  const tokens = input.match(/\d+(\.\d+)?|[+\-*/%]/g);
  return tokens.map((token) => (isNaN(token) ? token : Number(token)));
}

//function to push operators to output
function pushOperatorToQueue(operatorStack, output) {
  let operator;
  while (typeof (operator = operatorStack.pop()) != "undefined") {
    output.push(operator);
  }
}

//function to display error
function displayError() {
  screen.value = "ERROR";
}
//function to add value of button pressed to input
function addElement(value) {
  if (screen.value === "ERROR") clearScreen();
  var newInput;
  if (typeof value != "string") {
    newInput = screen.value + value.toString();
  } else {
    newInput = screen.value + value;
  }
  screen.value = newInput;
}
//function to clear screen
function clearScreen() {
  screen.value = "";
}
//function for backspace button
function deleteElement() {
  screen.value = screen.value.slice(0, -1);
}

function showHistory() {
  const historyDiv = document.getElementsByClassName("history")[0];
  historyDiv.classList.remove("invisible");
}
function hideHistory() {
  const historyDiv = document.getElementsByClassName("history")[0];
  historyDiv.classList.add("invisible");
}

function appendNewResultToHistory(result) {
  const historyList = document.getElementsByClassName("history-list")[0];
  const li = document.createElement("li");
  li.textContent = result;
  historyList.appendChild(li);
}

function checkSyntax(input) {
  return /[^0-9+\-*/().\s]/.test(input);
}
