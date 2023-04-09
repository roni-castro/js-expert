'use strict';
const assert = require('assert');

function* multiply(a, b) {
  yield a * b;
}

function* hello() {
  yield 'Hello';
  yield '-';
  yield 'World';
  yield* multiply(2, 4);
}

const multiplyGenerator = multiply(2, 3);
assert.deepStrictEqual(multiplyGenerator.next(), {value: 6, done: false});

const helloGenerator = hello();
assert.deepStrictEqual(helloGenerator.next(), {value: 'Hello', done: false});
assert.deepStrictEqual(helloGenerator.next(), {value: '-', done: false});
assert.deepStrictEqual(helloGenerator.next(), {value: 'World', done: false});
assert.deepStrictEqual(helloGenerator.next(), {value: 8, done: false});
assert.deepStrictEqual(helloGenerator.next(), {value: undefined, done: true});

assert.deepStrictEqual(Array.from(hello()), ['Hello', '-', 'World', 8]);
assert.deepStrictEqual([...hello()], ['Hello', '-', 'World', 8]);

// -- Async Iterators

const {readFile, stat, readdir} = require('fs/promises');

function* promisify() {
  yield readFile(__filename);
  yield Promise.resolve('Hey Dude');
}

// Promise.all([...promisify()]).then((results) =>
//   console.log(results.toString())
// );

async function* systemInfo() {
  const file = await readFile(__filename);
  yield {file: file.toString()};

  const {size} = await stat(__filename);
  yield {size};

  const dir = await readdir(__dirname);
  yield {dir};
}

(async function () {
  for await (let item of systemInfo()) {
    console.log("systemInfo: ", item);
  }
})();
