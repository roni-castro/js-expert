'use strict';
const assert = require('assert');

const set = new Set();

const arr1 = ['0', '1', '2'];
const arr2 = ['2', '0', '3'];
const arr1arr2 = arr1.concat(arr2).sort();
assert.deepStrictEqual(arr1arr2, ['0', '0', '1', '2', '2', '3'])
arr1.forEach((v) => set.add(v));
arr2.forEach((v) => set.add(v));
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3'])

const setWithConstructor1 = new Set(arr1)
assert.deepStrictEqual(Array.from(setWithConstructor1), ['0', '1', '2'])
const setWithConstructor2 = new Set([...arr1, ...arr2])
assert.deepStrictEqual(Array.from(setWithConstructor2), ['0', '1', '2', '3'])

// - keys
assert.deepStrictEqual([...setWithConstructor2.keys()], ['0', '1', '2', '3']);  // compatibility with Map
// - values
assert.deepStrictEqual([...setWithConstructor2.values()], ['0', '1', '2', '3']);  // compatibility with Map
// - entries
assert.deepStrictEqual([...setWithConstructor2.entries()], [
  ['0', '0'],
  ['1', '1'],
  ['2', '2'],
  ['3', '3']
])
// - has
assert.deepStrictEqual(setWithConstructor2.has('0'), true);
assert.deepStrictEqual(setWithConstructor2.has('notAKey'), false);
// - delete
assert.deepStrictEqual(setWithConstructor2.delete('0'), true);
assert.deepStrictEqual(setWithConstructor2.delete('notAKey'), false);

const ids01 = new Set(['0', '1', '2']);
const ids02 = new Set(['3', '0', '4']);
const intersection = new Set([...ids01].filter(id1 => ids02.has(id1)))
assert.deepStrictEqual([...intersection], ['0']);
const difference12 = new Set([...ids01].filter(id1 => !ids02.has(id1)));
assert.deepStrictEqual([...difference12], ['1', '2'])
const difference21 = new Set([...ids02].filter(id2 => !ids01.has(id2)));
assert.deepStrictEqual([...difference21], ['3', '4']);

// WeakSet
const weakSet = new WeakSet();
const hero = {name: 'Flash'};

weakSet.add(hero);
weakSet.delete(hero);
weakSet.has(hero);

// Feature--------------Set--------------WeakSet
// ---------------------------------------------
// Value type-----------Any--------------Object-only (reference)
// Value reference------Strong-----------Weak
// Garbage collection*--No---------------Yes
// Iteration order------Insertion--------N/A

// Methods--------------Set--------------WeakSet
// ---------------------------------------------
// add(value)-----------Yes----------------Yes
// has(key)-------------Yes----------------Yes
// delete(key)----------Yes----------------Yes
// entries()------------Yes----------------No
// forEach(callback)----Yes----------------No
// keys()---------------Yes----------------No
// values()-------------Yes----------------No
// * `Set` stores strong references to its values, which means that if a value is no longer used
// or referenced anywhere else in the code, it will still be retained in the Set and will not
// be automatically removed by the garbage collector.
// In the WeakSet, if a variable is garbage collected, the value will be removed from it
