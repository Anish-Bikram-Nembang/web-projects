"use strict";
class DateTime {
  constructor(timeElement, dateElement) {
    this.time = document.getElementsByClassName(timeElement)[0];
    this.date = document.getElementsByClassName(dateElement)[0];
  }
}
const dateAndTime = new DateTime("time", "date");

class StopWatch {
  #running = false;
  constructor(className) {
    this.time = 0;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.element = document.getElementsByClassName(className)[0];
  }
  start() {
    if (this.#running === false) {
      this.#running = true;
      this.startTime = Date.now();
      this.startIntervalID = setInterval(() => {
        const currentTime = Date.now();
        const total = this.elapsedTime + (currentTime - this.startTime);
        this.time = (total / 1000).toFixed(2);
      }, 16);
    }
  }
  stop() {
    if (this.#running) {
      clearInterval(this.startIntervalID);
      this.#running = false;
      this.elapsedTime += Date.now() - this.startTime;
    }
  }
  reset() {
    this.stop();
    this.startTime = 0;
    this.elapsedTime = 0;
    this.time = "0.00";
  }
}
class Timer {
  //Todo
}

//for stopwatch
const watch = new StopWatch("stop-watch-time");
const stopWatchStartButton = document.getElementById("stopwatch-start");
const stopWatchStopButton = document.getElementById("stopwatch-stop");
const stopWatchResetButton = document.getElementById("stopwatch-reset");

stopWatchStartButton.addEventListener("click", watch.start.bind(watch));
stopWatchStopButton.addEventListener("click", watch.stop.bind(watch));
stopWatchResetButton.addEventListener("click", watch.reset.bind(watch));

//for timer
const timer = new Timer("timer-time");
const timerIncrementButton = document.getElementById("timer-increment");
const timerDecrementButton = document.getElementById("timer-decrement");
const timerStartButton = document.getElementById("timer-start");
const timerResetButton = document.getElementById("timer-reset");

// timerIncrementButton.addEventListener("click");
// timerDecrementButton.addEventListener("click");
// timerStartButton.addEventListener("click");
// timerResetButton.addEventListener("click");

//main data to view function
function dataToView() {
  watch.element.textContent = watch.time;

  //to update date and time
  const dateAndTimeElement = new Date();
  dateAndTime.time.textContent = dateAndTimeElement.toLocaleTimeString();
  dateAndTime.date.textContent = dateAndTimeElement.toLocaleDateString();
}

setInterval(dataToView, 1000);
