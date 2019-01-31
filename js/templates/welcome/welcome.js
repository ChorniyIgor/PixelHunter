import RenderScreen from "../../units/RenderScreen";
import showFooter from "../footer/footer";
import WelcomeViev from "./welcome-view";
import App from "../../app";

export default class Welcome {
  constructor() {
    this.view = new WelcomeViev();
  }

  init() {
    RenderScreen.cleanHeader();
    RenderScreen.addMain(this.view);
    this.view.onStart = () => {
      App.showGreeting();
    };
    RenderScreen.addFooter(showFooter);
  }
}
