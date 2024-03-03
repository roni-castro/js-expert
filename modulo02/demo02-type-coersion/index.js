'use strict';
const {deepStrictEqual} = require('assert');

deepStrictEqual(true + 2, 3);
deepStrictEqual(true - 2, -1);
deepStrictEqual('21' + true, '21true');
deepStrictEqual(9_999_999_999_999_999, 10_000_000_000_000_000);
deepStrictEqual(0.1 + 0.2, 0.30000000000000004);
deepStrictEqual(3 > 2, true);
deepStrictEqual(2 > 1, true);
deepStrictEqual(3 > 2 > 1, false);
deepStrictEqual(3 > 2 >= 1, true);
deepStrictEqual('21' - -1, 22);
deepStrictEqual('21' + +1, "211");
deepStrictEqual('1' == 1, true);
deepStrictEqual('1' === 1, false);
deepStrictEqual('B' + 'a' + +'a' + 'a', 'BaNaNa');

// Conversion
console.assert(String(123) === '123', 'explicit conversion to string');
console.assert(123 + '' === '123', 'implicit conversion to string');
console.assert(('hello' && 123) === 123, '&& returns the last truthy value');
console.assert(
  ('hello' && '' && 123) === '',
  '&& returns the last value value or the last falsy value'
);

// valueOf, toString, toPrimitive
const item = {
  name: 'RoniCastro',
  age: 32
};
deepStrictEqual(item + 0, '[object Object]0');

const item2 = {
  name: 'RoniCastro',
  age: 32,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
};
deepStrictEqual(item2 + 0, 'Name: RoniCastro, Age: 320');

const item3 = {
  name: 'RoniCastro',
  age: 32,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  valueOf() {
    return 7;
  }
};
deepStrictEqual(item3 + 0, 7);
deepStrictEqual(''.concat(item3), 'Name: RoniCastro, Age: 32');

const item4 = {
  name: 'RoniCastro',
  age: 32,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  valueOf() {
    return {hey: 'dude'};
  }
};
deepStrictEqual(
  String(item4),
  "Name: RoniCastro, Age: 32",
  'explict call toString'
);

const item5 = {
  name: 'RoniCastro',
  age: 32,
  toString() {
    return 123456;
  },
  valueOf() {
    return {hey: 'dude'};
  }
};
deepStrictEqual(
  Number(item5),
  123456,
  'calls valueOf first, get a NaN converting object to number, so call toString and get 123456'
);

const item6 = {
  name: 'RoniCastro',
  age: 32,
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  valueOf() {
    return 7;
  },
  [Symbol.toPrimitive](coercionType) {
    const types = {
      string: JSON.stringify(this),
      number: '0007'
    };

    return types[coercionType] || types.string;
  }
};
deepStrictEqual(
  String(item6),
  '{"name":"RoniCastro","age":32}',
  'coerse to string using toPrimitive'
);
deepStrictEqual(
  'Hi'.concat(item6),
  'Hi{"name":"RoniCastro","age":32}',
  'coerse to string using toPrimitive'
);
deepStrictEqual(
  item6 + 0,
  '{"name":"RoniCastro","age":32}0',
  'coerse to default, so is converted to string using toPrimitive'
);
deepStrictEqual(Number(item6), Number('0007'), 'coerse to number, using toPrimitive');
deepStrictEqual(
  !!item6,
  true,
  'does not call toString, valueOf or toPrimitive'
);
console.assert(item6 == String(item6), 'implicit + explicit coercion using ==');

const item7 = {...item6, name: 'Zezin', age: 20};
console.assert(item7.name == 'Zezin' && item7.age === 20);
console.assert(item7[Symbol.toPrimitive], 'has toPrimitive method');
console.log(item7);
