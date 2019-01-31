import AbstractViev from "../../viewModel";

export default class WelcomeViev extends AbstractViev {
  get template() {
    return `
    <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk intro__asterisk--welcome">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
    </div>`.trim();
  }

  bind() {
    let nextBtn = this.element.querySelector(`.intro__asterisk`);
    nextBtn.addEventListener(`click`, () => {
      this.onStart();
    });
  }

  onStart() {}
}
