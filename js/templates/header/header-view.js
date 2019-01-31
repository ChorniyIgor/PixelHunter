import AbstractViev from "../../viewModel";

export default class HeaderView extends AbstractViev {
  constructor(actualState, emptyFlag = false) {
    super();
    this.lives = actualState.lives;
    this.level = actualState.level;
    this.time = actualState.time;
    this._empty = emptyFlag;
  }

  get template() {
    if (this._empty) {
      return `
      <header class="header">
              <div class="header__back">
              <span class="back">
                  <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
                  <img src="img/logo_small.png" width="101" height="44">
              </span>
              </div>
              <a href="#" class="header__stats">Статистика</a>
              </header>`.trim();
    } else {
      return `
    <header class="header">
            <div class="header__back">
            <span class="back">
                <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
                <img src="img/logo_small.png" width="101" height="44">
            </span>
            </div>
            <a href="#" class="header__stats">Статистика</a>
            <div class="game_status">
              <h2>level ${this.level}
              <h1 class="game__timer">${this.time}</h1>
              </h2>
              <div class="game__lives">
              ${new Array(3 - this.lives)
                .fill(
                  `<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`
                )
                .join(``)}
              ${new Array(this.lives)
                .fill(
                  `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`
                )
                .join(``)}
                
             </div>
            </div>
            </header>`.trim();
    }
  }

  bind() {
    const back = this.element.querySelector(`.header__back`);
    back.addEventListener(`click`, () => {
      this.onClick();
    });
    const stats = this.element.querySelector(`.header__stats`);
    stats.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.statsClick();
    });
  }
  statsClick() {}
  onClick() {}
}
