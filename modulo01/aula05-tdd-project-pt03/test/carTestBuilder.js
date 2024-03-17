'use strict'
const Car = require('../src/entities/car');

class CarTestBuilder {
  #car;
  constructor() {
    this.#car = {
      id: "fb19fea8-3483-493e-9934-2c12bf327abc",
      name: "Accord",
      available: true
    };
  }

  static aCar() {
    return new CarTestBuilder();
  }

  withId(id) {
    this.#car.id = id;
    return this;
  }

  build() {
    return new Car(this.#car);
  }

}

module.exports = CarTestBuilder;
