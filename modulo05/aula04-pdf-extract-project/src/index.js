'use strict'
const {readFile} = require('fs/promises');
const path = require('path');
const pdfParse = require('pdf-parse');
const TextProcessorFacade = require('./textProcessorFacede');

(async function loadPDFFile() {
  const dataBuffer = await readFile(
    path.join(__dirname, '../files/contrato.pdf')
  );
  const pdfResult = await pdfParse(dataBuffer);
  const people = new TextProcessorFacade(pdfResult.text).getPeopleFromPDF();
  console.log(people);
})();
