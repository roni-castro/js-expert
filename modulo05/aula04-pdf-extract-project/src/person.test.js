'use strict'
const {describe, it} = require('mocha');
const {expect} = require('chai');
const Person = require('./person');

describe('Person Suit test', () => {
  it('should generate a person instance from properties list', () => {
    const content = [
      'Xuxa da Silva',
      'brasileira',
      'casada',
      'CPF 235.743.420-12',
      'residente e domiciliada a Rua dos bobos',
      'zero',
      'bairro Consolação',
      'São Paulo.'
    ];

    const result = new Person(content);
    const expected = {
      name: 'Xuxa da Silva',
      nationality: 'Brasileira',
      maritalStatus: 'Casada',
      cpf: '23574342012',
      address: 'Rua dos bobos',
      number: 'zero',
      neighborhood: 'Consolação',
      state: 'São Paulo'
    };
    expect(result).to.be.deep.equal(expected);
  });
});
