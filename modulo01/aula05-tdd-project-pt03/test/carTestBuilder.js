const Car = require('../src/entities/car');

class CarTestBuilder {
  constructor() {
    this.carData = {id: 'f6e623ba-4e40-44e7-afb1-fcce8954e4ab', name: 'Focus'};
  }

  static aCar() {
    return new CarTestBuilder();
  }

  withId(id) {
    this.carData.id = id;
    return this;
  }

  withName(name) {
    this.carData.name = name;
    return this;
  }

  build() {
    return new Car(this.carData);
  }
}

module.exports = CarTestBuilder;
