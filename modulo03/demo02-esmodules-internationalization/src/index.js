import readLine from 'readline';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import DatabaseRepository from './repository.js';
import PersonFormatter from './personFormatter.js';
import PersonTableViewModel from './personsViewModel.js';
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
  personsViewModel: new PersonTableViewModel({
    formatter: new PersonFormatter(DEFAULT_LANGUAGE),
    personsRepository: new DatabaseRepository()
  })
});
await terminalController.initialize();
