import {describe, it} from 'mocha';
import {expect} from 'chai';
import Person from './person.js';

describe('Person Suit', () => {
  it('should create person instance from input string', () => {
    const input = '2 Barco,Moto,Bicicleta 100 2010-01-31 2015-12-31';
    const result = Person.generateInstanceFromString(input);
    const expected = new Person({
      id: 2,
      vehicles: ['Barco', 'Moto', 'Bicicleta'],
      kmTraveled: 100,
      from: '2010-01-31',
      to: '2015-12-31'
    });

    expect(result).to.be.deep.equal(expected);
  });
});
