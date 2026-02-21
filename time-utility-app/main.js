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
  constructor(className) {
    this.time = 0;
    this.element = document.getElementsByClassName(className)[0];
  }
  start() {
    let startTime = Date.now();
    this.intervalID = setInterval(() => {
      this.time = (Date.now() - startTime) / 1000;
      this.element.textContent = this.time;
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalID);
  }
  reset() {}
}

const watch = new StopWatch("stop-watch-time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
watch.element.textContent = watch.time;
startButton.addEventListener("click", watch.start.bind(watch));
stopButton.addEventListener("click", watch.stop.bind(watch));
