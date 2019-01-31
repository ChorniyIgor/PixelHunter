export const initialState = Object.freeze({
  time: 0,
  lives: 3,
  level: 1,
  fail: false
});
export let actualState = Object.assign({}, initialState);

export let levels = [];
