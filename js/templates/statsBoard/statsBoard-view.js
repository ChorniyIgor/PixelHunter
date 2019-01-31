import AbstractViev from "../../viewModel";

export default class statisticView extends AbstractViev {
  constructor(data) {
    super();
    this.data = data;
  }

  get templeteHeader() {
    return `
    <div class="result">
    <h1>Наши победители!</h1>
    <table class="result__table">
      <tr>
        <td colspan="2">Name</td>
        <td colspan="2">Time</td>
        <td colspan="2">Points</td>
        <td>Date</td>
    </tr>
    `.trim();
  }

  _formatDate(date) {
    let dd = date.getDate();
    if (dd < 10) {
      dd = `0` + dd;
    }

    let mm = date.getMonth() + 1;
    if (mm < 10) {
      mm = `0` + mm;
    }

    let yy = date.getFullYear() % 100;
    if (yy < 10) {
      yy = `0` + yy;
    }

    return dd + `.` + mm + `.` + yy;
  }

  rowTemplate(data) {
    const dates = new Date(data.date);

    return ` 
      <tr>
        <td colspan="2">${data.userName}</td>
        <td colspan="2">${data.totalTime}</td>
        <td colspan="2">${data.totalPoints}</td>
        <td>${this._formatDate(dates)}</td>
      </tr>`.trim();
  }

  get templeteFooter() {
    return `
    </table>
    </div>
    `.trim();
  }

  get template() {
    let template = ``;
    template += this.templeteHeader;
    this.data.forEach((el) => {
      template += this.rowTemplate(el);
    });
    template += this.templeteFooter;
    return template;
  }

  bind() {}
  onStart() {}

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}
