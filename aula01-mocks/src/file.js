const {readFile} = require('fs/promises');
const path = require('path');
const {error} = require('./constants');

const DEFAULT_OPTIONS = {
  maxLine: 3,
  fields: ['id', 'name', 'profession', 'age']
};

class File {
  static async csvToJson(filePath) {
    const fullPath = path.join(__dirname, filePath);
    const fileContent = await readFile(fullPath, 'utf8');
    const validation = this.isValid(fileContent);
    if(!validation.valid) throw new Error(validation.error)
  }

  static isValid(fileContent, options) {
    const [headers, ...contentRows] = fileContent.split(/\r?\n/);
    if(contentRows.length === 0) return {
      error: error.FILE_FIELDS_ERROR_MESSAGE,
      valid: false
    } 
  }
}

module.exports = File;
