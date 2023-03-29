const Base = require('./base');

class CarCategory extends Base {
  constructor({id, name, cardIds, pricePerDay}) {
    super({id, name});
    this.cardIds = cardIds;
    this.pricePerDay = pricePerDay;
  }
}

module.exports = CarCategory;
