import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readLine from 'readline'
import DraftLog from 'draftlog'

class TablePrinter {
  constructor() {
    DraftLog(console).addLineListener(process.stdin)
    this.printTable = console.draft
  }

  getOptions({columns = []} = {}) {
    return {
      leftPad: 2,
      columns: columns.map(({field, name}, index) => 
        ({ field, name: index % 2 === 0 ? chalk.cyan(name) : chalk.magenta(name)})
      )
    }
  }

  createTable({tableData, columns}) {
    const options = this.getOptions({columns})
    const table = chalkTable(options, tableData)
    return table
  }

  print({tableData, columns}) {
    const table = this.createTable({tableData, columns})
    this.printTable(table)
  }
}

class TerminalInputController {
  constructor({input = process.stdin, output = process.stdout} = {}) {
    this.terminal = readLine.createInterface(input, output)
  }

  async question(msg = '') {
    return new Promise(resolve => {
      this.terminal.question(msg, answer => {
        resolve(answer)
      })
    })
  }

  close() {
    this.terminal.close()
  }
}

class TerminalController {

  constructor({language = 'pt-BR', columns = [], endCommand = ':q'}) {
    this.terminalInput = new TerminalInputController()
    this.tablePrinter = new TablePrinter()
    this.columns = columns
    this.language = language
    this.endCommand = endCommand
  }

  async question(msg) {
    return this.terminalInput.question(msg)
  }

  close() {
    this.terminalInput.close()
  }

  printTable(tableData) {
    this.tablePrinter.print({tableData, columns: this.columns})
  }
}

export default TerminalController