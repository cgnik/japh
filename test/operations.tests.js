const ops = require('../server/operations');

describe('operations', () => {
   describe('#numbers', () => {
      it('should return empty array for null or odd input', () => {
         ops.numbers(new Object()).should.deep.equal([]);
         ops.numbers().should.deep.equal([]);
         ops.numbers(null).should.deep.equal([]);
         ops.numbers("bobby").should.deep.equal([]);
      });
      it('should give back all numbers in an array', () => {
         ops.numbers([1, 2]).should.deep.equal([1, 2]);
      });
      it('should filter out non-numerics', () => {
         ops.numbers([1, 'a']).should.deep.equal([1]);
         ops.numbers([1, 0xab]).should.deep.equal([1, 0xab]);
         ops.numbers([1, 'ab']).should.deep.equal([1]);
         ops.numbers([1, new Object()]).should.deep.equal([1]);
      });
   });
   describe('#add', () => {
      it('should sum the values', () => {
         ops.add([1, 2]).should.equal(3);
         ops.add([1.004, 2]).should.equal(3.004);
         ops.add([47.0, 1.004, 2]).should.equal(50.004);
         ops.add([]).should.equal(0);
         ops.add([0, 0]).should.equal(0);
      });
      it('should tolerate non-numeric values', () => {
         ops.add(['aba', 1]).should.equal(1);
         ops.add("jimmy").should.equal(0);
         ops.add().should.equal(0);
         ops.add(null).should.equal(0);
      });
   });
   describe('#subtract', () => {
      it('should tolerate non-numeric values', () => {
         ops.subtract({}).should.equal(0);
         ops.subtract().should.equal(0);
         ops.subtract(null).should.equal(0);
         ops.subtract("bobby").should.equal(0);
      });
      it('should subtract the values', () => {
         ops.subtract([1, 2]).should.equal(-1);
         ops.subtract([1.004, 2]).should.equal(-0.996);
         ops.subtract([47.0, 1.004, 2]).should.equal(43.996);
         ops.subtract([]).should.equal(0);
         ops.subtract([0, 0]).should.equal(0);
      });
   });
});
