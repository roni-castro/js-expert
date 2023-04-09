const {evaluateRegex} = require('./utils/safeRegex');

class Person {
  constructor([
    nome,
    nationality,
    maritalStatus,
    cpf,
    address,
    number,
    neighborhood,
    state
  ]) {
    function initialCap(str) {
      const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+)$/);
      return str.replace(
        firstLetterExp,
        (_fullMatch, group1, group2, _index) => {
          return `${group1.toUpperCase()}${group2.toLowerCase()}`;
        }
      );
    }
    this.nome = nome;
    this.nationality = initialCap(nationality);
    this.maritalStatus = initialCap(maritalStatus);
    // remove any non digit for the string
    this.cpf = cpf.replace(evaluateRegex(/[\D]+/g), '');
    // get only the content after the letter ` a `
    this.address = address.match(evaluateRegex(/(?<=\sa\s)([\w\s]+)/g)).join();
    this.number = number;
    // (?<=\w+\s) ignores any string with space before the neighborhood name
    // ([\w\s]+) get the neighborhood name
    this.neighborhood = neighborhood
      .match(evaluateRegex(/(?<=\w+\s)([\w\s]+)/g))
      .join();
    // remove the . at the end of the string
    this.state = state.replace(evaluateRegex(/\.$/), '');
  }
}

module.exports = Person;
