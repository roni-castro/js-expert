const BaseRepository = require('../repository/baseRepository');

class CarService {
  constructor({carsFile}) {
    this.carRepository = new BaseRepository({file: carsFile});
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;
    return Math.floor(Math.random() * listLength);
  }

  chooseRandomCarId(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const randomCarId = carCategory.carIds[randomCarIndex];
    return randomCarId;
  }

  async getAvailableCar(carCategory) {
    const cardId = this.chooseRandomCarId(carCategory);
    const randomCar = await this.carRepository.find({itemId: cardId});
    return randomCar[0];
  }
}

module.exports = CarService;
