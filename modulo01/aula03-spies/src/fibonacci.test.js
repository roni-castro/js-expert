const assert = require('assert');
const sinon = require('sinon');
const Fibonacci = require('./fibonacci');

(() => {
  {
    const fibonacci = new Fibonacci();
    const fibonacciSpy = sinon.spy(fibonacci, fibonacci.execute.name);

    const sequenceToFind = 5;
    for (sequence of fibonacci.execute(sequenceToFind)) {
    }

    const expectedCallCount = sequenceToFind + 1;
    assert.equal(fibonacciSpy.callCount, expectedCallCount);
    assert.deepEqual(
      fibonacciSpy.getCall(1).args,
      [4, 1, 1],
      'The arrays are not equal!'
    );
    assert.deepEqual(
      fibonacciSpy.getCall(2).args,
      [3, 1, 2],
      'The arrays are not equal!'
    );
    assert.deepEqual(
      fibonacciSpy.getCall(3).args,
      [2, 2, 3],
      'The arrays are not equal!'
    );
    assert.deepEqual(
      fibonacciSpy.getCall(4).args,
      [1, 3, 5],
      'The arrays are not equal!'
    );
    assert.deepEqual(
      fibonacciSpy.getCall(5).args,
      [0, 5, 8],
      'The arrays are not equal!'
    );
  }

  {
    const fibonacci = new Fibonacci();
    const sequenceToFind = 6;
    const result = [...fibonacci.execute(sequenceToFind)];
    assert.deepEqual(result, [0, 1, 1, 2, 3, 5]);
  }
})();
