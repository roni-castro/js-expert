import readLine from 'readline';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import database from './../database.json' assert {type: 'json'};
import Person from './person.js';
import {getAll, save} from './repository.js';
import TerminalController from './terminalController.js';
import TerminalInput from './terminalInput.js';
import TerminalOutput from './terminalOutput.js';

const DEFAULT_LANGUAGE = 'pt-br';

const terminalController = new TerminalController({
  input: new TerminalInput(readLine),
  output: new TerminalOutput({
    chalk,
    chalkTable,
    print: console.draft
  })
});
await terminalController.initialize(DEFAULT_LANGUAGE);
