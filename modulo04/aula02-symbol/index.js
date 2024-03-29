'use strict';
const assert = require('assert');

// -- private keys
const uniqueKey = Symbol('userName');
const user = {};

user['userName'] = 'value for normal Objects';
user[uniqueKey] = 'value for Symbol';

assert.deepStrictEqual(user.userName, 'value for normal Objects');
assert.deepStrictEqual(
  user[uniqueKey],
  'value for Symbol',
  'Symbol reference is unique'
);
assert.deepStrictEqual(
  user[Symbol('userName')],
  undefined,
  'new Symbol with same key is always a new reference'
);

assert.deepStrictEqual(Object.getOwnPropertySymbols(user), [uniqueKey]);

// byPass Symbol
user[Symbol.for('userName')] = 'password'
assert.deepStrictEqual(user[Symbol.for('userName')], 'password');

// Symbol iterator
const objReverse = {
  [Symbol.iterator]: () => {
    const items = [1,2,3]
    return {
      next() {
        return {
          done: items.length === 0,
          value: items.shift()
        }
      }
    }
  }
}

assert.deepStrictEqual([...objReverse], [1,2,3]);

const objReverseNoDone = {
  *[Symbol.iterator]() {
    const items = [1,2,3]
    while(items.length > 0) {
      yield items.shift()
    }
  }
}

assert.deepStrictEqual([...objReverseNoDone], [1,2,3]);

// Symbol key
const kItems = Symbol('kItems');
class MyDate {
  constructor(...dates) {
    this[kItems] = dates.map((date) => new Date(...date));
  }

  get [Symbol.toStringTag]() {
    return 'MyDate';
  }

  [Symbol.toPrimitive](coercionType) {
    if(coercionType !== 'string') throw new TypeError();
  
    function formatDate(date) {
      return new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
      }).format(date)
    }

    function formaDates(dates) {
      const datesFormatted = dates.map((item) => formatDate(item))
      return new Intl.ListFormat('pt-BR', {
        style: 'long',
        type: 'conjunction'
      }).format(datesFormatted)
    }
    return formaDates(this[kItems])
  }

  *[Symbol.iterator]() {
    for(let item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    for(let item of this[kItems]) {
      const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
      await timeout(100)
      yield item.toISOString()
    }
  }
}
const myDate = new MyDate([2020, 3, 1], [2021, 2, 1], [2021, 1, 28]);
const expectedDates = [
  new Date(2020, 3, 1),
  new Date(2021, 2, 1),
  new Date(2021, 1, 28)
];

assert.deepStrictEqual(
  Object.prototype.toString.call(myDate),
  '[object MyDate]'
);
assert.deepStrictEqual(
  String(myDate),
  '01 de abril de 2020, 01 de março de 2021 e 28 de fevereiro de 2021',
  'explicit coercion should return the formatted date'
);
assert.throws(() => myDate + 1, TypeError, 'non string values throws an error');
assert.throws(
  () => myDate + true,
  TypeError,
  'non string values throws an error'
);

assert.deepStrictEqual(myDate[kItems], expectedDates);
assert.deepStrictEqual([...myDate], expectedDates);

(async function () {
  const dates = [];
  for await (let item of myDate) {
    dates.push(item);
  }
  assert.deepStrictEqual(dates, [
    '2020-04-01T03:00:00.000Z',
    '2021-03-01T03:00:00.000Z',
    '2021-02-28T03:00:00.000Z'
  ]);
})();
