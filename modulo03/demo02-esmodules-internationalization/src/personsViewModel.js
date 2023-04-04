export default class PersonsViewModel {
  constructor({formatter, personsRepository}) {
    this.formatter = formatter;
    this.personsRepository = personsRepository;
    this.personsViewModel = [];
  }

  async getAll() {
    if (!this.personsViewModel.length) {
      const persons = await this.personsRepository.getAll();
      this.personsViewModel = persons.map((person) =>
        this.formatter.format(person)
      );
    }

    return this.personsViewModel;
  }

  async add(person) {
    const existingPersonIndex = this.personsViewModel.findIndex(
      (p) => p.id === person.id
    );
    if (existingPersonIndex === -1) {
      await this.personsRepository.add(person);
      const personViewModel = this.formatter.format(person);
      this.personsViewModel.push(personViewModel);
      return true;
    }
    return false;
  }
}
