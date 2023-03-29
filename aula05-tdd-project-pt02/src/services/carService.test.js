const {describe, it, before, beforeEach, afterEach} = require('mocha');
const {join} = require('path');
const {expect} = require('chai');
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
        .resolves([car]);

      const result = await carService.getAvailableCar(carCategory);
      const expected = car;

      expect(carService.carRepository.find.calledOnce).to.be.ok;
      expect(result).to.be.deep.equal(expected);
    });
  });
});
