'use strict';
const {describe, it, before, beforeEach, afterEach} = require('mocha');
const {join} = require('path');
const {expect} = require('chai');
const sinon = require('sinon');
const CarService = require('./carService');
const Transaction = require('../../src/entities/transaction');
const CarTestBuilder = require('../../test/carTestBuilder');
const CarCategoryTestBuilder = require('../../test/carCategoryTestBuilder');
const CustomerTestBuilder = require('../../test/customerTestBuilder');

const carsFile = join(__dirname, '../../databases', 'cars.json');

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
    const carCategory = CarCategoryTestBuilder.aCarCategory().build();
    const carIdIndex = 0;

    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIdIndex);

    const result = carService.chooseRandomCarId(carCategory);
    const expected = carCategory.carIds[carIdIndex];

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
    expect(result).to.be.equal(expected);
  });

  describe('when I check if there is a car available', () => {
    it('should choose randomly a car from the category chosen', async () => {
      const car = CarTestBuilder.aCar().build();
      const carCategory = CarCategoryTestBuilder.aCarCategory().build();
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
      const car = CarTestBuilder.aCar().build();
      const customer = CustomerTestBuilder.aCustomer().withAge(50).build();
      const carCategory = CarCategoryTestBuilder.aCarCategory()
        .withCarIds([car.id])
        .withPricePerDay(37.6)
        .build();
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
      const car = CarTestBuilder.aCar().build();
      const customer = CustomerTestBuilder.aCustomer().withAge(20).build();
      const carCategory = CarCategoryTestBuilder.aCarCategory()
        .withCarIds([car.id])
        .withPricePerDay(37.6)
        .build();
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
