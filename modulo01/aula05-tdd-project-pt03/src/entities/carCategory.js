'use strict'
const Base = require('./base');

class CarCategory extends Base {
  constructor({ id, name, carIds, pricePerDay }) {
    super({ id, name });
    this.carIds = carIds;
    this.pricePerDay = pricePerDay;
  }
}

module.exports = CarCategory;