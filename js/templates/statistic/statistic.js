import StatisticView from "./statistic-view";
import RenderScreen from "../../units/RenderScreen";
import Header from "../header/header";
import App from "../../app";
import UserResult from "../../data/userResult";

class Stats {
  constructor(failFlag = false) {
    this.view = new StatisticView(failFlag);
  }

  init() {
    Header.updateHeader();
    RenderScreen.cleanHeader();
    RenderScreen.addMain(this.view);
    this.view.onStart = () => {
      const userName = UserResult.userName;
      const totalTime = UserResult.totalUserTime;
      const totalPoints = UserResult.totalUserPoints;
      App.sendStats({
        userName,
        totalTime,
        totalPoints
      });
    };
  }
}

export default Stats;
