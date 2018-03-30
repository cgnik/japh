

const numbers = vals => Array.isArray(vals)? vals.filter(n => !isNaN(parseFloat(n))).map(Number) : [];
const add = nums => numbers(nums).reduce((accum, val) => accum + val, 0);
const subtract = nums => numbers(nums).reduce((accum, val) => accum - val, 0);

module.exports = {
   add: add,
   subtract: subtract,
   numbers: numbers
};
