const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

chai.should();

describe('truth', () => {
  it('should pass', () => {
    true.should.be.true;
  });
});
