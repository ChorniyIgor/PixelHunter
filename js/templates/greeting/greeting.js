import GreetingView from "./greeting-view";
import RenderScreen from "../../units/RenderScreen";
import App from "../../app";

class Greeting {
  constructor() {
    this.view = new GreetingView();
  }

  init() {
    RenderScreen.addMain(this.view);
    this.view.onStart = () => {
      App.showRules();
    };
  }
}

export default Greeting;
