import readLine from 'readline';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import DraftLog from 'draftlog';
import Person from './person.js';

export default class TerminalController {
  constructor() {
    this.readLine = readLine;
    this.chalkTable = chalkTable;
    this.print = {};
    this.data = [];
    this.terminal = {};
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = this.readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.initializeTable(database, language);
  }

  initializeTable(database, language) {
    const tableData = database.map((data) =>
      new Person(data).formatted(language)
    );
    const table = this.chalkTable(this.getTableOptions(), tableData);
    this.print = console.draft(table);
    this.data = tableData;
  }

  question(question = '') {
    return new Promise((resolve) => {
      this.terminal.question(question, resolve);
    });
  }

  closeTerminal() {
    this.terminal.close();
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOptions(), this.data));
  }

  getTableOptions() {
    const options = {
      leftPad: 2,
      columns: [
        {field: 'id', name: chalk.cyan('ID')},
        {field: 'vehicles', name: chalk.magenta('Vehicles')},
        {field: 'kmTraveled', name: chalk.cyan('Km Traveled')},
        {field: 'from', name: chalk.magenta('From')},
        {field: 'to', name: chalk.cyan('To')}
      ]
    };
    return options;
  }
}
