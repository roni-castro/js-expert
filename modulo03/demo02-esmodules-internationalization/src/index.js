import database from './../database.json' assert {type: 'json'};
import TerminalController from './terminalController.js';

const DEFAULT_LANGUAGE = 'pt-br';
const TERMINAL_CLOSE_COMMAND = ':q';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE);

async function mainLoop() {
  try {
    const answer = await terminalController.question('question??');
    if (answer === TERMINAL_CLOSE_COMMAND) {
      terminalController.closeTerminal();
      console.log('process finished!');
      return;
    }
    mainLoop();
  } catch (error) {
    console.log(error);
    mainLoop();
  }
}

await mainLoop();
