var screen = document.getElementsByClassName("screen")[0];

//precedence of operators
let precedence = new Map();
precedence.set("*", 2);
precedence.set("/", 3);
precedence.set("+", 0);
precedence.set("-", 0);

//function to setup data structures for "Shunting yard algorithm" and display result WIP****
function calc() {
  let nums = parseInput(screen.value);
  let output = [];
  let operatorStack = [];
  clearScreen();
  pushOperatorToQueue(operatorStack, output);
  screen.value = calcResult(output);
}

//calculate the postfix output, main calculation logic
function calcResult(queue) {
  let result = [];
  let operand1, operand2;
  for (let i = 0; i < queue.length; i++) {
    if (typeof queue[i] === "number") {
      result.push(queue[i]);
    } else {
      //NEEDS RESULT.POP() CHECKS AND OPERATOR CHECKS and FINAL RESULT ARRAY CHECKS
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
      }
    }
  }
  return result[i].toString();
}

//function to parse input
function parseInput(input) {
  let parsedInput = [];
  while (input.length > 0) {
    if (isNaN(parseFloat(input[0]))) {
      parsedInput.push(input[0]);
      input = input.replace(input[0], "");
    } else {
      parsedInput.push(parseFloat(input));
      input = input.replace(parseFloat(input).toString(), "");
    }
  }
  return parsedInput;
}

//function to push operators to output
function pushOperatorToQueue(operatorStack, output) {
  let operator;
  while ((operator = operatorStack.pop()) != "undefined") {
    output.push(operator);
  }
}

//function to check validity of operators
function valid(operator) {
  if (
    operator === "+" ||
    operator === "-" ||
    operator === "*" ||
    operator === "/"
  )
    return true;
  else return false;
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
