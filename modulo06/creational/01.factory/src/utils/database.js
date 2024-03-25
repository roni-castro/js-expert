'use strict'
class Database {
  #connectionString
  constructor(connectionString) {
    this.#connectionString = connectionString
  }

  async connect() {
    await this.#sleep(200)
    return this
  }

  async #sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  async find(_query) {
    await this.#sleep(1000)
    return [
      {name: 'Roni Castro'}
    ]
  }
}

module.exports = Database;
