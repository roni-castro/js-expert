import DraftLog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readLine from 'readline';
import database from './../database.json' assert {type: 'json'};
import Person from './person.js';

const DEFAULT_LANGUAGE = 'pt-br';

DraftLog(console).addLineListener(process.stdin);

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

const table = chalkTable(
  options,
  database.map((data) => new Person(data).formatted(DEFAULT_LANGUAGE))
);
const print = console.draft(table);

const terminal = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

terminal.question('pergunta?', (msg) => {
  console.log('msg', msg.toString());
});
