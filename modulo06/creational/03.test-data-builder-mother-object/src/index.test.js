'use strict'
const {describe, it} = require('mocha');
const {expect} = require('chai');
const {productValidator} = require('.');
const ProductDataBuilder = require('../test/model/productDataBuilder');
const ProductMotherObject = require('../test/model/productMotherObject');

describe('productValidator', () => {
  it('should not return errors with valid product', () => {
    const product = ProductMotherObject.valid();
    const result = productValidator(product);
    const expected = {
      valid: true,
      errors: []
    };

    expect(result).to.be.deep.equal(expected);
  });

  it('should return errors when a product has an invalid id', () => {
    const product = ProductMotherObject.withInvalidId();
    const result = productValidator(product);
    const expected = {
      valid: false,
      errors: [
        'id: invalid length. id with value [1] should be between 2 and 20 characters'
      ]
    };

    expect(result).to.be.deep.equal(expected);
  });

  it('should return errors when a product has an invalid name', () => {
    const product = ProductMotherObject.withInvalidName();
    const result = productValidator(product);
    const expected = {
      valid: false,
      errors: [
        'name: invalid type. name with value [123name] should be only words'
      ]
    };

    expect(result).to.be.deep.equal(expected);
  });

  it('should return errors when a product has an invalid price', () => {
    const product = ProductMotherObject.withInvalidPrice();
    const result = productValidator(product);
    const expected = {
      valid: false,
      errors: [
        'price: invalid type. price with value [2000] should be from zero to a thousand'
      ]
    };

    expect(result).to.be.deep.equal(expected);
  });

  it('should return errors when a product has an invalid category', () => {
    const product = ProductMotherObject.withInvalidCategory();
    const result = productValidator(product);
    const expected = {
      valid: false,
      errors: [
        'category: invalid type. category with value [invalid-category] should be electronic or organic'
      ]
    };

    expect(result).to.be.deep.equal(expected);
  });

  it('should return multiple errors', () => {
    const product = ProductDataBuilder.aProduct()
      .withInvalidName()
      .withInvalidCategory()
      .build();
    const result = productValidator(product);
    const expected = {
      valid: false,
      errors: [
        'name: invalid type. name with value [123name] should be only words',
        'category: invalid type. category with value [invalid-category] should be electronic or organic'
      ]
    };

    expect(result).to.be.deep.equal(expected);
  });
});
