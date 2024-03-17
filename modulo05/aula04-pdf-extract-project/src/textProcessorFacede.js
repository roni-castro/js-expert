'use strict'
const TextProcessorFluentAPI = require('./textProcessorFluentAPI');

class TextProcessorFacade {
  #textProcessorFluentAPI;
  constructor(text) {
    this.#textProcessorFluentAPI = new TextProcessorFluentAPI(text);
  }

  getPeopleFromPDF() {
    return this.#textProcessorFluentAPI
      .extractPeopleData()
      .divideTextInColumns()
      .removeEmptyChars()
      .mapToPerson()
      .build();
  }
}
module.exports = TextProcessorFacade;
