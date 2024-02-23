'use strict';
const assert = require('assert');
const { createSandbox } = require('sinon');
const Service = require('./service');

const planetsMocks = {
  tatooine: require('../mocks/tatooine.json'),
  alderaan: require('../mocks/alderaan.json')
};
const BASE_PLANETS_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_PLANETS_URL_2 = 'https://swapi.dev/api/planets/2/';

(async () => {
  const service = new Service();
  const sandbox = createSandbox();
  const stub = sandbox.stub(service, service.makeRequest.name);
  stub
    .withArgs(BASE_PLANETS_URL_1)
    .resolves(planetsMocks.tatooine);
  stub.withArgs(BASE_PLANETS_URL_2)
    .resolves(planetsMocks.alderaan);

  {
    const result = await service.getPlanets(BASE_PLANETS_URL_1);
    const expectedResult = {
      name: 'Tatooine',
      surfaceWater: '1',
      appearedIn: 5
    };
    assert.deepStrictEqual(result, expectedResult);
  }

  {
    const result = await service.getPlanets(BASE_PLANETS_URL_2);
    const expectedResult = {
      name: 'Alderaan',
      surfaceWater: '40',
      appearedIn: 2
    };
    assert.deepStrictEqual(result, expectedResult);
  }
})();
