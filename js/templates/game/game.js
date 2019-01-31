import GameView from "./game-view";
import showFooter from "../footer/footer";
import RenderScreen from "../../units/RenderScreen";
import {initialState} from "../../data/data";
import {levels} from "../../data/data";
import {actualState} from "../../data/data";
import Header from "../header/header";
import App from "../../app";
import UserResult from "../../data/userResult";
import Timer from "../../units/timer";
import {renderImages} from "../../units/resize";

class Game {
  constructor() {
    this.levelsTime = [];
  }
  get renderView() {
    const game = new GameView(actualState);
    game.onStart = () => {
      this.saveGameResult();
      this._putAnswerRezult();
      this.renderNextView();
    };
    return game;
  }

  _putAnswerRezult() {
    UserResult._saveUserAnswer(`check`, this.checkAnswer());
  }

  _changeLiveStatus() {
    let lives = actualState.lives;

    if (--lives === 0) {
      App.showStats(true);
      Header.getEmptyHeader();
    }
    actualState.lives--;
  }

  checkAnswer() {
    const level = levels[actualState.level];
    const levelType = level.levelTipe;
    const userAnswer = UserResult.getresults[actualState.level];
    let answer = false;
    const checkLevelType1 = () => {
      const userAswer1 = userAnswer.ansanswer1;
      const userAswer2 = userAnswer.ansanswer2;
      const rightAswer1 = level.answers[0].type;
      const rightAswer2 = level.answers[1].type;

      if (userAswer1 !== rightAswer1 || userAswer2 !== rightAswer2) {
        this._changeLiveStatus();
        answer = false;
      } else {
        answer = true;
      }
      return answer;
    };

    const checkLevelType2 = () => {
      const userAswer1 = userAnswer.ansanswer1;
      const rightAswer1 = level.answers[0].type;

      if (userAswer1 !== rightAswer1) {
        this._changeLiveStatus();
        answer = false;
      } else {
        answer = true;
      }
      return answer;
    };

    const checkLevelType3 = () => {
      const userAswer1 = userAnswer.ansanswer1;
      let rightAswer1 = ``;
      const answers = [level.answers[0].type, level.answers[1].type, level.answers[2].type];
      if (answers[0] !== answers[1] && answers[0] !== answers[2]) {
        rightAswer1 = `photo-1`;
      } else if (answers[1] !== answers[0] && answers[1] !== answers[2]) {
        rightAswer1 = `photo-2`;
      } else if (answers[2] !== answers[0] && answers[2] !== answers[1]) {
        rightAswer1 = `photo-3`;
      }

      if (userAswer1 !== rightAswer1) {
        this._changeLiveStatus();
        answer = false;
      } else {
        answer = true;
      }
      return answer;
    };

    switch (levelType) {
      case `level-1`:
        return checkLevelType1();
      case `level-2`:
        return checkLevelType2();
      case `level-3`:
        return checkLevelType3();
      default:
        throw new Error(`Invalid level type. Actual level ${this.actualLevel}`);
    }
  }

  saveGameResult() {
    const bufer = Object.assign({}, UserResult.getresults[actualState.level]);
    Object.assign(bufer, {time: Header.levelTime});
    UserResult.getresults[actualState.level] = bufer;
  }

  getGameHeader() {
    Header.updateHeader();
    Timer.timerStart();
    Timer.whenTimerUpdate = () => {
      Header.updateHeader();
    };
  }

  win() {
    App.showStats();
  }

  getGameScreen(game) {
    const answers = levels[actualState.level].answers;
    const options = game.element.querySelectorAll(`.game__option`);
    return renderImages(answers, options).then((images) => {
      images.forEach((item, i) => {
        options[i].prepend(item);
      });
      RenderScreen.addMain(game);
    });
  }

  renderNextView() {
    Timer.timerStop();
    if (actualState.lives > 0) {
      App.showPreloader();
      actualState.level++;
      if (actualState.level < levels.length) {
        this.getGameScreen(this.renderView).then(() => {
          App.hidePreloader();
          this.getGameHeader();
        });
      } else {
        App.hidePreloader();
        this.win();
      }
    }
  }

  updateGame() {
    App.showPreloader();
    this.getGameScreen(this.renderView).then(() => {
      App.hidePreloader();
      this.getGameHeader();
    });
  }

  startNewGame() {
    this.levelsTime = [];
    UserResult.cleanResults();
    Object.assign(actualState, initialState);
  }

  init() {
    this.startNewGame();
    this.updateGame();
    RenderScreen.addFooter(showFooter);
  }
}

export default Game;
