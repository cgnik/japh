

const add = nums => (nums || []).reduce((accum, val) => accum + val, 0);
const subtract = nums => (nums || []).reduce((accum, val) => accum - val, 0);

module.exports = {
   add: add,
   subtract: subtract
};
