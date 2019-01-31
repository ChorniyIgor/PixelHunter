import parseTemplateFromHTML from "./units/parseTemplateFromHTML";

export default class AbstractViev {
  get template() {
    throw new Error(`You have to define template for view`);
  }

  render() {
    return parseTemplateFromHTML(this.template);
  }

  bind() {}

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}
