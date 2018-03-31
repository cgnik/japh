const ops = require('../server/operations');

describe('operations', () => {
   describe('#sigdigs', () => {
      it('returns the length of the shortest number minus decimal point', () => {
         ops.sigdigs([1, 33, 2341.1231]).should.equal(1);
         ops.sigdigs([2341.1231, 33, 1]).should.equal(1);
         ops.sigdigs([2341.1231, 1241.00009]).should.equal(8);
         ops.sigdigs([2341.1231, 1241.00009, 4432123]).should.equal(7);
      });
   });
   describe('#round', () => {
      it('should return 0 for empty args', () => {
         ops.round().should.equal(0);
         ops.round(null).should.equal(0);
         ops.round(null, null).should.equal(0);
      });
      it('should round decimals to the specified number of places', () => {
         ops.round(2.334, 2).should.equal(2.33);
         ops.round(.33423, 2).should.equal(0.33);
         ops.round(99.3390, 2).should.equal(99.34);
      });
   });
   describe('#numeric', () => {
      it('should return true for all kinds of numerics', () => {
         ops.numeric(1).should.equal(true);
         ops.numeric(1.0).should.equal(true);
         ops.numeric(0.1).should.equal(true);
         ops.numeric(.1).should.equal(true);
         ops.numeric(-1).should.equal(true);
         ops.numeric(-1.04).should.equal(true);
         ops.numeric(0xaa).should.equal(true);
         ops.numeric(1e4).should.equal(true);
      });
      it('should return false for non-numerics', () => {
         ops.numeric('a').should.equal(false);
         ops.numeric({}).should.equal(false);
         ops.numeric().should.equal(false);
         ops.numeric(null).should.equal(false);
         ops.numeric({a: "b"}).should.equal(false);
      });
   });
   describe('#numberarray', () => {
      it('should return false for non-arrays', () => {
         ops.numberarray('a').should.equal(false);
      });
   });
   describe('#verify', () => {
      it('should throw if not an array of numerics', () => {
         expect(ops.verify.bind()).to.throw();
      });
   });
   describe('#numbers', () => {
      it('should throw for arrays with values which arent numeric-like', () => {
         expect(ops.numbers.bind([1, 'a'])).to.throw();
         expect(ops.numbers.bind([1, {}])).to.throw();
      });
      it('should throw for null or odd input', () => {
         expect(ops.numbers.bind(new Object())).to.throw();
         expect(ops.numbers.bind()).to.throw();
         expect(ops.numbers.bind(null)).to.throw();
         expect(ops.numbers.bind("bobby")).to.throw();
      });
      it('should give back all numbers in an array', () => {
         ops.numbers([1, 2]).should.deep.equal([1, 2]);
      });
   });
   describe('#calculate', () => {
      it('returns zero for an empty array of values', () => {
         ops.calculate().should.equal(0);
         ops.calculate(null).should.equal(0);
         ops.calculate([]).should.equal(0);
      });
      it('applies the function to each argument, accumulating the accumulation', () => {
         ops.calculate([1, 2], ((a, b) => a + b)).should.equal(3);
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
      it('should throw for non-numeric values', () => {
         expect(ops.add.bind(['aba', 1])).to.throw();
         expect(ops.add.bind("jimmy")).to.throw();
         expect(ops.add.bind()).to.throw();
         expect(ops.add.bind(null)).to.throw();
      });
   });
   describe('#subtract', () => {
      it('should subtract the values', () => {
         ops.subtract([1, 2]).should.equal(-1);
         ops.subtract([1.004, 2]).should.equal(-0.996);
         ops.subtract([47.0, 1.004, 2]).should.equal(43.996);
         ops.subtract([]).should.equal(0);
         ops.subtract([0, 0]).should.equal(0);
      });
      it('should throw for non-numeric values', () => {
         expect(ops.subtract.bind(['aba', 1])).to.throw();
         expect(ops.subtract.bind("jimmy")).to.throw();
         expect(ops.subtract.bind()).to.throw();
         expect(ops.subtract.bind(null)).to.throw();
      });
   });
   describe('#multiply', () => {
      it('should give a product of the values', () => {
         ops.multiply([1, 2]).should.equal(2);
         ops.multiply([1.004, 2]).should.equal(2.008);
         ops.multiply([47.0, 1.004, 2]).should.equal(94.376);
         ops.multiply([]).should.equal(0);
         ops.multiply([0, 0]).should.equal(0);
         ops.multiply([300, 0]).should.equal(0);
         ops.multiply([40, 300, 0]).should.equal(0);
      });
      it('should throw for non-numeric values', () => {
         expect(ops.multiply.bind(['aba', 1])).to.throw();
         expect(ops.multiply.bind("jimmy")).to.throw();
         expect(ops.multiply.bind()).to.throw();
         expect(ops.multiply.bind(null)).to.throw();
      });
   });
   describe('#divide', () => {
      it('should give a quotient of the values', () => {
         ops.divide([1, 2]).should.equal(0.5);
         ops.divide([1.004, 2]).should.equal(0.502);
         ops.divide([47.0, 1.004, 2]).should.equal(20);
         ops.divide([]).should.equal(0);
      });
      it('should throw on 0 in array', () => {
         expect(ops.divide.bind([0, 0])).to.throw();
         expect(ops.divide.bind([300, 0])).to.throw();
         expect(ops.divide.bind([40, 300, 0])).to.throw();
      });
      it('should throw for non-numeric values', () => {
         expect(ops.divide.bind(['aba', 1])).to.throw();
         expect(ops.divide.bind("jimmy")).to.throw();
         expect(ops.divide.bind()).to.throw();
         expect(ops.divide.bind(null)).to.throw();
      });
   });
});
