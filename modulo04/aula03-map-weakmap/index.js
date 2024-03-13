'use strict';
const assert = require('assert');

const map = new Map();

// accepts multiple types as key, different from Objects which accepts only string or Symbol
// (other values are coarsed to string)
const object = {};
const array = [];
const symbol = Symbol('symbol');
const func = () => {};
map.set(1, 'one')
   .set('Roni', 'text')
   .set(true, true)
   .set({}, {})
   .set(object, object)
   .set([], [])
   .set(array, array)
   .set(Symbol('symbol'), Symbol('symbol'))
   .set(symbol, symbol)
   .set(() => {}, () => {})
   .set(func, func);

assert.deepStrictEqual(map.get(1), 'one');
assert.deepStrictEqual(map.get('Roni'), 'text');
assert.deepStrictEqual(map.get(true), true);
assert.deepStrictEqual(map.get(object), object);
assert.deepStrictEqual(map.get(array), array);
assert.deepStrictEqual(map.get(symbol), symbol);
assert.deepStrictEqual(map.get(func), func);
assert.deepStrictEqual(map.get({}), undefined);
assert.deepStrictEqual(map.get([]), undefined);
assert.deepStrictEqual(map.get(Symbol('symbol')), undefined);
assert.deepStrictEqual(map.get(() => {}), undefined);

const mapWithConstructor = new Map([
  [1, 'one'],
  ['Roni', 'text'],
  [true, true],
  [object, object],
  [array, array],
  [symbol, symbol]
])

assert.deepStrictEqual(mapWithConstructor.get(1), 'one')
assert.deepStrictEqual(mapWithConstructor.get('Roni'), 'text')
assert.deepStrictEqual(mapWithConstructor.get(true), true)
assert.deepStrictEqual(mapWithConstructor.get(object), object)
assert.deepStrictEqual(mapWithConstructor.get(array), array)
assert.deepStrictEqual(mapWithConstructor.get(symbol), symbol)

// Utilities
// - size
assert.deepStrictEqual(map.size, 11)
// - has
assert.deepStrictEqual(map.has(1), true)
// - keys
assert.deepStrictEqual(JSON.stringify([...map.keys()]), JSON.stringify([
  1, 
  'Roni', 
  true, 
  {}, 
  object, 
  [], 
  array, 
  Symbol('symbol'), 
  symbol, 
  () => {}, 
  func, 
]))
// - values
assert.deepStrictEqual(JSON.stringify([...map.values()]), 
JSON.stringify([
  'one',
  'text',
  true,
  {},
  object,
  [],
  array,
  Symbol('symbol'),
  symbol,
  () => {},
  func
]))
// - delete
assert.deepStrictEqual(map.delete(1), true)
assert.deepStrictEqual(map.delete('invalidKey'), false)
// - iterable
assert.deepStrictEqual(
  JSON.stringify([...map]),
  JSON.stringify([
    ['Roni', 'text'],
    [true, true],
    [{}, {}],
    [object, object],
    [[], []],
    [array, array],
    [Symbol('symbol'), Symbol('symbol')],
    [symbol, symbol],
    [() => {}, () => {}],
    [func, func]
  ])
)
// for(const [key, value] of map) {
//   console.log(key, value)
// }
// - Help when colliding keys, like toString which does not override the object toString
const user = {
  name: 'Roni',
  toString: 'break this'
};

map.set(user);
assert.ok(map.has(user));
assert.deepStrictEqual(map.get(user), undefined)
assert.throws(
  () => map.get(user).toString,
  TypeError,
  'throws error because the value is undefined, instead of calling user.toString'
)
// - clear
map.clear();
assert.deepStrictEqual(map.size, 0);

// In case of objects, the get needs the reference of the object
const onlyReferenceWorks = {id: 1};
const map2 = new Map();
map2.set(onlyReferenceWorks, {name: 'RoniCastro'});
assert.deepStrictEqual(map2.get({id: 1}), undefined);
assert.deepStrictEqual(map2.get(onlyReferenceWorks), {name: 'RoniCastro'});

// -WeakMap
const weakMap = new WeakMap();
const hero = {name: 'Flash'};

weakMap.set(hero).set({}, {})
weakMap.get(hero);
weakMap.delete(hero);
weakMap.has(hero);

// Feature--------------Map--------------WeakMap
// ---------------------------------------------
// Key type-------------Any--------------Object-only (reference)
// Key reference--------Strong-----------Weak
// Garbage collection*--No---------------Yes
// Iteration order------Insertion--------N/A
// Size property--------Yes--------------No
// Performance----------Slower-----------Faster

// Methods--------------Map--------------WeakMap
// ---------------------------------------------
// set(key, value)------Yes----------------Yes
// get(key)-------------Yes----------------Yes
// has(key)-------------Yes----------------Yes
// delete(key)----------Yes----------------Yes
// clear()--------------Yes----------------Yes
// entries()------------Yes----------------No
// forEach(callback)----Yes----------------No
// keys()---------------Yes----------------No
// values()-------------Yes----------------No
// [...iterable]--------Yes----------------No
// * `Map` stores strong references to its keys, which means that if a key is no longer used
// or referenced anywhere else in the code, it will still be retained in the Map and will not
// be automatically removed by the garbage collector.
// In the WeakMap, if a variable is garbage collected, the key will be removed from it
