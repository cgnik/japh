const numbers = vals => Array.isArray(vals) ? vals.filter(n => !isNaN(parseFloat(n))).map(Number) : [];
const add = nums => numbers(nums).reduce((accum, val) => accum + val, 0);
const zerofill = arr => Array.isArray(arr) && arr.length > 0 ? arr : [0];
const subtract = nums => zerofill(numbers(nums)).reduce((accum, val) => accum - val);

module.exports = {
   add: add,
   subtract: subtract,
   numbers: numbers
};
