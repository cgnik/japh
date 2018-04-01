const numeric = n => !isNaN(parseFloat(n));
const numberarray = vals => Array.isArray(vals) && vals.every(numeric);
const verify = vals => numberarray(vals) ? vals : (() => {
   throw new Error()
})();

const numbers = vals => verify(vals).map(Number);
const calculate = (vals, f) => vals && vals.length > 0 ? vals.reduce(f) : 0;
const sigdigs = nums => numberarray(nums) ? Math.min(...nums.map(n => n.toString().replace('.', '').length)) : 0;
const round = (num, places) => numeric(num) ? Math.round(num * Math.pow(10, places)) / Math.pow(10, places) : 0;
const roundsig = (num, nums) => round(num, sigdigs(nums));

const add = nums => calculate(numbers(nums), (a, b) => a + b);
const subtract = nums => calculate(numbers(nums), (a, b) => a - b);
const multiply = nums => roundsig(calculate(numbers(nums), (a, b) => a * b), nums);
const divide = nums => roundsig(calculate(numbers(nums), (a, b) => a / b), nums);

module.exports = {
   add: add,
   subtract: subtract,
   multiply: multiply,
   divide: divide,
   calculate: calculate,
   numbers: numbers,
   verify: verify,
   numeric: numeric,
   numberarray: numberarray,
   round: round,
   sigdigs: sigdigs
};
