'use strict';
const {describe, it, before, beforeEach, afterEach} = require('mocha');
const {join} = require('path');
const {expect} = require('chai');
const sinon = require('sinon');
const CarService = require('./carService');
const Transaction = require('../../src/entities/transaction');

const carsFile = join(__dirname, '../../databases', 'cars.json');
const mocks = {
  validCar: require('../../mocks/validCar.json'),
  validCarCategory: require('../../mocks/validCarCategory.json'),
  validCustomer: require('../../mocks/validCustomer.json')
};

describe('CarService Test Suit', () => {
  let carService;
  let sandbox;
  before(() => {
    carService = new CarService({carsFile});
  });
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should choose randomly a car from the carIds', async () => {
    const items = ['1', '2', '3'];
    const result = await carService.getRandomPositionFromArray(items);
    expect(result).to.greaterThanOrEqual(0).to.lessThan(items.length);
  });

  it('should choose randomly a car from the category chosen', () => {
    const carCategory = mocks.validCarCategory;
    const carIdIndex = 0;

    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIdIndex);

    const result = carService.chooseRandomCarId(carCategory);
    const expected = mocks.validCarCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  describe('when I check if there is a car available', () => {
    it('should choose randomly a car from the category chosen', async () => {
      const car = mocks.validCar;
      const carCategory = Object.create(mocks.validCarCategory);
      carCategory.carIds = [car.id];

      sandbox
        .stub(carService.carRepository, carService.carRepository.find.name)
        .resolves(car);

      const result = await carService.getAvailableCar(carCategory);
      const expected = car;

      expect(carService.carRepository.find.calledOnce).to.be.ok;
      expect(result).to.be.deep.equal(expected);
    });
  });

  describe('given a carCategory, customer and numberOfDays', () => {
    it('should calculate final amount', async () => {
      const car = mocks.validCar;
      const customer = {...mocks.validCustomer, age: 50};
      const carCategory = {
        ...mocks.validCarCategory,
        carIds: [car.id],
        pricePerDay: 37.6
      };
      const numberOfRentingDays = 5;
      sandbox
        .stub(carService, 'taxesBasedOnAge')
        .returns([{from: 31, to: 100, then: 1.3}]);

      const result = carService.calculateRentingPrice({
        age: customer.age,
        pricePerDay: carCategory.pricePerDay,
        numberOfDays: numberOfRentingDays
      });
      const expected = 244.4;
      expect(result).to.be.equal(expected);
    });

    it('should return a transaction receipt', async () => {
      const car = mocks.validCar;
      const customer = {...mocks.validCustomer, age: 20};
      const carCategory = {
        ...mocks.validCarCategory,
        carIds: [car.id],
        pricePerDay: 37.6
      };
      const numberOfRentingDays = 5;
      const dueDate = '11 de novembro de 2020';

      const now = new Date(2020, 10, 6);
      sandbox.useFakeTimers(now);
      sandbox
        .stub(carService.carRepository, carService.carRepository.find.name)
        .resolves(car);

      const result = await carService.rent({
        customer,
        carCategory,
        numberOfDays: numberOfRentingDays
      });

      // age: 20, tax: 1.1, categoryPrice: 37.6
      // 37.6 * 1.1 = 41.36 * 5 days = 206.8
      const expectedAmount = carService.currencyFormat.format(206.8);
      const expected = new Transaction(customer, car, expectedAmount, dueDate);
      expect(result).to.be.deep.equal(expected);
    });
  });
});
