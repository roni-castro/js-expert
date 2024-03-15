'use strict';

const assert = require('assert');

// - apply
const obj = {
  add(value) {
    return this.arg1 + this.arg2 + value;
  },
  subtract(value) {
    return this.arg1 - this.arg2 - value;
  }
};

// A problem can happen with object .apply
Function.prototype.apply = () => {
  throw new TypeError('prototype.apply overridden');
};
assert.throws(() => obj.add.apply({arg1: 10, arg2: 20}, [30]), {
  name: 'TypeError',
  message: 'prototype.apply overridden'
});
assert.throws(() => Function.apply(obj.add, ({arg1: 10, arg2: 20}, [30])), {
  name: 'TypeError',
  message: 'prototype.apply overridden'
});


obj.subtract.apply = () => {
  throw new TypeError('function subtract.apply overridden');
}

assert.throws(() => obj.subtract.apply({arg1: 10, arg2: 20}, [30]), {
  name: 'TypeError',
  message: 'function subtract.apply overridden'
});

// Using reflect it is more secure, and this does not happen
assert.deepStrictEqual(Reflect.apply(obj.add, {arg1: 10, arg2: 20}, [30]), 60);

// - defineProperty
function MyDate() {}
Object.defineProperty(MyDate, 'withObject', {value: () => 'property object'});
assert.deepStrictEqual(MyDate.withObject(), 'property object')

Object.defineProperty(MyDate, 'withObject2', {get: () => 'property object'});
assert.deepStrictEqual(MyDate.withObject2, 'property object')


Reflect.defineProperty(MyDate, 'withReflectionFn', {
  value: () => 'property reflection'
});
assert.deepStrictEqual(MyDate.withReflectionFn(), 'property reflection');

Reflect.defineProperty(MyDate, 'withReflectionObj', {get: () => 'property reflection'})
assert.deepStrictEqual(MyDate.withReflectionObj, 'property reflection')

// - deleteProperty
const withDelete = {user: 'RoniCastro'};
delete withDelete.user; // non performative
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withDeleteReflection = {user: 'RoniCastro'};
Reflect.deleteProperty(withDeleteReflection, 'user');
assert.deepStrictEqual(withDeleteReflection.hasOwnProperty('user'), false);

// - get
assert.deepStrictEqual((1)['userName'], undefined);
// reflection throws error, instead of accepting it
assert.throws(() => Reflect.get(1, 'userName'), {
  name: 'TypeError',
  message: 'Reflect.get called on non-object'
})

// - has
assert.deepStrictEqual('key' in {key: '1'}, true);
assert.deepStrictEqual(Reflect.has({key: '1'}, 'key'), true);

// - ownKeys
const user = Symbol('user');
const myObj = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'RoniCastro'
}
assert.deepStrictEqual(
  [
    ...Object.getOwnPropertyNames(myObj),
    ...Object.getOwnPropertySymbols(myObj),
  ],
  ['id', Symbol.for('password'), user]
);
assert.deepStrictEqual(Reflect.ownKeys(myObj), [
  'id',
  Symbol.for('password'),
  user
]);
