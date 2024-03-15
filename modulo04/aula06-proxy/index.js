'use strict';
const assert = require('assert');
const {log} = require('console');

const Event = require('events');
const event = new Event();
const eventName = 'counter';
event.on(eventName, (msg) => console.log('counter updated', msg));

const counter = {
  count: 0
};
const proxy = new Proxy(counter, {
  set: function(target, propertyKey, newValue, _receiver) {
    event.emit(eventName, {newValue, previousValue: target[propertyKey]});
    target[propertyKey] = newValue
    return true
  },
  get: function(target, propertyKey, receiver) {
    return target[propertyKey]
  }
});

proxy.count++; // get + set
assert.deepStrictEqual(counter.count, 1); // get from counter
assert.deepStrictEqual(proxy.count, 1); // get from Proxy

setInterval(function () {
  if (proxy.count === 10) {
    clearInterval(this);
    return;
  }
  console.log('[3] - setInterval');
  proxy.count += 1;
}, 200);

// Run after the nextTick
setTimeout(() => {
  console.log('[2] - timeout');
  proxy.count = 7;
}, 100);

setImmediate(() => {
  console.log('[1] - setImmediate');
  proxy.count = 5;
});

// Run now, but breaks the node lifecycle. It does not show the value 2
process.nextTick(() => {
  console.log('[0] nextTick');
  proxy.count = 3;
});
