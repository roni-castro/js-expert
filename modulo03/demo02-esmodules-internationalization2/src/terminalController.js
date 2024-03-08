import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readLine from 'readline'
import DraftLog from 'draftlog'
import Person from './person.js'

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

  constructor({database = [], language = 'pt-BR', columns = [], endCommand = ':q'}) {
    this.terminalInput = new TerminalInputController()
    this.tablePrinter = new TablePrinter()
    this.tableData = database.map(person => new Person(person).formatted(language))
    this.columns = columns
    this.language = language
    this.endCommand = endCommand

    this.printTable()
  }

  async question(msg) {
    return this.terminalInput.question(msg)
  }

  close() {
    this.terminalInput.close()
  }

  printTable() {
    this.tablePrinter.print({tableData: this.tableData, columns: this.columns})
  }

  updateTable(item) {
    const person = Person.generateInstanceFromString(item).formatted(this.language)
    this.tableData.push(person)
    this.printTable()
  }
}

export default TerminalController