const Base = require('./base');

class Car extends Base {
    constructor({ id, name, available }) {
        super({ id, name });
        this.available = available;
    }
}

module.exports = Car;