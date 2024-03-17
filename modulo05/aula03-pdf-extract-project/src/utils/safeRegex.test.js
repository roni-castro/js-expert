'use strict'
const {describe, it} = require('mocha');
const {expect} = require('chai');
const {evaluateRegex, InvalidRegexError} = require('./safeRegex');

describe('SafeRegex Suit tests', () => {
  it('should throw an error if the regex is unsafe', () => {
    const regex = /^(\w+\s?)+$/;
    /**
     * This command below will take some time and consume a lot of CPU:
     * Example: 13.58s user 0.03s system 99% cpu 13.627 total
     time \
     node --eval "/^(\w+\s?)+$/.test('ops I did it again and again and again and again!') && console.log('worked')"
     **/
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
