'use strict';
class ITerminalOutput {
  constructor() {}
  printTable(tableData) {}
  getTableOptions() {}
}

export default class TerminalOutput extends ITerminalOutput {
  constructor({chalk, chalkTable, print}) {
    super();
    this.chalk = chalk;
    this.chalkTable = chalkTable;
    this.print = print;
  }

  printTable(tableData) {
    this.print(this.chalkTable(this.getTableOptions(), tableData));
  }

  getTableOptions() {
    const options = {
      leftPad: 2,
      columns: [
        {field: 'id', name: this.chalk.cyan('ID')},
        {field: 'vehicles', name: this.chalk.magenta('Vehicles')},
        {field: 'kmTraveled', name: this.chalk.cyan('Km Traveled')},
        {field: 'from', name: this.chalk.magenta('From')},
        {field: 'to', name: this.chalk.cyan('To')}
      ]
    };
    return options;
  }
}
