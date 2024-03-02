'use strict';
const { readFile } = require('fs/promises');

class BaseRepository {
  constructor({ file }) {
    this.file = file;
  }

  async find({ itemId } = {}) {
    const bufferData = await readFile(this.file)
    const jsonData = JSON.parse(bufferData)
    return jsonData.find(item => item.id === itemId)
  }
}

module.exports = BaseRepository;
