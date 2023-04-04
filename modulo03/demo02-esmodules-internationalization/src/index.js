import database from './../database.json' assert {type: 'json'};
import Person from './person.js';
import {save} from './repository.js';
import TerminalController from './terminalController.js';

const DEFAULT_LANGUAGE = 'pt-br';
const TERMINAL_CLOSE_COMMAND = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE);

async function mainLoop() {
  try {
    const answer = await terminalController.question(
      'Enter data separated by space: '
    );
    if (answer === TERMINAL_CLOSE_COMMAND) {
      terminalController.closeTerminal();
      console.log('process finished!');
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE));
    await save(person);
    mainLoop();
  } catch (error) {
    console.log(error);
    mainLoop();
  }
}

await mainLoop();
