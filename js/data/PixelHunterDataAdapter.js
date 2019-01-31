import {DefaultAdapter} from "../networkModel";

export default new class extends DefaultAdapter {
  constructor() {
    super();
    this.changeLevelType = {
      "level-1": `two-of-two`,
      "two-of-two": `level-1`,
      "level-2": `tinder-like`,
      "tinder-like": `level-2`,
      "level-3": `one-of-three`,
      "one-of-three": `level-3`
    };
  }

  preprocess(data) {
    const preprocessData = [
      {
        levelNumb: 0
      }
    ];
    data.forEach((el, i) => {
      preprocessData.push({
        levelTipe: this.changeLevelType[el.type],
        levelNumb: i + 1,
        question: el.question,
        answers: el.answers
      });
    });

    return preprocessData;
  }

  toServer(data) {
    return JSON.stringify(data);
  }
}();
