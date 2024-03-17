'use strict'
const CarCategory = require('../src/entities/carCategory');
const CarTestBuilder = require('./carTestBuilder');

class CarCategoryTestBuilder {
  #carCategory;
  constructor() {
    this.#carCategory = {
      id: "b7deee5c-2e7f-4c36-8124-00e8ab41584d",
      name: "Minivan",
      carIds: [
        CarTestBuilder.aCar().withId("1").build().id,
        CarTestBuilder.aCar().withId("2").build().id
      ],
      pricePerDay: 82.44
    };
  }

  static aCarCategory() {
    return new CarCategoryTestBuilder();
  }

  withCarIds(carIds) {
    this.#carCategory.carIds = carIds;
    return this;
  }

  withPricePerDay(pricePerDay) {
    this.#carCategory.pricePerDay = pricePerDay;
    return this;
  }

  build() {
    return new CarCategory(this.#carCategory);
  }
}

module.exports = CarCategoryTestBuilder;
