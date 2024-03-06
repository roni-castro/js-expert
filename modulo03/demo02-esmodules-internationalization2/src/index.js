import database from './database.json' assert { type: 'json' };
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readLine from 'readline'
import DraftLog from 'draftlog'
import Person from './person.js'

DraftLog(console).addLineListener(process.stdin)
const DEFAULT_LANG = 'pt-BR'
const options = {
  leftPad: 2,
  columns: [
    { field: 'id', name: chalk.cyan('ID') },
    { field: 'vehicles', name: chalk.magenta('Vehicles') },
    { field: 'kmTraveled', name: chalk.cyan('Km Traveled') },
    { field: 'from', name: chalk.magenta('From') },
    { field: 'to', name: chalk.cyan('To') }
  ]
}

const table = chalkTable(
  options,
  database.map(person => new Person(person).formatted(DEFAULT_LANG))
)
const print = console.draft
print(table)

const terminal =  readLine.createInterface(process.stdin, process.stdout)

terminal.question("Qual é o seu nome?", answer => {
  console.log(answer)
})