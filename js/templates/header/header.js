import HeaderView from "./header-view";
import RenderScreen from "../../units/RenderScreen";
import {actualState} from "../../data/data";
import Timer from "../../units/timer";
import App from "../../app";

class Header {
  constructor() {
    this.intervalId = null;
  }

  get levelTime() {
    return actualState.time;
  }

  renderHeaderView(empty = false) {
    const header = new HeaderView(actualState, empty);
    header.onClick = () => {
      App.loadData().then(App.showWelcome);
    };
    header.statsClick = () => {
      Timer.timerStop();
      App.loadStats();
    };
    return header;
  }

  updateHeader() {
    RenderScreen.addHeader(this.renderHeaderView());
  }

  getEmptyHeader() {
    RenderScreen.addHeader(this.renderHeaderView(true));
  }
}
const header = new Header();
export default header;
