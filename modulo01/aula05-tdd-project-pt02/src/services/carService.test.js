'use strict';
const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { join } = require('path');
const { expect } = require('chai');
const sinon = require('sinon');
const CarService = require('./carService');

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
    carService = new CarService({carsFile})
  });
  beforeEach(() => {
    sandbox = sinon.createSandbox()
  });
  afterEach(() => {
    sandbox.restore()
  });

  it('should choose randomly a car from the carIds', () => {
    const items = [1, 2, 3, 4, 5, 6]
    const result = carService.getRandomPositionFromArray(items)
    expect(result).to.greaterThanOrEqual(0).to.lessThan(items.length)
  });

  it('should choose randomly a car from the category chosen', () => {
    const carCategory = mocks.validCarCategory
    const carIdIndex = 0
    
    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIdIndex);
    
    const randomCarId = carService.chooseRandomCarId(carCategory)
    const expected = carCategory.carIds[carIdIndex]
      expect(randomCarId).to.be.equal(expected)
  });

  describe('when I check if there is a car available', () => {
    it('should choose randomly a car from the category chosen', async () => {
      const carCategory = Object.create(mocks.validCarCategory)
      const expectedCar = mocks.validCar
      const expectedCarIdIndex = 0
      carCategory.carIds[expectedCarIdIndex] = expectedCar.id
      
      sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(expectedCarIdIndex);

      sandbox
        .stub(carService.carRepository, carService.carRepository.find.name)
        .resolves(expectedCar)

      const result = await carService.getAvailableCar(carCategory)

      expect(result).to.be.deep.equal(expectedCar)
      expect(carService.carRepository.find.calledWithExactly({itemId: expectedCar.id})).to.be.true; 
    });
  });
});
