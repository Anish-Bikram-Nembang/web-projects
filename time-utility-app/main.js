"use strict";
const timeContainer = document.getElementsByClassName("time")[0];
const dateContainer = document.getElementsByClassName("date")[0];

function updateDateTime() {
  let time = new Date();
  timeContainer.textContent = time.toLocaleTimeString();
  dateContainer.textContent = time.toLocaleDateString();
}
updateDateTime();
setInterval(updateDateTime, 1000);

class StopWatch {
  #running = false;
  constructor(className) {
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
        this.element.textContent = (total / 1000).toFixed(2);
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
    stop();
    this.startTime = 0;
    this.elapsedTime = 0;
    this.element.textContent = "0.00";
  }
}

const watch = new StopWatch("stop-watch-time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
watch.element.textContent = "0.00";
startButton.addEventListener("click", watch.start.bind(watch));
stopButton.addEventListener("click", watch.stop.bind(watch));
resetButton.addEventListener("click", watch.reset.bind(watch));
