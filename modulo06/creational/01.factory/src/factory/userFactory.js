'use strict'
const UserRepository = require('../repository/userRepository');
const UserService = require('../service/userService');
const Database = require('../utils/database');

class UserFactory {
  static async createInstance() {
    const database = new Database('mongo://localhost');
    const dbConnection = await database.connect();
    const userRepository = new UserRepository({dbConnection});
    const userService = new UserService({userRepository});

    return userService;
  }
}

module.exports = UserFactory;
