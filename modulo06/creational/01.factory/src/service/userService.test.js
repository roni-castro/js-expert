'use strict'
const sinon = require('sinon');
const {describe, it} = require('mocha');
const {expect} = require('chai');

const UserService = require('./userService');
const UserRepository = require('../repository/userRepository');

describe('UserService', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('#find', () => {
    it('should call userRepository.find with query and return uppercase usernames', async () => {
      const userRepository = {
        find: sandbox.stub().resolves([
          {name: 'user1'},
          {name: 'user2'}
        ])
      }
      const userService = new UserService({userRepository})
      
      const query = {name: 'user1'}
      const result = await userService.find(query)

      expect(result).to.be.deep.equal([
        {name: 'USER1'},
        {name: 'USER2'}
      ])
      expect(userRepository.find.calledOnce).to.be.true
      expect(userRepository.find.calledWith(query)).to.be.true
    });
  });
});
