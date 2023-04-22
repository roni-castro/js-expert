import chalk from 'chalk';
import chalkTable from 'chalk-table';
import TableComponent from '../../shared/base/tableComponent.mjs';

class TerminalOutput {
  constructor({chalk, chalkTable, print}) {
    this.chalk = chalk;
    this.chalkTable = chalkTable;
    this.print = print;
  }

  printTable(tableHeaders, tableData) {
    console.log(tableData);
    this.print(this.chalkTable(this.getTableOptions(tableHeaders), tableData));
  }

  getTableOptions(tableHeaders) {
    const formatHeader = (header, index) =>
      index % 2 === 0 ? chalk.cyan(header) : chalk.magenta(header);

    const columns = tableHeaders.map((header, index) => ({
      field: header,
      name: formatHeader(header, index)
    }));
    const options = {leftPad: 2, columns};
    return options;
  }
}

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const {tableColumns, tableData} = this.prepareData(data);
    const terminalOutput = new TerminalOutput({
      chalk,
      chalkTable,
      print: console.log
    });
    terminalOutput.printTable(tableColumns, tableData);
  }

  prepareData(data) {
    const [firstRow] = data;
    const tableColumns = Object.keys(firstRow);
    const tableData = Object.values(data);

    return {tableColumns, tableData};
  }
}
