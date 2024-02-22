'use strict';
const { readFile } = require('fs/promises');
const path = require('path');
const { error } = require('./constants');

const DEFAULT_OPTIONS = {
  maxLine: 3,
  fields: ['id', 'name', 'profession', 'age']
};

class File {
  static async csvToJson(filePath) {
    const fullPath = path.resolve(__dirname, filePath);
    const csvContent = await readFile(fullPath, 'utf8');
    const validation = this.isValid(csvContent);
    if (!validation.valid) throw new Error(validation.error);

    return this.parseCSVToJSON(csvContent);
  }

  static isValid(csvContent) {
    const [headers, ...contentRows] = csvContent.split(/\r?\n/);
    if (contentRows.length === 0) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      };
    }

    if (headers !== DEFAULT_OPTIONS.fields.join(',')) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      };
    }

    if (contentRows.length > DEFAULT_OPTIONS.maxLine) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      };
    }

    return { valid: true };
  }

  static parseCSVToJSON(csvContent) {
    const [firstLine, ...lines] = csvContent.split(/\r?\n/);
    const headers = firstLine.split(',');
    const users = lines.map((line) => {
      const user = {};
      const columns = line.split(',');
      columns.forEach((column, index) => {
        const key = headers[index];
        const value = column.trim();
        user[key] = value;
      });
      return user;
    });

    return users;
  }
}

module.exports = File;
