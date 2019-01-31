import AbstractViev from "../../viewModel";
import {actualState} from "../../data/data";
import UserResult from "../../data/userResult";

export default class statisticView extends AbstractViev {
  constructor(failFlag) {
    super();
    this.data = UserResult.getresults;
    this._fail = failFlag;
  }

  get template() {
    if (this._fail) {
      return `
      <div class="result">
      <h1>Поражение!</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">${UserResult.userName}</td>
          <td>
            <ul class="stats">
            ${UserResult.getIcon()}
            </ul>
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>
      
      </div>`.trim();
    } else {
      return ` <div class="result">
    <h1>Победа!</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">${UserResult.userName}</td>
        <td colspan="2">
          <ul class="stats">${UserResult.getIcon()}
          </ul>
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${UserResult.rightLevelCount * 100}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${UserResult.getFastCount}&nbsp;
        <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${UserResult.getFastCount * 50}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${
          actualState.lives
        }&nbsp;<span class="stats__result stats__result--heart"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${actualState.lives * 50}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${UserResult.getLowCount}&nbsp;
        <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">-${UserResult.getLowCount * 50}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${
          UserResult.totalUserPoints
        }</td>
      </tr>
      <tr>

      </tr>
    </table>
    <button class="result__save_btn">Добавить результат на доску</button>
    </div>`.trim();
    }
  }
  bind() {
    if (!this._fail) {
      const thisTemplate = this.element;
      const saveResultBtn = thisTemplate.querySelector(`.result__save_btn`);
      saveResultBtn.addEventListener(`click`, () => {
        this.onStart();
      });
    }
  }
  onStart() {}

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}
