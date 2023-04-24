const Customer = require('../src/entities/customer');

class CustomerTestBuilder {
  constructor() {
    this.customerData = {
      id: '71523f24-e1e7-45e3-b0a2-1dbce8565bee',
      name: 'Jerrold',
      age: 34
    };
  }

  static aCustomer() {
    return new CustomerTestBuilder();
  }

  withAge(age) {
    this.customerData.age = age;
    return this;
  }

  build() {
    return new Customer(this.customerData);
  }
}

module.exports = CustomerTestBuilder;
