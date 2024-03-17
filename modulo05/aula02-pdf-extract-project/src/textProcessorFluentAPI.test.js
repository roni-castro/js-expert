'use strict'
const {describe, it} = require('mocha');
const {expect} = require('chai');
const validFileMock = require('../mocks/valid.js');
const TextProcessorFluentAPI = require('./textProcessorFluentAPI');

describe('TextProcessorFluentAPI Suit tests', () => {
  it('#build', () => {
    const content = validFileMock;
    const result = new TextProcessorFluentAPI(content).build();
    expect(result).to.be.deep.equal(content);
  });

  it('#extractPeopleData', () => {
    const content = validFileMock;
    const result = new TextProcessorFluentAPI(content)
      .extractPeopleData()
      .build();
    expect(result).to.be.deep.equal([
      [
        'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. '
      ].join('\n'),
      [
        'Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ',
        'domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. '
      ].join('\n')
    ]);
  });
});
