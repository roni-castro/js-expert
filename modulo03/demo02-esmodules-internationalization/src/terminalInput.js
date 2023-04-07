import DraftLog from 'draftlog';

class ITerminalInput {
  constructor() {}
  question(prompt) {}
  close() {}
}

export default class TerminalInput extends ITerminalInput {
  terminal = {};
  constructor(readLine) {
    super();
    this.initializeTerminal(readLine);
  }

  initializeTerminal(readLine) {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  question(question = '') {
    super.question(question);
    return new Promise((resolve) => {
      this.terminal.question(question, resolve);
    });
  }

  closeTerminal() {
    super.close();
    this.terminal.close();
  }
}
