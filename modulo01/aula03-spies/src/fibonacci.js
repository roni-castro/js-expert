'use strict';
/**
 * 0, current = 0, next = 1
 * 1, current = 1, next = 0 + 1 = 1
 * 2, current = 1, next = 1 + 1 = 2
 * 3, current = 2, next = 1 + 2 = 3
 * 4, current = 3, next = 2 + 3 = 5
 * 5, current = 5, next = 3 + 5 = 8
 **/

class Fibonacci {
  *execute(inputValue, current = 0, next = 1) {
    if (inputValue === 0) {
      return;
    }

    yield current;
    yield* this.execute(inputValue - 1, next, current + next);
  }
}

module.exports = Fibonacci;
