'use strict';
const Tax = require('../entities/tax');
const Transaction = require('../entities/transaction');
const BaseRepository = require('../repository/baseRepository');

class CarService {
  constructor({carsFile}) {
    this.carRepository = new BaseRepository({file: carsFile});
    this.taxesBasedOnAge = Tax.taxesBasedOnAge;
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    });
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
    return randomCar;
  }

  calculateRentingPrice({age, pricePerDay, numberOfDays}) {
    const {taxRate} = this.taxesBasedOnAge.find(
      (item) => age >= item.from && age <= item.to
    );
    return pricePerDay * taxRate * numberOfDays;
  }

  async rent({customer, carCategory, numberOfDays}) {
    const car = await this.getAvailableCar(carCategory);
    const total = this.calculateRentingPrice({
      age: customer.age,
      pricePerDay: carCategory.pricePerDay,
      numberOfDays
    });
    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);
    const dueDateFormatted = today.toLocaleDateString('pt-br', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    const totalFormatted = this.currencyFormat.format(total);

    return new Transaction(customer, car, totalFormatted, dueDateFormatted);
  }
}

module.exports = CarService;
