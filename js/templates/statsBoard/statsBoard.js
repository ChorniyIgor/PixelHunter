import StatsBoardViev from "./statsBoard-view";
import RenderScreen from "../../units/RenderScreen";
import Header from "../header/header";

class StatsBoard {
  constructor(data) {
    this.view = new StatsBoardViev(data);
  }

  init() {
    Header.getEmptyHeader();
    RenderScreen.addMain(this.view);
  }
}

export default StatsBoard;
