'use strict'
/*
ProductId: should be between 2 and 20 characters
Name: should be only words
Price: should be from zero to a thousand
Category: should be electronic or organic
*/

function productValidator(product) {
  const errors = [];

  if(product.id.length < 2 || product.id.length > 20) {
    errors.push(
      `id: invalid length. id with value [${product.id}] should be between 2 and 20 characters`
    )
  }

  if(/\W|\d/.test(product.name)) {
    errors.push(
      `name: invalid type. name with value [${product.name}] should be only words`
    )
  }

  if(product.price < 0 || product.price > 1000) {
    errors.push(
      `price: invalid type. price with value [${product.price}] should be from zero to a thousand`
    )
  }

  if(!['electronic', 'organic'].includes(product.category)) {
    errors.push(
      `category: invalid type. category with value [${product.category}] should be electronic or organic`
    )
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = {
  productValidator
};
