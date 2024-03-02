const Customer = require('../src/entities/customer');

class CustomerTestBuilder {
  #customer;
  constructor() {
    this.#customer = {
      id: "b6aa160f-ee8f-497f-831a-4681165af1f9",
      name: "Dr. Clark Upton",
      age: 41
    };
  }

  static aCustomer() {
    return new CustomerTestBuilder();
  }

  withAge(age) {
    this.#customer.age = age;
    return this;
  }

  build() {
    return new Customer(this.#customer);
  }

}

module.exports = CustomerTestBuilder;
