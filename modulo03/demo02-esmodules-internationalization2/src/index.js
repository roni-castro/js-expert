import database from './database.json' assert { type: 'json' };
import TerminalController from './terminalController.js';

const columns = [
  { field: 'id', name: 'ID' },
  { field: 'vehicles', name: 'Vehicles'},
  { field: 'kmTraveled', name: 'Km Traveled'},
  { field: 'from', name: 'From'},
  { field: 'to', name: 'To' }
]
const END_COMMAND = 'quit'
const terminalController = new TerminalController({database, language: 'pt-BR', columns, endCommand: END_COMMAND})

const mainLoop = async () => {
  try {
    const answer = await terminalController.question("Insira os dados: ")
    if(answer === END_COMMAND) {
      terminalController.close()
      return
    }
    terminalController.updateTable(answer)

    mainLoop()
  } catch(error) {
    mainLoop()
  }
}

await mainLoop()