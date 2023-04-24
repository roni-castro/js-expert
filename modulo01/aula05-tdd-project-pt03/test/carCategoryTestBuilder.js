const CarCategory = require('../src/entities/carCategory');
const CarTestBuilder = require('./carTestBuilder');

class CarCategoryTestBuilder {
  constructor() {
    this.carCategoryData = {
      id: 'ec9edcc0-00c8-4c87-af2d-9d83af0534a5',
      name: 'Coupe',
      carIds: [
        CarTestBuilder.aCar().withId('1'),
        CarTestBuilder.aCar().withId('2')
      ],
      pricePerDay: 33.87
    };
  }

  static aCarCategory() {
    return new CarCategoryTestBuilder();
  }

  withCarIds(carIds) {
    this.carCategoryData.carIds = carIds;
    return this;
  }

  withPricePerDay(pricePerDay) {
    this.carCategoryData.pricePerDay = pricePerDay;
    return this;
  }

  build() {
    return new CarCategory(this.carCategoryData);
  }
}

module.exports = CarCategoryTestBuilder;
