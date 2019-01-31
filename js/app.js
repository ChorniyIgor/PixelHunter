import Welcome from "./templates/welcome/welcome";
import Greeting from "./templates/greeting/greeting";
import Rules from "./templates/rules/rules";
import Game from "./templates/game/game";
import Stats from "./templates/statistic/statistic";
import StatsBoard from "./templates/statsBoard/statsBoard";
import UserResult from "./data/userResult";
import networkModel from "./networkModel";
import DataAdapter from "./data/PixelHunterDataAdapter";
import {levels} from "./data/data";

class App {
  constructor() {
    this.networkModel = new class extends networkModel {
      get urlRead() {
        return `https://intensive-ecmascript-server-srmhvdwcks.now.sh/pixel-hunter/questions`;
      }
      get urlWrite() {
        return `https://intensive-ecmascript-server-srmhvdwcks.now.sh/pixel-hunter/stats/marker212`;
      }
      get urlReadStats() {
        return `https://intensive-ecmascript-server-srmhvdwcks.now.sh/pixel-hunter/stats/marker212`;
      }
    }();
  }

  loadData() {
    this.showPreloader();
    return this.networkModel
      .load()
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        return DataAdapter.preprocess(data);
      })
      .then((data) => {
        levels.splice(0, levels.length);
        levels.push(...data);
        this.hidePreloader();
      });
  }

  sendStats(data) {
    this.showPreloader();
    return this.networkModel.send(data, DataAdapter).then(() => {
      this.loadStats();
    });
  }

  loadStats() {
    this.showPreloader();
    this.networkModel
      .loadStats()
      .then((resp) => {
        return resp.json();
      })
      .catch(() => [])
      .then((data) => {
        this.showStatsBoard(data);
      })
      .then(() => {
        this.hidePreloader();
      });
  }

  showPreloader() {
    document.querySelector(`body`).classList.add(`preloading`);
  }

  hidePreloader() {
    const body = document.querySelector(`body`);
    if (body.classList.contains(`preloading`)) {
      body.classList.remove(`preloading`);
    }
  }

  showWelcome() {
    if (UserResult.userName) {
      new Game().init();
    } else {
      new Welcome().init();
    }
  }

  showGreeting() {
    new Greeting().init();
  }

  showRules() {
    new Rules().init();
  }

  showGame() {
    new Game().init();
  }

  showStats(failFlag) {
    new Stats(failFlag).init();
  }

  showStatsBoard(data) {
    new StatsBoard(data).init();
  }
}
const app = new App();
export default app;
