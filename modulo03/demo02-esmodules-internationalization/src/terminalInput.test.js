import sinon from 'sinon';
import mocha from 'mocha';
const {describe, it} = mocha;
import chai from 'chai';
const {expect} = chai;
import TerminalInput from './terminalInput.js';

const setup = ({answer = 'Answer', sandbox}) => {
  const terminalMock = {question: sandbox.stub(), close: sandbox.stub()};
  terminalMock.question.callsFake((_question, resolve) => {
    resolve(answer);
  });
  const readLineMock = {
    createInterface: sandbox.stub().returns(terminalMock)
  };

  return {terminalMock, readLineMock};
};

describe('TerminalInput Suit test', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should ask question and return an answer', async function () {
    const answerMock = 'Answer';
    const {terminalMock, readLineMock} = setup({answer: answerMock, sandbox});
    const terminalInput = new TerminalInput(readLineMock);
    const questionMock = 'question mock';
    const answer = await terminalInput.question(questionMock);

    expect(terminalMock.question.calledWith(questionMock)).to.be.true;
    expect(answer).to.be.equal(answerMock);
  });

  it('should close terminal', async function () {
    const {terminalMock, readLineMock} = setup({sandbox});
    const terminalInput = new TerminalInput(readLineMock);
    terminalInput.closeTerminal();

    expect(terminalMock.close.calledOnce).to.be.true;
  });
});
