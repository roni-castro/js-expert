const assert = require('assert');
const {error} = require('./constants');
const File = require('./file');

(async () => {
  {
    const expectedResult = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const filePath = '../mocks/empty-file.csv';
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expectedResult);
  }

  {
    const expectedResult = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const filePath = '../mocks/missing-header.csv';
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expectedResult);
  }

  {
    const expectedResult = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const filePath = '../mocks/exceeds-max-size.csv';
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expectedResult);
  }
})();
