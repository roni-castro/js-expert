'use strict';
const { describe, it } = require('mocha');
const { expect } = require('chai');
const { productValidator } = require('.');
const ProductDataBuilder = require('../test/model/productDataBuilder');

describe('Product Validator', () => {
  describe('Product ID Validation', () => {
    it('should return no errors for valid product ID', () => {
      const product = ProductDataBuilder.aProduct().withId('validId').build();
      const result = productValidator(product);
      expect(result.errors).to.be.empty;
    });

    it('should return error when product ID is less than 2 characters', () => {
      const product = ProductDataBuilder.aProduct().withId('1').build();
      const result = productValidator(product);
      expect(result.errors).to.include('id: invalid length. id with value [1] should be between 2 and 20 characters');
    });

    it('should return error when product ID is more than 20 characters', () => {
      const product = ProductDataBuilder.aProduct().withId('123456789012345678901').build();
      const result = productValidator(product);
      expect(result.errors).to.include('id: invalid length. id with value [123456789012345678901] should be between 2 and 20 characters');
    });
  });

  describe('Product Name Validation', () => {
    it('should return no errors for valid product name', () => {
      const product = ProductDataBuilder.aProduct().withName('ValidName').build();
      const result = productValidator(product);
      expect(result.errors).to.be.empty;
    });

    it('should return error when product name contains numbers', () => {
      const product = ProductDataBuilder.aProduct().withName('Product123').build();
      const result = productValidator(product);
      expect(result.errors).to.include('name: invalid type. name with value [Product123] should be only words');
    });
  });

  describe('Product Price Validation', () => {
    it('should return no errors for valid product price', () => {
      const product = ProductDataBuilder.aProduct().withPrice(100).build();
      const result = productValidator(product);
      expect(result.errors).to.be.empty;
    });

    it('should return error when product price is negative', () => {
      const product = ProductDataBuilder.aProduct().withPrice(-1).build();
      const result = productValidator(product);
      expect(result.errors).to.include('price: invalid type. price with value [-1] should be from zero to a thousand');
    });

    it('should return error when product price is more than a thousand', () => {
      const product = ProductDataBuilder.aProduct().withPrice(1001).build();
      const result = productValidator(product);
      expect(result.errors).to.include('price: invalid type. price with value [1001] should be from zero to a thousand');
    });
  });

  describe('Product Category Validation', () => {
    it('should return no errors for valid product category', () => {
      const product = ProductDataBuilder.aProduct().withCategory('electronic').build();
      const result = productValidator(product);
      expect(result.errors).to.be.empty;
    });

    it('should return error when product category is not electronic or organic', () => {
      const product = ProductDataBuilder.aProduct().withCategory('InvalidCategory').build();
      const result = productValidator(product);
      expect(result.errors).to.include('category: invalid type. category with value [InvalidCategory] should be electronic or organic');
    });
  });

  describe('Multiple Errors Validation', () => {
    it('should return multiple errors for a product with multiple invalid fields', () => {
      const product = ProductDataBuilder.aProduct()
        .withId('1')
        .withName('InvalidName123')
        .withPrice(-1)
        .withCategory('InvalidCategory')
        .build();
      const result = productValidator(product);
      expect(result.errors).to.have.lengthOf(4);
    });
  });
});
