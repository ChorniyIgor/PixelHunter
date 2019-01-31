import {actualState} from "./data";
import {levels} from "./data";

class UserResult {
  constructor() {
    this.results = [];
    this._userName = null;
  }

  set userName(name) {
    if (!this._userName) {
      this._userName = name;
    }
  }

  get userName() {
    return this._userName;
  }

  get getresults() {
    return this.results;
  }

  cleanResults() {
    this.results = [];
  }

  _saveUserAnswer(teg, value) {
    const bufer = Object.assign({}, this.results[actualState.level]);
    Object.assign(bufer, {[teg]: value});
    this.results[actualState.level] = bufer;
  }

  _getIconClass(data) {
    if (data.check) {
      if (data.time <= 10) {
        return `<li class="stats__result stats__result--fast"></li>`;
      } else if (data.time <= 20 && data.time > 10) {
        return `<li class="stats__result stats__result--correct"></li>`;
      } else if (data.time > 20) {
        return `<li class="stats__result stats__result--slow"></li>`;
      } else {
        return ``;
      }
    } else {
      return `<li class="stats__result stats__result--wrong "></li>`;
    }
  }

  get getUserLevelCount() {
    const result = this.results.length;
    if (result > 0) {
      return this.results.length - 1;
    } else {
      return 0;
    }
  }

  get rightLevelCount() {
    const data = this.results;
    let count = 0;
    data.forEach((el) => {
      if (el.check) {
        count++;
      }
    });
    return count;
  }

  get totalUserPoints() {
    const LEVEL_POINTS = 100;
    return (
      this.rightLevelCount * LEVEL_POINTS +
      this.getFastCount * 50 +
      actualState.lives * 50 -
      this.getLowCount * 50
    );
  }

  get totalUserTime() {
    let totalTime = 0;
    this.getresults.forEach((el) => {
      totalTime += el.time;
    });
    return totalTime;
  }

  getIcon() {
    const data = this.results;
    const TOTAL_LEVEL = levels.length - 1;
    let bufer = ``;

    data.forEach((el) => {
      if (el.ansanswer1) {
        bufer += this._getIconClass(el);
      }
    });

    const emptyCount = TOTAL_LEVEL - this.getUserLevelCount;

    for (let i = 0; i < emptyCount; i++) {
      bufer += `<li class="stats__result stats__result--unknown"></li>`;
    }
    return bufer;
  }

  get getFastCount() {
    const data = this.getresults;
    let count = 0;
    data.forEach((el) => {
      if (el.time < 10) {
        count++;
      }
    });
    return count;
  }

  get getLowCount() {
    const data = this.getresults;
    let count = 0;
    data.forEach((el) => {
      if (el.time > 20) {
        count++;
      }
    });
    return count;
  }
}

const result = new UserResult();
export default result;
