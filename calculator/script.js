var screen = document.getElementsByClassName("screen")[0];

//precedence of operators
let precedence = new Map();
precedence.set("*", 2);
precedence.set("/", 3);
precedence.set("+", 0);
precedence.set("-", 0);

//main logic calculator function
function calc() {
  const input = screen.value;
  clearScreen();
  let nums = parseInput(input);
  let inputLength = input.length;
  while (inputLength > 0) {
    let current = input[i];
    if (isNaN(current)) input.replace(current.toString(), "");
    inputLength -= current.toString().length;
  }
  console.log(nums);
  let outputQueue = [];
  let operatorStack = [];
  for (let i = 0; i < nums.length; i++) {
    if (typeof nums[i] === "number") {
      outputQueue.push(nums[i]);
    } else {
      if (valid(nums[i])) {
        let operatorOnTop = 0;
        operatorInInput = nums[i];
        while (operatorOnTop != undefined) {
          operatorOnTop = operatorStack.pop();
          if (
            precedence.get(operatorInInput) <= precedence.get(operatorOnTop)
          ) {
            outputQueue.push(operatorOnTop);
            operatorStack.push(operatorInInput);
          } else {
            operatorStack.push(operatorOnTop);
            operatorStack.push(operatorInInput);
            break;
          }
        }
      } else {
        displayError();
      }
    }
  }
  pushOperatorToQueue(operatorStack, outputQueue);
  screen.value = calcResult(outputQueue);
}

//calculate the postfix output outputQueue NEEDS TUNINGGGGG*****AND MORE VALIDATION CHECKS*****
function calcResult(queue) {
  let result = [];
  let operand1, operand2;
  for (let i = 0; i < queue.length; i++) {
    if (typeof queue[i] === "number") {
      result.push(queue[i]);
    } else {
      //NEEDS RESULT.POP() CHECKS AND OPERATOR CHECKS
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

//function to push operators to queue
//function pushOperatorToQueue(operatorStack, outputQueue);

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
//utility function to clear screen
function clearScreen() {
  screen.value = "";
}
//function for backspace button
function deleteElement() {
  screen.value = screen.value.slice(0, -1);
}
