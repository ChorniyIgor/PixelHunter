import {actualState} from "../data/data";

class Timer {
  constructor() {
    this.intervalId = null;
  }

  timerStart() {
    if (this.intervalId) {
      this.timerStop();
    }
    this.intervalId = setInterval(() => {
      actualState.time++;
      this.whenTimerUpdate();
    }, 1000);
  }

  timerStop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = null;
    actualState.time = 0;
  }
}

const timer = new Timer();
export default timer;
