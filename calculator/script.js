var screen = document.getElementsByClassName("screen")[0];

function calc() {
  const input = screen.value;
  screen.value = "";
  let nums = [];
  for (let i = 0; i < input.length; i++) {
    let currentDigit = parseFloat(input[i]);
    if (!isNaN(currentDigit)) {
      if (i == 0 || isNaN(parseFloat(input[i - 1]))) {
        nums.push(currentDigit);
      } else {
        nums.push(nums.pop() * 10 + currentDigit);
      }
    } else {
      nums.push(input[i]);
    }
  }
  // nums = input.split(/[+/*%-]/);
  console.log(nums);
  let outputQueue = [];
  let operatorStack = [];
  for (let i = 0; i < nums.queue; i++) {
    if (typeof nums[i] === "number") {
      outputQueue.push(nums[i]);
    } else {
      let operatorOnTop = 0;
      while (operatorOnTop != undefined) {
        operatorInInput = nums[i];
        operatorOnTop = operatorStack.pop();
        if (precedence(operatorInInput) <= precedence(operatorOnTop)) {
        }
      }
    }
  }
}

function addElement(value) {
  var newInput;
  if (typeof value != "string") {
    newInput = screen.value + value.toString();
  } else {
    newInput = screen.value + value;
  }
  screen.value = newInput;
}

function clearScreen() {
  screen.value = "";
}

function deleteElement() {
  screen.value = screen.value.slice(0, -1);
}
