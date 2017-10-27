const TIMEOUT = 5 * 60;

class Timer {
  updateTimer(t = TIMEOUT) {
    clearTimeout(this.timer);
    this.timer = setTimeout(killScreen, t);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  startTimer(shutdownAnimation) {
    this.timer = setTimeout(shutdownAnimation, TIMEOUT);
  }
}

module.export = Timer;
