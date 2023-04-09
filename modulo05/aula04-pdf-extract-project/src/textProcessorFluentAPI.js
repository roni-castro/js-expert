const {evaluateRegex} = require('./utils/safeRegex');
const Person = require('./person');
class TextProcessorFluentAPI {
  #content;
  constructor(content) {
    this.#content = content;
  }

  build() {
    return this.#content;
  }

  extractPeopleData() {
    // Get the people data that comes after the Contratante or Contratada (insensitive)
    // (?<=[contratante|contratada]\:\s) find Contratante or Contratada pattern and ignores it
    // (?!\s) ignores the Contratante or Contratada at the end of the file, that has
    // another space instead of the person data.
    // (.*\n.*?)$ gets the person data we want including those with break lines, until
    // the end of line, as few as possible
    const peopleDataRegex = evaluateRegex(
      /(?<=[contratante|contratada]\:\s)(?!\s)(.*\n.*?)$/gim
    );
    this.#content = this.#content.match(peopleDataRegex);
    return this;
  }

  divideTextInColumns() {
    const separatorRegex = evaluateRegex(/,/);
    this.#content = this.#content.map((line) => line.split(separatorRegex));
    return this;
  }

  removeEmptyChars() {
    const emptyCharsRegex = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content.map((line) =>
      line.map((personDataItem) => personDataItem.replace(emptyCharsRegex, ''))
    );
    return this;
  }

  mapPerson() {
    this.#content = this.#content.map((line) => {
      return new Person(line);
    });
    return this;
  }
}

module.exports = TextProcessorFluentAPI;
