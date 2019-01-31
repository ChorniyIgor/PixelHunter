import RulesView from "./rules-view";
import UserResult from "../../data/userResult";
import RenderScreen from "../../units/RenderScreen";
import App from "../../app";

export default class Rules {
  constructor() {
    this.view = new RulesView();
  }

  init() {
    RenderScreen.addMain(this.view);
    this.view.onStart = (name) => {
      UserResult.userName = name;
      App.showGame();
    };
  }
}
