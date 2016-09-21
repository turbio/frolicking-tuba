const chai = require('chai');

chai.should();

describe('truth', () => {
  it('should pass', () => {
    true.should.be.true;
  });
});
