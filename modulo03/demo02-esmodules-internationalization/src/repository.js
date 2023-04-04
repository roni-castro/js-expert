import {writeFile, readFile} from 'fs/promises';
import Person from './person.js';

// ESM does not have __filename or __dirname, so get path using URL
const {pathname: databaseFile} = new URL('./../database.json', import.meta.url);

class IDatabase {
  constructor() {}
  getAll() {}
  add(data) {}
}

export default class DatabaseRepository extends IDatabase {
  async getAll() {
    const fileData = (await readFile(databaseFile)).toString();
    const data = JSON.parse(fileData);
    const persons = data.map((personData) => new Person(personData));
    return persons;
  }

  async add(newData) {
    const currentData = await this.getAll();
    currentData.push(newData);
    await writeFile(databaseFile, JSON.stringify(currentData));
  }
}
