'use strict'
const {describe, it} = require('mocha');
const {expect} = require('chai');
const rewiremock = require('rewiremock/node');

const dbData = [{name: 'user1'}, {name: 'user2'}];
class MockDatabase {
  connect = () => this;
  find = async (_query) => dbData;
}

describe('UserFactory', () => {
  beforeEach(() => {
    rewiremock.enable();
  });
  afterEach(() => {
    rewiremock.disable();
  });

  it('should create an instance of UserService with a UserRepository and a dbConnection', async () => {
    rewiremock(() => require('../utils/database')).with(MockDatabase);
    const UserFactory = rewiremock.proxy(() => require('./userFactory'));
    const query = {name: 'user1'}
    const userService = await UserFactory.createInstance()
    const result = await userService.find(query)

    const expected = [
      {name: 'USER1'},
      {name: 'USER2'}
    ]

    expect(result).to.be.deep.equal(expected)
  });
});
