import Person from './person.js';

class PersonViewModel {
  constructor({language, peopleRepository}) {
    this.language = language
    this.peopleRepository = peopleRepository
    this.peopleViewModel = []
  }

  async getAll() {
    if(this.peopleViewModel.length === 0) {
      const persons = await this.peopleRepository.getAll();
      this.peopleViewModel = persons.map((person) =>
        person.formatted(this.language)
      );
    }
    return this.peopleViewModel
  }

  async add(person) {
    await this.peopleRepository.add(person)
    this.peopleViewModel.push(person.formatted(this.language))
  }
}

export default PersonViewModel