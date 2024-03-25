'use strict'
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
      const queryResult = [{name: 'user1'}]
      const dbConnection = {
        find: sandbox.stub().resolves(queryResult)
      }
      const query = {name: 'user1'}
      const userRepository = new UserRepository({dbConnection})
      const result = await userRepository.find(query)

      expect(dbConnection.find.calledWith(query)).to.be.true
      expect(dbConnection.find.calledOnce).to.be.true
      expect(result).to.be.deep.equal(queryResult)
    });
  });
});
