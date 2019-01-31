import AbstractViev from "../../viewModel";
import {levels} from "../../data/data";
import UserResult from "../../data/userResult";

export default class gameView extends AbstractViev {
  constructor(actualState) {
    super();
    this.actualLevel = actualState.level;
    this.levelData = levels[this.actualLevel];
  }

  templateScreen1() {
    return `  <div class="game">
    <p class="game__task">${this.levelData.question}</p>
    <form class="game__content">
      <div class="game__option">

        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">

        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
      ${UserResult.getIcon()}
      </ul>
    </div>
    </div>`.trim();
  }

  bindTemplateScreen1() {
    const thisTemplate = this.element;

    const question1 = [...thisTemplate.querySelectorAll(`[name=question1]`)];

    let ask1 = false;
    const question2 = [...thisTemplate.querySelectorAll(`[name=question2]`)];
    let ask2 = false;

    question1.forEach((item) => {
      item.addEventListener(`change`, (el) => {
        ask1 = true;
        UserResult._saveUserAnswer(`ansanswer1`, item.value);
        showNextLevel();
      });
    });

    question2.forEach((item) => {
      item.addEventListener(`change`, () => {
        ask2 = true;
        UserResult._saveUserAnswer(`ansanswer2`, item.value);
        showNextLevel();
      });
    });

    const showNextLevel = () => {
      if (ask1 && ask2) {
        this.onStart();
      }
    };
  }

  templateScreen2() {
    return `<div class="game">
    <p class="game__task">${this.levelData.question}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">

        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
      ${UserResult.getIcon()}
      </ul>
    </div>
    </div>`.trim();
  }

  bindTemplateScreen2() {
    const thisTemplate = this.element;
    const nextElements = [...thisTemplate.querySelectorAll(`[name=question1]`)];

    nextElements.forEach((item) => {
      item.addEventListener(`change`, () => {
        UserResult._saveUserAnswer(`ansanswer1`, item.value);
        this.onStart();
      });
    });
  }

  templateScreen3() {
    return `<div class="game">
    <p class="game__task">${this.levelData.question}</p>
    <form class="game__content  game__content--triple">
      <label class="game__option">
          <input name="question1" type="radio" value="photo-1">

      </label>
      <label class="game__option">
          <input name="question1" type="radio" value="photo-2">

      </label>
      <label class="game__option">
          <input name="question1" type="radio" value="photo-3">

      </label>
    </form>
    <div class="stats">
      <ul class="stats">
      ${UserResult.getIcon()}
      </ul>
    </div>
    </div>`.trim();
  }

  bindTemplateScreen3() {
    const thisTemplate = this.element;
    const nextElements = thisTemplate.querySelectorAll(`[name=question1]`);

    nextElements.forEach((item) => {
      item.addEventListener(`click`, () => {
        UserResult._saveUserAnswer(`ansanswer1`, item.value);
        this.onStart();
      });
    });
  }

  get template() {
    const levelType = this.levelData.levelTipe;

    switch (levelType) {
      case `level-1`:
        return this.templateScreen1();
      case `level-2`:
        return this.templateScreen2();
      case `level-3`:
        return this.templateScreen3();
      default:
        throw new Error(`Invalid level type. Actual level ${this.actualLevel}`);
    }
  }

  bind() {
    const levelType = this.levelData.levelTipe;

    switch (levelType) {
      case `level-1`:
        this.bindTemplateScreen1();
        break;
      case `level-2`:
        this.bindTemplateScreen2();
        break;
      case `level-3`:
        this.bindTemplateScreen3();
        break;
      default:
        throw new Error(`Invalid level type. Actual level ${this.actualLevel}`);
    }
  }

  onStart() {}
}
