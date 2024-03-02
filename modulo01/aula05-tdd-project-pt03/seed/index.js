'use strict';
const { faker } = require('@faker-js/faker');
const { writeFile } = require('fs/promises');
const { join } = require('path');
const Car = require('../src/entities/car');
const CarCategory = require('../src/entities/carCategory');
const Customer = require('../src/entities/customer');

const seedsBaseFolder = join(__dirname, '../', 'databases');

const makeCustomer = () => {
  return new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    age: faker.datatype.number({ min: 18, max: 50 })
  });
};

const makeCar = ({ available } = { available: faker.datatype.boolean() }) => {
  return new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available,
  });
};

const makeCategory = ({ carIds } = { carIds: [] }) => {
  return new CarCategory({
    id: faker.datatype.uuid(),
    name: faker.vehicle.type(),
    pricePerDay: Number(faker.finance.amount(20, 100)),
    carIds
  });
};

const createSeeds = ({ totalItems } = { totalItems: 2 }) => {
  const customers = [];
  const cars = [];
  const carCategory = makeCategory();

  for (let i = 0; i < totalItems; i++) {
    const car = makeCar();
    cars.push(car);
    carCategory.carIds.push(car.id);
    const customer = makeCustomer();
    customers.push(customer);
  }
  return { cars, carCategory, customers };
};

const writeToJson = (filename, data) =>
  writeFile(join(seedsBaseFolder, filename), JSON.stringify(data, null, 2));

(() => {
  const { customers, cars, carCategory } = createSeeds();
  writeToJson('cars.json', cars);
  writeToJson('carCategories.json', [carCategory]);
  writeToJson('customers.json', customers);
})();
