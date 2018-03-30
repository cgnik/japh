const ops = require('../server/operations');

describe('#numbers', () => {
   it('should give back all numbers in an array', () => {
      ops.numbers([1,2]).should.deep.equal([1,2]);
   });
   it('should filter out non-numerics', () => {
      ops.numbers([1, 'a']).should.deep.equal([1]);
   });
});
describe('#add', () => {
   it('should sum the values', () => {
      ops.add([1,2]).should.equal(3);
      ops.add([]).should.equal(0);
      ops.add([0, 0]).should.equal(0);
   });
   it('should tolerate non-numeric values', () => {
      ops.add(['aba', 1]).should.equal(1);
   })
});