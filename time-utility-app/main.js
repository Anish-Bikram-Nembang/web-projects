"use strict";

//Date and Time
class DateTime {
  constructor(timeElement, dateElement) {
    this.time = document.getElementsByClassName(timeElement)[0];
    this.date = document.getElementsByClassName(dateElement)[0];
  }
}
const dateAndTime = new DateTime("time", "date");

//StopWatch
class StopWatch {
  running = false;
  constructor(className) {
    this.time = 0;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.element = document.getElementsByClassName(className)[0];
  }
  start() {
    if (this.running === false) {
      this.running = true;
      this.startTime = Date.now();
    }
  }
  stop() {
    if (this.running) {
      this.running = false;
      this.elapsedTime += Date.now() - this.startTime;
    }
  }
  reset() {
    this.stop();
    this.startTime = 0;
    this.elapsedTime = 0;
    this.time = 0;
  }
}
const watch = new StopWatch("stop-watch-time");
const stopWatchStartButton = document.getElementById("stopwatch-start");
const stopWatchStopButton = document.getElementById("stopwatch-stop");
const stopWatchResetButton = document.getElementById("stopwatch-reset");

stopWatchStartButton.addEventListener("click", watch.start.bind(watch));
stopWatchStopButton.addEventListener("click", watch.stop.bind(watch));
stopWatchResetButton.addEventListener("click", watch.reset.bind(watch));

//Timer
class Timer {
  running = false;
  constructor(className) {
    this.endTime = 0;
    this.remaining = 0;
    this.time = 0;
    this.element = document.getElementsByClassName(className)[0];
  }
  increment() {
    this.time += 1000;
    this.remaining = this.time;
  }
  decrement() {
    if (this.time >= 1000) {
      this.time -= 1000;
      this.remaining = this.time;
    }
  }
  start() {
    if (this.running === false && this.remaining > 0) {
      this.running = true;
      this.endTime = Date.now() + this.remaining;
    }
  }
  stop() {
    if (this.running) {
      this.running = false;
      this.remaining = this.endTime - Date.now();
    }
  }
  reset() {
    this.running = false;
    this.remaining = 0;
    this.time = 0;
  }
}
const timer = new Timer("timer-time");
const timerIncrementButton = document.getElementById("timer-increment");
const timerDecrementButton = document.getElementById("timer-decrement");
const timerStartButton = document.getElementById("timer-start");
const timerStopButton = document.getElementById("timer-stop");
const timerResetButton = document.getElementById("timer-reset");

timerIncrementButton.addEventListener("click", timer.increment.bind(timer));
timerDecrementButton.addEventListener("click", timer.decrement.bind(timer));
timerStartButton.addEventListener("click", timer.start.bind(timer));
timerStopButton.addEventListener("click", timer.stop.bind(timer));
timerResetButton.addEventListener("click", timer.reset.bind(timer));

//main data to view function
function dataToView() {
  //to update date and time
  const dateAndTimeElement = new Date();
  dateAndTime.time.textContent = dateAndTimeElement.toLocaleTimeString();
  dateAndTime.date.textContent = dateAndTimeElement.toLocaleDateString();

  //to update stop watch
  if (watch.running) {
    const currentTime = Date.now();
    const total = watch.elapsedTime + (currentTime - watch.startTime);
    watch.element.textContent = (total / 1000).toFixed(2);
  } else if (watch.elapsedTime === 0) {
    watch.element.textContent = Number(0).toFixed(2);
  }

  //to update timer
  if (timer.running) {
    timer.remaining = timer.endTime - Date.now();

    if (timer.remaining <= 0) {
      timer.remaining = 0;
      timer.running = false;
      timer.time = 0;
    }

    timer.element.textContent = (timer.remaining / 1000).toFixed(2);
  } else {
    timer.element.textContent = (timer.remaining / 1000).toFixed(2);
  }
}
setInterval(dataToView, 100);
