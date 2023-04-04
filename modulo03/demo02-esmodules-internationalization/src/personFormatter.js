export default class PersonFormatter {
  constructor(language) {
    this.language = language;
  }

  format(person) {
    return person.formatted(this.language);
  }
}
