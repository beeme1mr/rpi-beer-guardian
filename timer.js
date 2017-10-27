const TIMEOUT = 5000;

class Timer {
  updateTimer(t = TIMEOUT) {
    clearTimeout(this.timer);
    this.timer = setTimeout(killScreen, t);
  }

  stopTimer() {
    console.log("timer cleared");
    clearTimeout(this.timer);
  }

  startTimer(shutdownAnimation) {
    console.log("timer started");
    this.timer = setTimeout(shutdownAnimation, TIMEOUT);
  }
}

module.exports = Timer;
