const {readFile} = require('fs/promises');

class BaseRepository {
  constructor({file}) {
    this.file = file;
  }

  async find({itemId} = {}) {
    const items = JSON.parse(await readFile(this.file));

    if (!itemId) return items;
    return items.filter((item) => item.id === itemId);
  }
}

module.exports = BaseRepository;
