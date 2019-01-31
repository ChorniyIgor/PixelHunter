import AbstractViev from "../../viewModel";

export default class RulesView extends AbstractViev {
  get template() {
    return `
        <div class="rules">
        <h1 class="rules__title">Правила</h1>
        <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
          src="img/photo_icon.png" width="16" height="16"> или рисунок <img
          src="img/paint_icon.png" width="16" height="16" alt="">.<br>
          Фотографиями или рисунками могут быть оба изображения.<br>
          На каждую попытку отводится 30 секунд.<br>
          Ошибиться можно не более 3 раз.<br>
          <br>
          Готовы?
        </p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
        </div>
    `.trim();
  }

  bind() {
    const thisTemplate = this.element;
    const nameImput = thisTemplate.querySelector(`.rules__input`);
    const nextBtn = thisTemplate.querySelector(`.rules__button`);

    nameImput.addEventListener(`keyup`, () => {
      if (nameImput.value) {
        nextBtn.disabled = false;
      } else {
        nextBtn.disabled = true;
      }
    });

    const form = thisTemplate.querySelector(`.rules__form`);
    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      if (!nextBtn.disabled) {
        this.onStart(nameImput.value);
      }
    });
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
