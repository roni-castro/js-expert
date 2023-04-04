import Person from './person.js';

const TERMINAL_CLOSE_COMMAND = ':q';

export default class TerminalController {
  constructor({input, output, database}) {
    this.input = input;
    this.output = output;
    this.database = database;
  }

  async initialize(language) {
    while (true) {
      try {
        const tableData = (await this.database.getAll()).map((person) =>
          person.formatted(language)
        );
        this.output.printTable(tableData);
        const answer = await this.input.question(
          'Enter data separated by space: '
        );
        if (answer === TERMINAL_CLOSE_COMMAND) {
          this.input.closeTerminal();
          console.log('process finished!');
          return;
        }
        const person = Person.generateInstanceFromString(answer);
        const newTableData = (await this.database.getAll()).map((person) =>
          person.formatted(language)
        );
        this.output.printTable(newTableData);
        await this.database.add(person);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
