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
      'bairro Alphaville',
      'São Paulo.'
    ];

    const result = new Person(content);
    const expected = {
      nome: 'Xuxa da Silva',
      nationality: 'Brasileira',
      maritalStatus: 'Casada',
      cpf: '23574342012',
      address: 'Rua dos bobos',
      number: 'zero',
      neighborhood: 'Alphaville',
      state: 'São Paulo'
    };
    expect(result).to.be.deep.equal(expected);
  });
});
