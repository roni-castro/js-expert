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
  })

  it('should format the person data correctly', () => {
    const result = new Person({
      id: 1,
      vehicles: ['Motocicleta', 'Carro', 'Caminhão'],
      kmTraveled: 1000,
      from: '2009-01-01',
      to: '2009-11-26'
    }).formatted('pt-BR');

    const expected = {
      id: 1,
      vehicles: 'Motocicleta, Carro e Caminhão',
      kmTraveled: '1.000 km',
      from: '01 de janeiro de 2009',
      to: '26 de novembro de 2009'
    };
    expect(result).to.be.deep.equal(expected);
  })
})