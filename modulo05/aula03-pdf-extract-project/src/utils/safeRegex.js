'use strict'
const sageRegex = require('safe-regex');

class InvalidRegexError extends Error {
  constructor(expression) {
    super(`This expression ${expression} is unsafe!`);
    this.name = 'InvalidRegexError';
  }
}

function evaluateRegex(expression) {
  const isSafeRegex = sageRegex(expression);
  if (!isSafeRegex) {
    throw new InvalidRegexError(expression);
  }

  return expression;
}

module.exports = {InvalidRegexError, evaluateRegex};
