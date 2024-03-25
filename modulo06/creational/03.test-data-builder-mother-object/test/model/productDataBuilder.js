'use strict'
const Product = require('../../src/entities/product');

class ProductDataBuilder {
  constructor() {
    this.productData = {
      id: '0000001',
      name: 'computer',
      price: 1000,
      category: 'electronic'
    }
  }

  static aProduct() {
    return new ProductDataBuilder()
  }

  withId(id) {
    this.productData.id = id
    return this
  }

  withName(name) {
    this.productData.name = name
    return this
  }

  withPrice(price) {
    this.productData.price = price
    return this
  }

  withCategory(category) {
    this.productData.category = category
    return this
  }

  withInvalidId() {
    this.productData.id = '0'
    return this
  }

  withInvalidName() {
    this.productData.name = '123name'
    return this
  }

  withInvalidPrice() {
    this.productData.price = 2000
    return this
  }

  withInvalidCategory() {
    this.productData.category = 'invalid-category'
    return this
  }

  build() {
    const product = new Product(this.productData);
    return product;
  }
}

module.exports = ProductDataBuilder;
