const sinon = require('sinon');
const {describe, it} = require('mocha');
const {expect} = require('chai');

const UserRepository = require('./userRepository');

describe('UserRepository', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('#find', () => {
    it('should call dbConnection.find with query', async () => {
      const query = {name: 'John Doe'};
      const expectedResult = [{name: 'user1'}, {name: 'user2'}];
      // Create a stub for the dbConnection object
      const dbConnection = {
        find: sandbox.stub().resolves(expectedResult)
      };
      const userRepository = new UserRepository({dbConnection});

      const result = await userRepository.find(query);

      expect(result).to.equal(expectedResult);
      // Assert that dbConnection.find was called with the query
      expect(dbConnection.find.calledOnce).to.be.true;
      expect(dbConnection.find.calledWith(query)).to.be.true;
    });
  });
});
