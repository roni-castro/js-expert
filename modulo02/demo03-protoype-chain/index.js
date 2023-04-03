const {deepStrictEqual} = require('assert');

const obj = {};
const arr = [];
const fn = () => {};

// __proto__ is the reference of the object that holds it's properties
deepStrictEqual(new Object().__proto__, {}.__proto__);
deepStrictEqual(obj.__proto__, Object.prototype);

deepStrictEqual(new Array().__proto__, Array.prototype);
deepStrictEqual(arr.__proto__, Array.prototype);

deepStrictEqual(new Function().__proto__, Function.prototype);
deepStrictEqual(fn.__proto__, Function.prototype);

// The Object.prototype.__proto__ is null
deepStrictEqual(Object.prototype.__proto__, null);
deepStrictEqual(obj.__proto__.__proto__, null);

function Employee() {}
Employee.prototype.salary = () => 'salary**';
deepStrictEqual(Employee.prototype.salary(), 'salary**');

function Supervisor() {}
// inherits the Employee instance
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => 'profitShare**';
deepStrictEqual(
  Supervisor.prototype.salary(),
  'salary**',
  'Supervisor inherits salary'
);
deepStrictEqual(
  Supervisor.prototype.profitShare(),
  'profitShare**',
  'Supervisor has own methods'
);

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**';
deepStrictEqual(Manager.prototype.monthlyBonuses(), 'monthlyBonuses**');
// If 'new' is not used, the first __proto__ will be always an instance of
// Function.
deepStrictEqual(Manager.__proto__, Function.prototype);
// So this will fails
// deepStrictEqual(Manager.salary(), 'salary**');
// To access without 'new' it would need this
deepStrictEqual(Manager.prototype.__proto__.__proto__.salary(), 'salary**');
deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);
deepStrictEqual(Manager.prototype.__proto__.__proto__, Employee.prototype);
// When we call 'new' the __proto__ receives the prototype,
// so its not pointing to Function in this level
deepStrictEqual(new Manager().__proto__, Manager.prototype);
deepStrictEqual(new Manager().salary(), 'salary**');
deepStrictEqual(Manager.__proto__, Function.prototype);
deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__);

// In order to call salary and profitShare, JS navigates over __proto__ until it
// finds the functions, or fails
const manager = new Manager();
deepStrictEqual(manager.salary(), 'salary**');
deepStrictEqual(manager.profitShare(), 'profitShare**');
deepStrictEqual(manager.monthlyBonuses(), 'monthlyBonuses**');
deepStrictEqual(manager.__proto__, Manager.prototype);
deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype);
deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);
deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);

// Class
class T1 {
  ping() {
    return 'ping';
  }
}
class T2 extends T1 {
  pong() {
    return 'pong';
  }
}
class T3 extends T2 {
  shoot() {
    return 'shoot';
  }
}

const t3 = new T3();
deepStrictEqual(t3.ping(), 'ping');
deepStrictEqual(t3.pong(), 'pong');
deepStrictEqual(t3.shoot(), 'shoot');
deepStrictEqual(t3.__proto__, T3.prototype);
deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype);
deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null);
