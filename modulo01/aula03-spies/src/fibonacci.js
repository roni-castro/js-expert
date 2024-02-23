'use strict';
/**
 * 5, current = 0, next = 1
 * 4, current = 1, next = 0 + 1 = 1
 * 3, current = 1, next = 1 + 1 = 2
 * 2, current = 2, next = 1 + 2 = 3
 * 1, current = 3, next = 2 + 3 = 5
 * 0, current = 5, next = 3 + 5 = 8
 **/

class Fibonacci {
  *execute(counter, current = 0, next = 1) {
    if (counter === 0) return;

    yield current;

    yield* this.execute(counter - 1, next, current + next);
  }
}

module.exports = Fibonacci;
