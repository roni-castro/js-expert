'use strict';
const BaseRepository = require('../repository/baseRepository');

class CarService {
  constructor({ carsFile }) {
    this.carRepository = new BaseRepository({ file: carsFile });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length
    const randomIndex = Math.floor(Math.random() * (listLength));
    return randomIndex
  }

  chooseRandomCarId(carCategory) {
    const randomIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const randomCarId = carCategory.carIds[randomIndex];
    return randomCarId
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCarId(carCategory);
    const car = await this.carRepository.find({itemId: carId});
    return car
  }
}

module.exports = CarService;
