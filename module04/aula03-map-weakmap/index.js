'use strict';
const assert = require('assert');

const map = new Map();

// accepts multiple types as key, different from Objects which accepts only string or Symbol
// (other values are coarsed to string)
map
  .set(1, 'one')
  .set('1', 'one string')
  .set('Roni', {text: 'object'})
  .set(true, () => 'boolean');

const mapWithConstructor = new Map([
  [1, 'one'],
  ['1', 'one string'],
  ['Roni', {text: 'object'}],
  [true, () => 'boolean']
]);

assert.deepStrictEqual(map.get(1), 'one');
assert.deepStrictEqual(map.get('1'), 'one string');
assert.deepStrictEqual(map.get('Roni'), {text: 'object'});
assert.deepStrictEqual(map.get(true)(), 'boolean');

assert.deepStrictEqual(mapWithConstructor.get(1), 'one');
assert.deepStrictEqual(mapWithConstructor.get('1'), 'one string');
assert.deepStrictEqual(mapWithConstructor.get('Roni'), {text: 'object'});
assert.deepStrictEqual(mapWithConstructor.get(true)(), 'boolean');

// Utilities
// - size
assert.deepStrictEqual(map.size, 4);
// - has
assert.deepStrictEqual(map.has(1), true);
// - keys
assert.deepStrictEqual([...map.keys()], [1, '1', 'Roni', true]); // compatibility with Map
// - values
assert.deepStrictEqual(
  JSON.stringify([...map.values()]),
  JSON.stringify(['one', 'one string', {text: 'object'}, () => 'boolean'])
);
// - delete
assert.deepStrictEqual(map.delete(1), true);
assert.deepStrictEqual(map.delete('invalidKey'), false);
// - iterable
assert.deepStrictEqual(
  JSON.stringify([...map]),
  JSON.stringify([
    ['1', 'one string'],
    ['Roni', {text: 'object'}],
    [true, () => {}]
  ])
);
// for (const [value, key] of map) {
//   console.log({key, value});
// }
// - Help when colliding keys, like toString
const user = {
  name: 'Roni',
  toString: 'break this'
};
map.set(user);
assert.ok(map.has(user));
assert.throws(
  () => map.get(user).toString,
  TypeError,
  'throws error because the value is undefined, instead of calling user.toString'
);
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

weakMap.set(hero);
weakMap.get(hero);
weakMap.delete(hero);
weakMap.has(hero);

// Feature--------------Map--------------WeakMap
// ---------------------------------------------
// Key type-------------Any--------------Object-only
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
// * `Map` stores strong references to its keys, which means that if a key is no longer used
// or referenced anywhere else in the code, it will still be retained in the Map and will not
// be automatically removed by the garbage collector.
// In the WeakMap, if a variable is garbage collected, the key will be removed from it
