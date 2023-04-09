'use strict';
const {deepStrictEqual} = require('assert');

let counter = 0;
let counter2 = counter;
counter2++;
// A: counter = 0, counter2 = 1
// valor primitivo é copiado por valor

deepStrictEqual(counter, 0);
deepStrictEqual(counter2, 1);

const item = {counter: 0};
const item2 = item;
item2.counter++;
// A: item.counter = 1
//    item.counter2 = 1
// objeto é copiado por e aponta para mesma referência

deepStrictEqual(item, {counter: 1});
deepStrictEqual(item2, {counter: 1});
item2.counter++;
deepStrictEqual(item, {counter: 2});
deepStrictEqual(item2, {counter: 2});
