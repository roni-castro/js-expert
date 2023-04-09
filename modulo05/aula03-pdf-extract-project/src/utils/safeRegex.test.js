const {describe, it} = require('mocha');
const {expect} = require('chai');
const {evaluateRegex, InvalidRegexError} = require('./safeRegex');

describe('SafeRegex Suit tests', () => {
  it('should throw an error if the regex is unsafe', () => {
    const regex = /^(\w+\s?)+$/;
    expect(() => evaluateRegex(regex)).to.throws(
      InvalidRegexError,
      `This expression ${regex} is unsafe!`
    );
  });

  it('should return the regex and not throw an error if the regex is safe', () => {
    const regex = /^[a-z]$/;
    expect(() => evaluateRegex(regex)).not.to.throws(InvalidRegexError);
    expect(evaluateRegex(regex)).to.be.equal(regex);
  });
});
