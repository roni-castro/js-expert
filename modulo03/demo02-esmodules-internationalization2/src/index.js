'use strict'
import PersonsViewModel from './personViewModel.js';
import PersonRepository from './personRepository.js';
import TerminalController from './terminalController.js';
import Person from './person.js';

const columns = [
  { field: 'id', name: 'ID' },
  { field: 'vehicles', name: 'Vehicles'},
  { field: 'kmTraveled', name: 'Km Traveled'},
  { field: 'from', name: 'From'},
  { field: 'to', name: 'To' }
]
const END_COMMAND = 'quit'
const terminalController = new TerminalController({
  language: 'pt-BR',
  columns, endCommand: END_COMMAND
})
const personsViewModel = new PersonsViewModel({
  peopleRepository: new PersonRepository()
})

const mainLoop = async () => {
  try {
    const tableData = await personsViewModel.getAll()
    terminalController.printTable(tableData)
    const answer = await terminalController.question("Insira os dados: ")
    console.log('aaaaa')
    if(answer === END_COMMAND) {
      terminalController.close()
      return
    }
    const person = Person.generateInstanceFromString(answer)
    await personsViewModel.add(person)
    const updatedPeople = await personsViewModel.getAll()
    terminalController.printTable(updatedPeople)
    mainLoop()
  } catch(error) {
    mainLoop()
  }
}

await mainLoop()