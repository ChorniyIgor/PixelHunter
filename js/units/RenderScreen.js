export default class RenderScreen {
  constructor() {}

  static _cleanElement(element) {
    element.innerHTML = ``;
  }

  static cleanHeader() {
    const headerElement = document.querySelector(`.page-header`);
    RenderScreen._cleanElement(headerElement);
  }

  static addHeader(view) {
    const headerElement = document.querySelector(`.page-header`);
    RenderScreen.cleanHeader();
    headerElement.appendChild(view.element);
  }

  static addMain(view) {
    const mainElement = document.querySelector(`main.central`);
    RenderScreen._cleanElement(mainElement);
    mainElement.appendChild(view.element);
  }

  static addFooter(view) {
    const footerElement = document.querySelector(`.page-footer`);
    RenderScreen._cleanElement(footerElement);
    footerElement.appendChild(view.element);
  }
}
