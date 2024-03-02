class Transaction {
  constructor({ customer, car, total, dueDate }) {
    this.customer = customer;
    this.car = car;
    this.total = total;
    this.dueDate = dueDate;
  }
}

module.exports = Transaction;
