const {readFile} = require('fs/promises');
const path = require('path');
const pdfParse = require('pdf-parse');

(async function loadPDFFile() {
  const dataBuffer = await readFile(
    path.join(__dirname, '../files/contrato.pdf')
  );
  const pdfResult = await pdfParse(dataBuffer);
  console.log(pdfResult.text);
})();
