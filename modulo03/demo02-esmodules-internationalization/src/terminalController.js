'use strict';
import Person from './person.js';

const TERMINAL_CLOSE_COMMAND = ':q';

export default class TerminalController {
  constructor({input, output, personsViewModel}) {
    this.input = input;
    this.output = output;
    this.personsViewModel = personsViewModel;
  }

  async initialize() {
    const tableData = await this.personsViewModel.getAll();
    this.output.printTable(tableData);
    while (true) {
      try {
        const answer = await this.input.question(
          'Enter data separated by space: '
        );
        if (answer === TERMINAL_CLOSE_COMMAND) {
          this.input.closeTerminal();
          console.log('process finished!');
          return;
        }
        const person = Person.generateInstanceFromString(answer);
        await this.personsViewModel.add(person);
        const newTableData = await this.personsViewModel.getAll();
        this.output.printTable(newTableData);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
