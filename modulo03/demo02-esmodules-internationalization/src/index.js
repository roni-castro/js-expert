import readLine from 'readline';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import DatabaseRepository from './repository.js';
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
  }),
  database: new DatabaseRepository()
});
await terminalController.initialize(DEFAULT_LANGUAGE);
